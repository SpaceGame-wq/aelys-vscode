import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { chmodSync } from 'fs';

// Configuration
const REPO_OWNER = "vbxq";
const REPO_NAME = "aelys_lang";
const GITHUB_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;

export async function activate(context: vscode.ExtensionContext) {
    console.log('Aelys extension is now active');

    // --- COMMANDE : RUN ---
    let runCommand = vscode.commands.registerCommand('aelys.run', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== 'aelys') {
            vscode.window.showErrorMessage("Open an Aelys file to run it.");
            return;
        }

        const binPath = getBinaryPath(context);
        if (!fs.existsSync(binPath)) {
            const setup = await vscode.window.showWarningMessage("Aelys executable not found.", "Install Now");
            if (setup === "Install Now") await downloadLatestRelease(context);
            return;
        }

        // Sauvegarder le fichier avant de lancer
        await editor.document.save();
        
        const filePath = editor.document.fileName;
        const terminal = getAelysTerminal();
        terminal.show();

        const isWin = os.platform() === 'win32';
        const callOperator = isWin ? '& ' : '';
        
        // Commande : On ajoute les caps par défaut pour tes scripts
        terminal.sendText(`${callOperator}"${binPath}" --allow-caps=fs "${filePath}"`);
    });

    // --- COMMANDE : CHECK UPDATE ---
    let updateCommand = vscode.commands.registerCommand('aelys.update', async () => {
        await downloadLatestRelease(context);
    });

    context.subscriptions.push(runCommand, updateCommand);

    // Vérification silencieuse au démarrage
    initialCheck(context);
}

/**
 * Détermine le nom du binaire sur GitHub en fonction de l'OS et du CPU
 */
function getTargetAsset(): string {
    const platform = os.platform(); // 'win32', 'darwin', 'linux'
    const arch = os.arch();         // 'x64', 'arm64'

    if (platform === 'win32') {
        return "aelys-x86_64-pc-windows-msvc.exe";
    }

    if (platform === 'darwin') {
        return arch === 'arm64' 
            ? "aelys-aarch64-apple-darwin" 
            : "aelys-x86_64-apple-darwin";
    }

    if (platform === 'linux') {
        // Par défaut on prend gnu, musl est spécifique
        return "aelys-x86_64-unknown-linux-gnu";
    }

    return "";
}

/**
 * Chemin local où sera stocké le binaire
 */
function getBinaryPath(context: vscode.ExtensionContext): string {
    const isWin = os.platform() === 'win32';
    const filename = isWin ? 'aelys.exe' : 'aelys';
    return path.join(context.globalStorageUri.fsPath, filename);
}

/**
 * Gère le téléchargement et l'installation
 */
async function downloadLatestRelease(context: vscode.ExtensionContext) {
    const assetName = getTargetAsset();
    if (!assetName) {
        vscode.window.showErrorMessage("Your OS or Architecture is not supported by Aelys yet.");
        return;
    }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Aelys: Fetching latest release...",
        cancellable: false
    }, async (progress) => {
        try {
            const response = await axios.get(GITHUB_API_URL);
            const latestVersion = response.data.tag_name;
            const asset = response.data.assets.find((a: any) => a.name === assetName);

            if (!asset) throw new Error(`Binary ${assetName} not found in release.`);

            progress.report({ message: `Downloading version ${latestVersion}...` });

            const downloadResponse = await axios.get(asset.browser_download_url, {
                responseType: 'arraybuffer'
            });

            // Créer le dossier de stockage s'il n'existe pas
            if (!fs.existsSync(context.globalStorageUri.fsPath)) {
                fs.mkdirSync(context.globalStorageUri.fsPath, { recursive: true });
            }

            const binPath = getBinaryPath(context);
            fs.writeFileSync(binPath, Buffer.from(downloadResponse.data));

            // Permissions d'exécution (Linux/Mac)
            if (os.platform() !== 'win32') {
                chmodSync(binPath, 0o755);
            }

            // Sauvegarder la version installée
            context.globalState.update('installedVersion', latestVersion);
            vscode.window.showInformationMessage(`Aelys ${latestVersion} installed successfully!`);

        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to install Aelys: ${error.message}`);
        }
    });
}

/**
 * Vérifie au démarrage si une mise à jour est disponible
 */
async function initialCheck(context: vscode.ExtensionContext) {
    const binPath = getBinaryPath(context);
    const installedVersion = context.globalState.get('installedVersion');

    if (!fs.existsSync(binPath)) {
        const choice = await vscode.window.showInformationMessage("Aelys executable is missing. Download it to run scripts?", "Install");
        if (choice === "Install") await downloadLatestRelease(context);
        return;
    }

    try {
        const response = await axios.get(GITHUB_API_URL);
        const latestVersion = response.data.tag_name;

        if (installedVersion !== latestVersion) {
            const update = await vscode.window.showInformationMessage(`A new version of Aelys is available (${latestVersion}).`, "Update Now", "Later");
            if (update === "Update Now") await downloadLatestRelease(context);
        }
    } catch (e) {
        // Erreur silencieuse si pas d'internet
    }
}

/**
 * Récupère ou crée un terminal dédié pour Aelys
 */
function getAelysTerminal(): vscode.Terminal {
    const name = "Aelys Output";
    let terminal = vscode.window.terminals.find(t => t.name === name);
    if (!terminal) {
        terminal = vscode.window.createTerminal(name);
    }
    return terminal;
}

export function deactivate() {}