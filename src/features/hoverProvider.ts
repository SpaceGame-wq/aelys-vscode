import * as vscode from 'vscode';
import { HOVER_DOCS } from '../docs';

export function registerHoverProvider(): vscode.Disposable {
    return vscode.languages.registerHoverProvider('aelys', {
        provideHover(document, position) {
            // Définir une regex qui accepte les points (pour io.print) et le @ (pour @no_gc)
            const range = document.getWordRangeAtPosition(position, /[@a-zA-Z0-9_.]+/);
            if (!range) return undefined;

            let word = document.getText(range);

            // GESTION DES ALIAS (ex: fsn.read_text -> fs.read_text)
            if (word.includes('.')) {
                const parts = word.split('.');
                const prefix = parts[0];
                const funcName = parts[1];

                // On cherche l'import correspondant à ce préfixe dans le document
                const realModule = findModuleForAlias(document, prefix);
                if (realModule) {
                    word = `${realModule}.${funcName}`;
                }
            }

            // RECHERCHE DANS LA DOC
            // On essaie le mot complet (résolu), puis juste la fonction
            const doc = HOVER_DOCS[word] || HOVER_DOCS[word.split('.').pop() || ""];
            
            if (doc) {
                const md = new vscode.MarkdownString(doc);
                md.isTrusted = true;
                md.supportHtml = true;
                return new vscode.Hover(md);
            }

            return undefined;
        }
    });
}

/**
 * Analyse le document pour trouver à quel module std un alias fait référence.
 * @returns Le nom du module original (ex: "fs") ou null.
 */
function findModuleForAlias(document: vscode.TextDocument, alias: string): string | null {
    const text = document.getText();
    // Regex pour needs std.fs as fsn OR needs std.fs
    const importRegex = /\bneeds\s+std\.([a-z_]+)(?:\s+as\s+([a-z_]+))?/g;
    
    let match;
    while ((match = importRegex.exec(text)) !== null) {
        const moduleName = match[1];
        const moduleAlias = match[2];
        
        // Si l'alias correspond, ou si pas d'alias et que le nom du module correspond
        if (moduleAlias === alias || (!moduleAlias && moduleName === alias)) {
            return moduleName;
        }
    }
    return null;
}