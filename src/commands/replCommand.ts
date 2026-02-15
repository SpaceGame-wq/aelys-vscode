import * as vscode from 'vscode';
import * as os from 'os';
import { getBinaryPath } from '../compiler/manager';

const REPL_TERMINAL_NAME = "Aelys REPL";

/**
 * Récupère ou crée le terminal dédié au REPL
 */
function getReplTerminal(): vscode.Terminal {
    let terminal = vscode.window.terminals.find(t => t.name === REPL_TERMINAL_NAME);
    if (!terminal) {
        terminal = vscode.window.createTerminal(REPL_TERMINAL_NAME);
    }
    return terminal;
}

export function registerReplCommands(context: vscode.ExtensionContext): vscode.Disposable[] {
    
    // Ouvrir le REPL
    const openRepl = vscode.commands.registerCommand('aelys.openRepl', () => {
        const binPath = getBinaryPath(context);
        const terminal = getReplTerminal();
        
        terminal.show();
        
        const isWin = os.platform() === 'win32';
        const callOperator = isWin ? '& ' : '';
        
        // On lance 'aelys repl' avec les options par défaut si besoin
        terminal.sendText(`${callOperator}"${binPath}" repl`);
    });

    // Envoyer la sélection
    const sendToRepl = vscode.commands.registerCommand('aelys.sendToRepl', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        if (!text) {
            vscode.window.showWarningMessage("No text selected to send to REPL.");
            return;
        }

        const terminal = getReplTerminal();
        terminal.show(true); // show(true) pour ne pas voler le focus de l'éditeur
        
        // Envoyer le texte au terminal
        terminal.sendText(text);
    });

    return [openRepl, sendToRepl];
}