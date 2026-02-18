import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function registerDefinitionProvider(): vscode.Disposable {
    return vscode.languages.registerDefinitionProvider('aelys', {
        async provideDefinition(document, position, token) {
            // Récupérer le mot sous le curseur (ex: "m.add" ou "ma_fonction")
            const range = document.getWordRangeAtPosition(position, /[@a-zA-Z0-9_.]+/);
            if (!range) return null;

            const word = document.getText(range);
            let targetName = word;
            let targetUri = document.uri;

            // Si le mot contient un point (ex: "m.add")
            if (word.includes('.')) {
                const parts = word.split('.');
                const alias = parts[0];
                targetName = parts[1];

                // Trouver à quel fichier correspond l'alias
                const imports = parseImportsForDefinition(document);
                const imp = imports.find(i => (i.alias || i.moduleName.split('.').pop()) === alias);

                if (imp && !imp.isStd) {
                    // C'est un fichier local (ex: utils.ae)
                    const currentDir = path.dirname(document.uri.fsPath);
                    const fileNames = [`${imp.moduleName}.aelys`, `${imp.moduleName}.ae`];
                    
                    for (const fName of fileNames) {
                        const fullPath = path.join(currentDir, fName);
                        if (fs.existsSync(fullPath)) {
                            targetUri = vscode.Uri.file(fullPath);
                            break;
                        }
                    }
                } else if (imp && imp.isStd) {
                    // Pour la librairie standard, on ne va pas "aller" à la définition
                    return null; 
                }
            }

            // Ouvrir le document cible (soit lui-même, soit un fichier importé)
            let targetDoc: vscode.TextDocument;
            try {
                targetDoc = await vscode.workspace.openTextDocument(targetUri);
            } catch {
                return null;
            }

            // Chercher la ligne de définition (Fonction OU Variable)
            const lineIndex = findDefinitionLine(targetDoc, targetName);

            if (lineIndex !== -1) {
                // Retourne la position exacte (Ligne, Colonne 0)
                return new vscode.Location(targetUri, new vscode.Position(lineIndex, 0));
            }

            return null;
        }
    });
}

/**
 * Cherche la ligne de définition d'un symbole (fn, let, mut)
 */
function findDefinitionLine(document: vscode.TextDocument, name: string): number {
    // Cette Regex cherche
    // - Soit une fonction   fn name
    // - Soit une variable   let name OU let mut name
    // \b assure que l'on ne capture pas "let my_name" si on cherche "name"
    const regex = new RegExp(`\\b(fn|let|mut)\\s+(?:mut\\s+)?${name}\\b`);

    for (let i = 0; i < document.lineCount; i++) {
        const lineText = document.lineAt(i).text;
        if (regex.test(lineText)) {
            return i;
        }
    }
    return -1;
}

/**
 * Analyse simplifiée des imports (similaire à SignatureProvider)
 */
function parseImportsForDefinition(document: vscode.TextDocument) {
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