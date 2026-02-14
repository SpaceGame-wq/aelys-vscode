import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import { getBinaryPath, installCompilerVersion } from '../compiler/manager';
import { getAelysTerminal } from '../core/terminal';

/**
 * Fonction centrale pour exécuter le script
 * @param specificArgs (Optionnel) Arguments forcés. Si null, utilise ceux par défaut.
 */
async function runAelysScript(context: vscode.ExtensionContext, specificArgs?: string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== 'aelys') {
        vscode.window.showErrorMessage("Open an Aelys file to run it.");
        return;
    }

    // Vérification du binaire
    const binPath = getBinaryPath(context);
        
    // Si le binaire n'existe pas, on propose de l'installer
    if (!fs.existsSync(binPath)) {
        const config = vscode.workspace.getConfiguration('aelys');
        const customPath = config.get<string>('compiler.path');
    
        if (customPath) {
            vscode.window.showErrorMessage(`The local Aelys path does not exist: ${customPath}`);
        } else {
            const setup = await vscode.window.showWarningMessage("Aelys executable not found.", "Install Now");
            if (setup === "Install Now") {
                // On installe la dernière version par défaut
                await installCompilerVersion(context, 'latest');
            }
        }
        return;
    }

    // Sauvegarde automatique
    await editor.document.save();
    
    // Préparation des chemins et arguments
    const filePath = editor.document.fileName;
    
    // Si des arguments spécifiques sont passés (via "Run with Args"), on les utilise.
    // Sinon, on cherche dans la config VS Code.
    // Si la config est vide, on met le défaut absolu "--ae-trusted=true".
    let args = specificArgs;
    
    if (args === undefined) {
        const config = vscode.workspace.getConfiguration('aelys');
        args = config.get<string>('execution.defaultArguments') || "--ae-trusted=true";
    }

    // Lancement dans le terminal
    const terminal = getAelysTerminal();
    terminal.show();

    const isWin = os.platform() === 'win32';
    const callOperator = isWin ? '& ' : '';
    
    // Construction de la commande : "bin" arguments "fichier"
    const command = `${callOperator}"${binPath}" ${args} "${filePath}"`;
    
    terminal.sendText(command);
}

// EXÉCUTION STANDARD (Bouton Play)
export function registerRunCommand(context: vscode.ExtensionContext): vscode.Disposable {
    return vscode.commands.registerCommand('aelys.run', async () => {
        // Appelle la fonction sans arguments -> utilisera le défaut (--ae-trusted=true) ou la config utilisateur
        await runAelysScript(context);
    });
}

// EXÉCUTION AVEC ARGUMENTS
export function registerRunWithArgsCommand(context: vscode.ExtensionContext): vscode.Disposable {
    return vscode.commands.registerCommand('aelys.runWithArgs', async () => {
        // Récupère la config actuelle pour la proposer par défaut dans la boîte de dialogue
        const config = vscode.workspace.getConfiguration('aelys');
        const defaultArgs = config.get<string>('execution.defaultArguments') || "--ae-trusted=true";

        // Demande à l'utilisateur
        const userArgs = await vscode.window.showInputBox({
            prompt: "Enter compiler arguments (e.g., --debug --no-gc)",
            value: defaultArgs, // Pré-rempli avec la valeur par défaut
            placeHolder: "--ae-trusted=true"
        });

        // Si l'utilisateur n'a pas annulé (Echap), on lance
        if (userArgs !== undefined) {
            await runAelysScript(context, userArgs);
        }
    });
}