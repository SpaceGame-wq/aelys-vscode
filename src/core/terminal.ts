import * as vscode from 'vscode';
import { TERMINAL_NAME } from './constants';

/**
 * Retrieves the existing Aelys terminal or creates a new one.
 * @returns A dedicated vscode.Terminal instance for Aelys.
 */
export function getAelysTerminal(): vscode.Terminal {
    let terminal = vscode.window.terminals.find(t => t.name === TERMINAL_NAME);
    if (!terminal) {
        terminal = vscode.window.createTerminal(TERMINAL_NAME);
    }
    return terminal;
}