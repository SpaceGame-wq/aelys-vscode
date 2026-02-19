import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { SIGNATURES } from '../docs';

export function registerCompletionProvider(): vscode.Disposable {
    return vscode.languages.registerCompletionItemProvider('aelys', {
        async provideCompletionItems(document, position) {
            const linePrefix = document.lineAt(position).text.substring(0, position.character);
            
            // Détecter si on tape un attribut (commençant par @)
            if (linePrefix.endsWith('@')) {
                return Object.keys(SIGNATURES)
                    .filter(key => key.startsWith('@'))
                    .map(key => new vscode.CompletionItem(key, vscode.CompletionItemKind.Keyword));
            }

            // Détecter si on tape un accès à un module (ex: "m.")
            const dotMatch = linePrefix.match(/([a-zA-Z_][a-zA-Z0-9_]*)\.$/);
            if (!dotMatch) return undefined;

            const alias = dotMatch[1];
            const imports = parseImports(document);
            const targetImport = imports.find(imp => (imp.alias || imp.moduleName.split('.').pop()) === alias);

            if (!targetImport) return undefined;

            const items: vscode.CompletionItem[] = [];

            if (targetImport.isStd) {
                // Suggestions pour les modules STD
                const stdName = targetImport.moduleName.replace('std.', '');
                for (const [key, sig] of Object.entries(SIGNATURES)) {
                    if (key.startsWith(stdName + ".")) {
                        const funcName = key.split('.')[1];
                        const item = new vscode.CompletionItem(funcName, vscode.CompletionItemKind.Function);
                        item.detail = sig.label;
                        item.documentation = new vscode.MarkdownString(sig.documentation);
                        // Snippet automatique pour les parenthèses
                        item.insertText = new vscode.SnippetString(`${funcName}(\${1})`);
                        items.push(item);
                    }
                }
            } else {
                // Suggestions pour les fichiers locaux
                const currentDir = path.dirname(document.uri.fsPath);
                const fileNames = [`${targetImport.moduleName}.aelys`, `${targetImport.moduleName}.ae`];
                
                for (const fName of fileNames) {
                    const fullPath = path.join(currentDir, fName);
                    if (fs.existsSync(fullPath)) {
                        const content = fs.readFileSync(fullPath, 'utf8');
                        const localFunctions = parseLocalFunctionNames(content);
                        
                        for (const fn of localFunctions) {
                            // Si la fonction n'est pas 'pub', on ne l'affiche pas dans l'autocomplétion
                            if (!fn.isPublic) continue;

                            const item = new vscode.CompletionItem(fn.name, vscode.CompletionItemKind.Method);
                            item.detail = fn.label; // Affichera "pub fn name(...)"
                            item.documentation = new vscode.MarkdownString(fn.doc);
                            item.insertText = new vscode.SnippetString(`${fn.name}(\${1})`);
                            items.push(item);
                        }
                        break;
                    }
                }
            }

            return items;
        }
    }, '.'); // Se déclenche uniquement après un point
}

/**
 * Analyse les imports (logique identique au SignatureProvider)
 */
function parseImports(document: vscode.TextDocument) {
    const text = document.getText();
    const imports: { moduleName: string, alias: string | null, isStd: boolean }[] = [];
    const importRegex = /\bneeds\s+([a-zA-Z_.]+)(?:\s+as\s+([a-zA-Z_]+))?/g;
    let match;
    while ((match = importRegex.exec(text)) !== null) {
        imports.push({
            moduleName: match[1],
            alias: match[2] || null,
            isStd: match[1].startsWith('std.')
        });
    }
    return imports;
}

/**
 * Scanne un fichier local pour extraire les noms, docs et visibilité
 */
function parseLocalFunctionNames(text: string) {
    const functions: { name: string, label: string, doc: string, isPublic: boolean }[] = [];
    
    // Regex:
    // 1. (?:((?:\/\/.*(?:\r?\n\s*\/\/.*)*)\s*))?   Capture les commentaires docstrings (Groupe 1)
    // 2. (pub\s+)?                                 Capture le mot clé 'pub ' (Groupe 2)
    // 3. fn\s+([a-zA-Z_]\w*)                       Capture 'fn name' (Groupe 3 = name)
    // 4. \s*\(([^)]*)\)                            Capture les paramètres (Groupe 4)
    const fnRegex = /(?:((?:\/\/.*(?:\r?\n\s*\/\/.*)*)\s*))?(pub\s+)?fn\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)/g;
    
    let match;
    while ((match = fnRegex.exec(text)) !== null) {
        const docComment = match[1];
        const pubKeyword = match[2]; // Sera "pub " ou undefined
        const name = match[3];
        const params = match[4];

        functions.push({
            name: name,
            label: `${pubKeyword ? 'pub ' : ''}fn ${name}(${params})`,
            doc: docComment ? docComment.replace(/\/\//g, '').trim() : (pubKeyword ? "Public function." : "Private function."),
            isPublic: !!pubKeyword // true si "pub" est présent, sinon false
        });
    }
    return functions;
}