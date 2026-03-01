import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';
import { SIGNATURES, AelysSignature } from '../docs';

async function fileExists(filePath: string): Promise<boolean> {
    try { await fs.access(filePath); return true; } catch { return false; }
}

/**
 * Interface pour représenter un import détecté
 */
interface AelysImport {
    moduleName: string;   // ex: "std.io" ou "utils"
    alias: string | null; // ex: "net" dans "as net"
    isStd: boolean;      // true si commence par "std."
}

/**
 * Scanne le document pour trouver les fonctions définies par l'utilisateur
 * et extrait les commentaires placés juste au-dessus.
 */
function parseSignaturesFromText(text: string, prefix: string = ""): { [key: string]: AelysSignature } {
    const signatures: { [key: string]: AelysSignature } = {};

    // Regex
    // ((\/\/.*(?:\r?\n\s*\/\/.*)*)\s*)?     Groupe 2 = capture plusieurs lignes de commentaires commençant par //
    // fn\s+([a-zA-Z_]\w*)                   Groupe 3 = le nom de la fonction
    // \s*\(([^)]*)\)                        Groupe 4 = tout ce qu'il y a entre parenthèses
    const fnRegex = /(?:((?:\/\/.*(?:\r?\n\s*\/\/.*)*)\s*))?fn\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)/g;

    let match;
    while ((match = fnRegex.exec(text)) !== null) {
        const comment = match[1] ? match[1].replace(/\/\//g, '').trim() : "Fonction définie dans le module.";
        const name = match[2];
        const rawParams = match[3];
        const fullName = prefix ? `${prefix}.${name}` : name;

        signatures[fullName] = {
            label: `${fullName}(${rawParams})`,
            documentation: comment,
            parameters: rawParams.split(',').map(p => p.trim()).filter(p => p.length > 0).map(p => {
                // On sépare le nom du type s'il existe (ex: "needle: string" -> "needle")
                const paramName = p.split(':')[0].trim();
                return {
                    label: p, // Affiche "needle: string" dans la liste
                    documentation: ``
                };
            })
        };
    }
    return signatures;
}

/**
 * Analyse les imports du document
 */
function parseImports(document: vscode.TextDocument): AelysImport[] {
    const text = document.getText();
    const imports: AelysImport[] = [];
    // Regex needs (std.module ou module) (as alias)?
    const importRegex = /\bneeds\s+([a-zA-Z_.]+)(?:\s+as\s+([a-zA-Z_]+))?/g;

    let match;
    while ((match = importRegex.exec(text)) !== null) {
        const moduleName = match[1];
        imports.push({
            moduleName: moduleName,
            alias: match[2] || null,
            isStd: moduleName.startsWith('std.')
        });
    }
    return imports;
}

/**
 * Charge les signatures des modules importés
 */
async function getImportedSignatures(document: vscode.TextDocument, imports: AelysImport[]): Promise<{ [key: string]: AelysSignature }> {
    let allImportedSigs: { [key: string]: AelysSignature } = {};
    const currentDir = path.dirname(document.uri.fsPath);

    for (const imp of imports) {
        if (imp.isStd) {
            // GESTION DES LIBRAIRIES STANDARDS (std.io, etc.)
            const stdKey = imp.moduleName.replace('std.', ''); // ex: "io"
            
            // On cherche dans docs.ts toutes les fonctions qui commencent par "io."
            for (const [key, sig] of Object.entries(SIGNATURES)) {
                if (key.startsWith(stdKey + ".")) {
                    // Si on a un alias "as net", on remplace "net.connect" au lieu de "std.net.connect"
                    const searchPrefix = imp.alias || stdKey;
                    const newKey = key.replace(stdKey, searchPrefix);
                    allImportedSigs[newKey] = { ...sig, label: sig.label.replace(stdKey, searchPrefix) };
                }
            }
        } else {
            // GESTION DES FICHIERS LOCAUX (utils.aelys)
            const fileNames = [`${imp.moduleName}.aelys`, `${imp.moduleName}.ae`];
            for (const fName of fileNames) {
                const fullPath = path.join(currentDir, fName);
                if (await fileExists(fullPath)) {
                    try {
                        const content = await fs.readFile(fullPath, 'utf8');
                        // Si "needs utils as u", on préfixe les fonctions par "u."
                        const sigs = parseSignaturesFromText(content, imp.alias || "");
                        allImportedSigs = { ...allImportedSigs, ...sigs };
                    } catch (e) { console.error(e); }
                    break;
                }
            }
        }
    }
    return allImportedSigs;
}

