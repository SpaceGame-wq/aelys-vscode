import * as vscode from 'vscode';
import { smartUpdateCheck } from './compiler/manager';
import { registerRunCommand } from './commands/runCommand';
import { registerUpdateCommand } from './commands/updateCommand';
import { registerHoverProvider } from './features/hoverProvider';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('Aelys extension is now active!');

    // CRÉATION DE L'INTERFACE UTILISATEUR (UI)

    // Création de l'élément dans la barre de statut
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'aelys.update'; // La commande à exécuter au clic
    context.subscriptions.push(statusBarItem);

    // ENREGISTREMENT DES COMMANDES
    
    // Commande pour changer la version du compilateur
    const refreshStatusCommand = vscode.commands.registerCommand('aelys.refreshStatus', () => {
        updateStatusBar(context);
    });

    // On ajoute toutes les commandes et fonctionnalités au contexte pour qu'elles soient bien libérées
    context.subscriptions.push(
        refreshStatusCommand,
        registerRunCommand(context),
        registerUpdateCommand(context),
        registerHoverProvider()
    );

    // LOGIQUE DE DÉMARRAGE

    // Mettre à jour la barre de statut une première fois au lancement
    updateStatusBar(context);

    // Lancer la vérification de mise à jour intelligente et non-bloquante
    smartUpdateCheck(context);
}

/**
 * Met à jour le texte et l'icône de la barre de statut en fonction de la version installée.
 * @param context Le contexte de l'extension pour accéder au stockage global.
 */
function updateStatusBar(context: vscode.ExtensionContext) {
    const installedVersion = context.globalState.get<string>('installedVersion');
    
    if (installedVersion) {
        statusBarItem.text = `$(chip) Aelys ${installedVersion}`;
        statusBarItem.tooltip = "Aelys Compiler: Click to change version";
        statusBarItem.backgroundColor = undefined; // Couleur par défaut
    } else {
        statusBarItem.text = `$(alert) Aelys: Install Required`;
        statusBarItem.tooltip = "Click to install the Aelys compiler";
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }
    statusBarItem.show();
}

export function deactivate() {}