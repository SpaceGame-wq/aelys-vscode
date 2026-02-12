import * as vscode from 'vscode';
import { initialCheck } from './compiler/manager';
import { registerRunCommand } from './commands/runCommand';
import { registerUpdateCommand } from './commands/updateCommand';
import { registerHoverProvider } from './features/hoverProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Aelys extension is now active!');

    // Register all commands and features
    context.subscriptions.push(
        registerRunCommand(context),
        registerUpdateCommand(context),
        registerHoverProvider()
    );

    // Perform initial check for compiler updates on startup
    initialCheck(context);
}

export function deactivate() {}