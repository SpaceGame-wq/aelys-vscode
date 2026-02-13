import * as vscode from 'vscode';
import { HOVER_DOCS } from '../docs';

export function registerHoverProvider(): vscode.Disposable {
    return vscode.languages.registerHoverProvider('aelys', {
        provideHover(document, position) {
            // 1. Définir une regex qui accepte les points (pour io.print) et le @ (pour @no_gc)
            const range = document.getWordRangeAtPosition(position, /[@a-zA-Z0-9_.]+/);
            if (!range) return undefined;

            let word = document.getText(range);

            // C'est un attribut (commence par @)
            if (word.startsWith('@')) {
                const doc = HOVER_DOCS[word];
                return doc ? new vscode.Hover(createMarkdown(doc)) : undefined;
            }

            // C'est un appel de module (ex: io.print, str.len)
            // On essaie de chercher la fonction avec et sans son préfixe
            if (word.includes('.')) {
                const parts = word.split('.');
                const functionName = parts[parts.length - 1]; // Récupère 'print' dans 'io.print'
                
                // On cherche d'abord le nom complet, puis le nom de la fonction seule
                const doc = HOVER_DOCS[word] || HOVER_DOCS[functionName];
                if (doc) return new vscode.Hover(createMarkdown(doc));
            }

            // Mot simple (ex: print, if, while)
            const doc = HOVER_DOCS[word];
            if (doc) {
                return new vscode.Hover(createMarkdown(doc));
            }

            return undefined;
        }
    });
}

/**
 * Utilitaire pour formater proprement le Markdown dans la bulle de survol
 */
function createMarkdown(content: string): vscode.MarkdownString {
    const md = new vscode.MarkdownString(content);
    md.isTrusted = true;
    md.supportHtml = true; // Permet d'utiliser du HTML (couleurs, etc.)
    return md;
}