import * as vscode from 'vscode';
import { downloadLatestRelease } from '../compiler/manager';

export function registerUpdateCommand(context: vscode.ExtensionContext): vscode.Disposable {
    return vscode.commands.registerCommand('aelys.update', async () => {
        await downloadLatestRelease(context);
    });
}