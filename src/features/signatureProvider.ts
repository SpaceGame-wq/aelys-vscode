import * as vscode from 'vscode';
import { SIGNATURES, AelysSignature } from '../docs';

/**
 * Scanne le document pour trouver les fonctions définies par l'utilisateur
 * et extrait les commentaires placés juste au-dessus.
 */
function parseUserSignatures(document: vscode.TextDocument): { [key: string]: AelysSignature } {
    const text = document.getText();
    const userSignatures: { [key: string]: AelysSignature } = {};

    // Regex
    // ((\/\/.*(?:\r?\n\s*\/\/.*)*)\s*)?     Groupe 2 = capture plusieurs lignes de commentaires commençant par //
    // fn\s+([a-zA-Z_]\w*)                   Groupe 3 = le nom de la fonction
    // \s*\(([^)]*)\)                        Groupe 4 = tout ce qu'il y a entre parenthèses
    const fnRegex = /(?:((?:\/\/.*(?:\r?\n\s*\/\/.*)*)\s*))?fn\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)/g;

    let match;
    while ((match = fnRegex.exec(text)) !== null) {
        const fullComment = match[1] ? match[1].replace(/\/\//g, '').trim() : "Fonction définie par l'utilisateur.";
        const name = match[2];
        const rawParams = match[3];

        // Nettoyage et découpage des paramètre
        const params = rawParams.split(',').map(p => p.trim()).filter(p => p.length > 0);

        userSignatures[name] = {
            label: `${name}(${rawParams})`,
            documentation: fullComment,
            parameters: params.map(p => ({
                label: p,
                documentation: ``
            }))
        };
    }
    return userSignatures;
}

/**
 * Provider principal pour l'aide aux paramètres (Signature Help)
 */
export function registerSignatureProvider(): vscode.Disposable {
    return vscode.languages.registerSignatureHelpProvider('aelys', {
        provideSignatureHelp(document, position, token, _context) {
            
            // Analyse dynamique du document actuel pour les fonctions utilisateur
            const userSigs = parseUserSignatures(document);
            
            // Fusionner avec la bibliothèque standard (std) définie dans docs.ts
            const allSignatures = { ...SIGNATURES, ...userSigs };

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
                        const textBeforeParen = textUntilCursor.substring(0, i);
                        const nameMatch = textBeforeParen.match(/([@a-zA-Z0-9_.]+)\s*$/);
                        
                        if (nameMatch) {
                            functionName = nameMatch[1];
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

            const sigInfo = allSignatures[functionName];

            // Construction de l'objet SignatureHelp pour VS Code
            const signatureHelp = new vscode.SignatureHelp();
            
            const signature = new vscode.SignatureInformation(
                sigInfo.label, 
                new vscode.MarkdownString(sigInfo.documentation)
            );

            signature.parameters = sigInfo.parameters.map(p => 
                new vscode.ParameterInformation(p.label, p.documentation)
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