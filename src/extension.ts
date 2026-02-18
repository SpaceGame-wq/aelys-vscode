import * as vscode from 'vscode';
import { smartUpdateCheck } from './compiler/manager';
import { registerRunCommand, registerRunWithArgsCommand } from './commands/runCommand';
import { registerUpdateCommand } from './commands/updateCommand';
import { registerHoverProvider } from './features/hoverProvider';
import { registerAsmCommand, registerAsmWithArgsCommand } from './commands/asmCommand';
import { registerReplCommands } from './commands/replCommand';
import { registerSignatureProvider } from './features/signatureProvider';
import { registerCompletionProvider } from './features/completionProvider';
import { registerDefinitionProvider } from './features/definitionProvider';

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

    // On parcourt le tableau renvoyé et on ajoute chaque commande au contexte
    registerReplCommands(context).forEach(command => {
        context.subscriptions.push(command);
    });

    // On ajoute toutes les commandes et fonctionnalités au contexte pour qu'elles soient bien libérées
    context.subscriptions.push(
        refreshStatusCommand,
        registerRunCommand(context),
        registerUpdateCommand(context),
        registerHoverProvider(),
        registerSignatureProvider(),
        registerCompletionProvider(),
        registerRunWithArgsCommand(context),
        registerAsmCommand(context),
        registerAsmWithArgsCommand(context),
        registerDefinitionProvider()
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
    const config = vscode.workspace.getConfiguration('aelys');
    const customPath = config.get<string>('compiler.path');
    const installedVersion = context.globalState.get<string>('installedVersion');
    
    if (customPath && customPath.trim() !== "") {
        // L'utilisateur utilise un binaire local personnalisé
        statusBarItem.text = `$(tools) Aelys: Local`;
        statusBarItem.tooltip = `Using local path: ${customPath}\nClick to change version`;
        statusBarItem.backgroundColor = undefined;
    } 
    else if (installedVersion) {
        // L'utilisateur utilise une version téléchargée
        statusBarItem.text = `$(chip) Aelys ${installedVersion}`;
        statusBarItem.tooltip = "Aelys Compiler: Click to change version";
        statusBarItem.backgroundColor = undefined;
    } else {
        // Rien n'est installé
        statusBarItem.text = `$(alert) Aelys: Install Required`;
        statusBarItem.tooltip = "Click to install the Aelys compiler";
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }
    statusBarItem.show();
}

export function deactivate() {}