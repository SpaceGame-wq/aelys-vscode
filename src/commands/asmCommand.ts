import * as vscode from 'vscode';
import * as cp from 'child_process';
import { getBinaryPath, installCompilerVersion } from '../compiler/manager';
import * as fs from 'fs';

/**
 * Logique centrale de l'inspecteur de bytecode
 */
async function runAsmInspector(context: vscode.ExtensionContext, specificArgs?: string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const binPath = getBinaryPath(context);
    if (!fs.existsSync(binPath)) {
        const setup = await vscode.window.showWarningMessage("Aelys executable not found.", "Install Now");
        if (setup === "Install Now") await installCompilerVersion(context, 'latest');
        return;
    }

    // Sauvegarde
    await editor.document.save();
    const filePath = editor.document.fileName;

    // Gestion des arguments
    let args = specificArgs;
    if (args === undefined) {
        const config = vscode.workspace.getConfiguration('aelys');
        args = config.get<string>('asm.defaultArguments') || "-O0";
    }

    // Exécution
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Aelys: Generating ASM (${args})...`,
        cancellable: false
    }, async () => {
        return new Promise<void>((resolve) => {
            // aelys asm <file> --stdout <arguments>
            const cmd = `"${binPath}" asm "${filePath}" --stdout ${args}`;

            cp.exec(cmd, async (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`ASM Error: ${stderr || error.message}`);
                    resolve();
                    return;
                }

                // Affichage du résultat
                const doc = await vscode.workspace.openTextDocument({
                    content: stdout,
                    language: 'aelys' 
                });

                await vscode.window.showTextDocument(doc, {
                    viewColumn: vscode.ViewColumn.Two,
                    preserveFocus: false,
                    preview: true
                });
                resolve();
            });
        });
    });
}

// COMMANDE 1
export function registerAsmCommand(context: vscode.ExtensionContext): vscode.Disposable {
    return vscode.commands.registerCommand('aelys.inspectBytecode', async () => {
        await runAsmInspector(context);
    });
}

// COMMANDE 2
export function registerAsmWithArgsCommand(context: vscode.ExtensionContext): vscode.Disposable {
    return vscode.commands.registerCommand('aelys.inspectBytecodeWithArgs', async () => {
        const config = vscode.workspace.getConfiguration('aelys');
        const defaultArgs = config.get<string>('asm.defaultArguments') || "-O0";

        const userArgs = await vscode.window.showInputBox({
            prompt: "Enter ASM generation arguments (e.g., -O3 -Wall)",
            value: defaultArgs,
            placeHolder: "-O0"
        });

        if (userArgs !== undefined) {
            await runAsmInspector(context, userArgs);
        }
    });
}