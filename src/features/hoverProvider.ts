import * as vscode from 'vscode';
import { HOVER_DOCS } from '../docs';

export function registerHoverProvider(): vscode.Disposable {
    return vscode.languages.registerHoverProvider('aelys', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            if (!range) return undefined;

            const word = document.getText(range);
            
            // Check if it's an attribute (preceded by @)
            const lineText = document.lineAt(position.line).text;
            const isAttribute = lineText.charAt(range.start.character - 1) === '@';
            const lookupKey = isAttribute ? '@' + word : word;
        
            const documentation = HOVER_DOCS[lookupKey];
            if (documentation) {
                const markdown = new vscode.MarkdownString(documentation);
                markdown.supportHtml = true; // Optional: allows for more advanced formatting if needed
                return new vscode.Hover(markdown);
            }
        }
    });
}