import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import { getBinaryPath, installCompilerVersion } from '../compiler/manager'; // Correction de l'import
import { getAelysTerminal } from '../core/terminal';

export function registerRunCommand(context: vscode.ExtensionContext): vscode.Disposable {
    return vscode.commands.registerCommand('aelys.run', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== 'aelys') {
            vscode.window.showErrorMessage("Open an Aelys file to run it.");
            return;
        }

        const binPath = getBinaryPath(context);
        
        // Si le binaire n'existe pas, on propose de l'installer
        if (!fs.existsSync(binPath)) {
            const setup = await vscode.window.showWarningMessage("Aelys executable not found.", "Install Now");
            if (setup === "Install Now") {
                // On installe la dernière version par défaut
                await installCompilerVersion(context, 'latest');
            }
            return;
        }

        await editor.document.save();
        
        const filePath = editor.document.fileName;
        const terminal = getAelysTerminal();
        terminal.show();

        const callOperator = os.platform() === 'win32' ? '& ' : '';
        
        // Command with default capabilities for user scripts
        terminal.sendText(`${callOperator}"${binPath}" --allow-caps=fs "${filePath}"`);
    });
}