import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { ALL_RELEASES_URL, LATEST_RELEASE_URL } from '../core/constants';

/**
 * Détermine le nom de l'asset binaire en fonction de l'OS et de l'architecture.
 */
function getTargetAsset(): string {
    const platform = os.platform();
    const arch = os.arch();

    if (platform === 'win32') return "aelys-x86_64-pc-windows-msvc.exe";
    if (platform === 'darwin') {
        return arch === 'arm64' ? "aelys-aarch64-apple-darwin" : "aelys-x86_64-apple-darwin";
    }
    if (platform === 'linux') return "aelys-x86_64-unknown-linux-gnu";
    
    return "";
}

/**
 * Retourne le chemin local où le binaire Aelys est stocké.
 */
export function getBinaryPath(context: vscode.ExtensionContext): string {
    const filename = os.platform() === 'win32' ? 'aelys.exe' : 'aelys';
    return path.join(context.globalStorageUri.fsPath, filename);
}

/**
 * Récupère toutes les versions disponibles sur le dépôt GitHub.
 */
export async function fetchAllVersions(): Promise<any[]> {
    try {
        const response = await axios.get(ALL_RELEASES_URL);
        return response.data;
    } catch (e) {
        console.error("Aelys: Failed to fetch releases", e);
        return [];
    }
}

/**
 * Télécharge et installe une version spécifique du compilateur.
 * @param versionTag Le tag de la version (ex: 'v0.1.2') ou 'latest'.
 */
export async function installCompilerVersion(context: vscode.ExtensionContext, versionTag: string = 'latest') {
    const assetName = getTargetAsset();
    if (!assetName) {
        vscode.window.showErrorMessage("Your OS or Architecture is not supported by Aelys yet.");
        return;
    }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Aelys: Installing ${versionTag}...`,
        cancellable: false
    }, async (progress) => {
        try {
            let releaseData;

            // Sécurité pour le tag 'latest'
            if (versionTag === 'latest') {
                try {
                    const response = await axios.get(LATEST_RELEASE_URL);
                    releaseData = response.data;
                } catch (e) {
                    // Si GitHub renvoie 404 sur 'latest', on prend la première release de la liste
                    const allReleases = await fetchAllVersions();
                    if (allReleases.length === 0) throw new Error("No releases found on GitHub.");
                    releaseData = allReleases[0];
                }
            } else {
                // Construction de l'URL avec le tag pur (sans icônes)
                const url = `${ALL_RELEASES_URL.split('?')[0]}/tags/${versionTag}`;
                const response = await axios.get(url);
                releaseData = response.data;
            }

            const actualTag = releaseData.tag_name;
            
            const asset = releaseData.assets.find((a: any) => a.name === assetName);
            if (!asset) throw new Error(`Binary ${assetName} not found for version ${actualTag}.`);

            // Téléchargement
            progress.report({ message: `Downloading ${actualTag}...` });
            const downloadResponse = await axios.get(asset.browser_download_url, { responseType: 'arraybuffer' });

            // Sauvegarde locale
            if (!fs.existsSync(context.globalStorageUri.fsPath)) {
                fs.mkdirSync(context.globalStorageUri.fsPath, { recursive: true });
            }

            const binPath = getBinaryPath(context);
            fs.writeFileSync(binPath, Buffer.from(downloadResponse.data));

            // Droits d'exécution pour Linux/Mac
            if (os.platform() !== 'win32') {
                fs.chmodSync(binPath, 0o755);
            }

            // Mise à jour de l'état
            context.globalState.update('installedVersion', actualTag);
            // On réinitialise l'ignorance car l'utilisateur vient de faire une action volontaire
            context.globalState.update('ignoredVersion', undefined);
            
            vscode.window.showInformationMessage(`Aelys ${actualTag} installed successfully!`);
            
            // Émettre un événement personnalisé ou rafraîchir la barre de statut si nécessaire
            vscode.commands.executeCommand('aelys.refreshStatus');

        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to install Aelys: ${error.message}`);
        }
    });
}

/**
 * Vérification intelligente au démarrage de l'extension.
 */
export async function smartUpdateCheck(context: vscode.ExtensionContext) {
    const binPath = getBinaryPath(context);
    const installedVersion = context.globalState.get<string>('installedVersion');
    const ignoredVersion = context.globalState.get<string>('ignoredVersion');

    // 1. Si le binaire est absent, on force l'installation
    if (!fs.existsSync(binPath)) {
        const choice = await vscode.window.showInformationMessage(
            "Aelys executable is missing. Download it to run scripts?", 
            "Install Latest"
        );
        if (choice === "Install Latest") await installCompilerVersion(context, 'latest');
        return;
    }

    // 2. Vérifier les mises à jour sur GitHub
    try {
        const response = await axios.get(LATEST_RELEASE_URL);
        const latestVersion = response.data.tag_name;

        // Si une version plus récente existe
        if (installedVersion !== latestVersion) {
            
            // Si l'utilisateur a déjà cliqué sur "Later" pour CETTE version précise, on ne l'embête pas
            if (ignoredVersion === latestVersion) {
                return;
            }

            const updateChoice = await vscode.window.showInformationMessage(
                `A new version of Aelys is available (${latestVersion}).`,
                "Update Now", 
                "Later"
            );

            if (updateChoice === "Update Now") {
                await installCompilerVersion(context, latestVersion);
            } else if (updateChoice === "Later") {
                // On mémorise que cette version spécifique est ignorée
                context.globalState.update('ignoredVersion', latestVersion);
            }
        }
    } catch (e) {
        // Erreur silencieuse (ex: pas d'internet)
    }
}