export function registerSignatureProvider(): vscode.Disposable {
    return vscode.languages.registerSignatureHelpProvider('aelys', {
        async provideSignatureHelp(document, position) {
            
            // Scanner les imports
            const imports = parseImports(document);
            
            // Charger les signatures (Standards avec alias + Fichiers locaux)
            const importedSigs = await getImportedSignatures(document, imports);
            
            // Scanner les fonctions du fichier actuel
            const localSigs = parseSignaturesFromText(document.getText());

            // Fusion totale
            const allSignatures = { ...SIGNATURES, ...importedSigs, ...localSigs };

            // Récupérer tout le texte avant le curseur pour analyse
            const offset = document.offsetAt(position);
            const textUntilCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));

            let depth = 0;
            let paramIndex = 0;
            let functionName = "";
            let found = false;

            // Algorithme de remontée (backwards scanning) pour trouver la fonction parente
            for (let i = offset - 1; i >= 0; i--) {
                const char = textUntilCursor[i];

                if (char === ')') {
                    depth++; // On entre dans un bloc de parenthèses (ex: un appel imbriqué)
                } 
                else if (char === '(') {
                    if (depth > 0) {
                        depth--; // On sort d'un bloc imbriqué
                    } else {
                        // On a trouvé la parenthèse ouvrante de l'appel de fonction en cours
                        found = true;

                        // On cherche le nom de la fonction juste avant le '('
                        const match = textUntilCursor.substring(0, i).match(/([@a-zA-Z0-9_.]+)\s*$/);
                        if (match) {
                            functionName = match[1];
                        }

                        break;
                    }
                } 
                else if (char === ',' && depth === 0) {
                    // Une virgule au niveau de profondeur 0 indique qu'on passe au paramètre suivant
                    paramIndex++;
                }
            }

            // Si aucune fonction trouvée ou pas dans notre dictionnaire, on quitte
            if (!found || !functionName || !allSignatures[functionName]) {
                return undefined;
            }

            let sigInfo = allSignatures[functionName];

            // Si non trouvé (ex: l'utilisateur a tapé 'print' au lieu de 'io.print')
            if (!sigInfo && !functionName.includes('.')) {
                // On cherche dans les signatures globales si une fonction finit par ce nom
                // ex: si functionName est "print", on trouve "io.print"
                const globalKey = Object.keys(SIGNATURES).find(k => k.split('.').pop() === functionName);
                if (globalKey) {
                    sigInfo = SIGNATURES[globalKey];
                }
            }

            if (!sigInfo) return undefined;

            // Construction de l'objet SignatureHelp pour VS Code
            const signatureHelp = new vscode.SignatureHelp();
            
            const signature = new vscode.SignatureInformation(
                sigInfo.label, 
                new vscode.MarkdownString(sigInfo.documentation)
            );

            signature.parameters = sigInfo.parameters.map(p => 
                new vscode.ParameterInformation(p.label, p.documentation || `Parameter: ${p.label}`)
            );

            signatureHelp.signatures = [signature];
            signatureHelp.activeSignature = 0;
            
            // On s'assure de ne pas dépasser l'index des paramètres existants
            signatureHelp.activeParameter = Math.min(paramIndex, sigInfo.parameters.length - 1);

            return signatureHelp;
        }
    }, 
    '(', // ouverture de parenthèse
    ','  // passage au paramètre suivant
    );
}