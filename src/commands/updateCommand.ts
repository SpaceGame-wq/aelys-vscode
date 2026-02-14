import * as vscode from 'vscode';
import { installCompilerVersion, fetchAllVersions } from '../compiler/manager';

interface ReleasePickItem extends vscode.QuickPickItem {
    tag: string;
}

export function registerUpdateCommand(context: vscode.ExtensionContext): vscode.Disposable {
    return vscode.commands.registerCommand('aelys.update', async () => {
        
        // Afficher un chargement pendant la récupération des versions
        const releases = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Aelys: Fetching versions list...",
            cancellable: false
        }, async () => {
            return await fetchAllVersions();
        });

        if (!releases || releases.length === 0) {
            vscode.window.showErrorMessage("Could not fetch Aelys versions from GitHub. Check your internet connection.");
            return;
        }

        // Préparer les éléments pour la liste déroulante (QuickPick)
        const items: ReleasePickItem[] = releases.map((release, index) => {
            const date = new Date(release.published_at).toLocaleDateString();
            const tagName = release.tag_name;
            const lowerTag = tagName.toLowerCase();
            
            // LOGIQUE DE DÉTECTION
            let typeLabel = "Stable";
            let icon = "$(verified)"; // Bouclier par défaut

            // On regarde le TEXTE du tag en priorité
            if (lowerTag.includes("alpha") || lowerTag.endsWith("-a")) {
                typeLabel = "Alpha";
                icon = "$(beaker)"; // Éprouvette
            } 
            else if (lowerTag.includes("beta") || lowerTag.endsWith("-b")) {
                typeLabel = "Beta";
                icon = "$(beaker)";
            } 
            else if (lowerTag.includes("rc")) {
                typeLabel = "Release Candidate";
                icon = "$(flask)";
            }
            // Si le texte n'a rien de spécial, on regarde si GitHub le considère comme pre-release
            else if (release.prerelease) {
                typeLabel = "Pre-release";
                icon = "$(warning)";
            }

            // Gestion de l'icône pour la TOUTE dernière version (la première de la liste)
            // Si c'est la dernière, on met une étoile, sinon on met l'icône de type (Alpha/Stable)
            const labelIcon = index === 0 ? "$(star)" : icon;

            return {
                label: `${labelIcon} ${tagName}`,
                description: typeLabel, // Aichera "Alpha", "Beta" ou "Stable"
                detail: `Published: ${date} — ${release.name || ''}`,
                tag: tagName
            };
        });

        // Afficher la liste déroulante
        const selected = await vscode.window.showQuickPick<ReleasePickItem>(items, {
            placeHolder: "Select the Aelys compiler version to install",
            title: "Manage Aelys Compiler Version",
            matchOnDescription: true,
            matchOnDetail: true
        });

        // Si l'utilisateur a choisi une version
        if (selected) {
            await installCompilerVersion(context, selected.tag);
            
            // On demande à l'extension de rafraîchir la barre de statut
            vscode.commands.executeCommand('aelys.refreshStatus');
        }
    });
}