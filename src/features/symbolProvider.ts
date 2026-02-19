import * as vscode from 'vscode';

export function registerSymbolProvider(): vscode.Disposable {
    return vscode.languages.registerDocumentSymbolProvider('aelys', {
        provideDocumentSymbols(document, token) {
            const rootSymbols: vscode.DocumentSymbol[] = [];
            const stack: { symbol: vscode.DocumentSymbol, depth: number }[] = [];
            let currentDepth = 0;

            const fnRegex = /\bfn\s+([a-zA-Z_]\w*)\s*(\(.*\))/;
            // Regex ajustée pour mieux capturer les types optionnels
            const varRegex = /\b(let|mut)\s+(?:mut\s+)?([a-zA-Z_]\w*)\s*(?::\s*([a-zA-Z_0-9<>]+))?/;
            const attrRegex = /(@[a-zA-Z_]\w*)/;

            let pendingAttribute: string | null = null;

            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                let text = line.text;

                // 1. NETTOYAGE (Commentaires & Strings)
                // On remplace les chaînes et commentaires par des espaces pour garder les index
                text = text.replace(/\/\/.*$/g, ''); // Retire les commentaires
                text = text.replace(/"(?:[^"\\]|\\.)*"/g, '""'); // Vide les chaînes

                // 2. RETIRER LES PAIRES D'ACCOLADES INLINE (ex: "if x { return }")
                // Tant qu'on trouve une paire {}, on l'enlève.
                let prevText = "";
                while (text !== prevText) {
                    prevText = text;
                    text = text.replace(/{[^{}]*}/g, '');
                }

                const trimmed = line.text.trim(); // On garde l'original pour le texte

                // 3. COMPTAGE DES ACCOLADES RESTANTES
                // Ce sont celles qui affectent la structure (ouverture/fermeture de bloc multi-lignes)
                const opens = (text.match(/{/g) || []).length;
                const closes = (text.match(/}/g) || []).length;

                // 4. LOGIQUE DE DÉTECTION (Sur le texte original)
                const originalText = line.text;
                
                // Attributs
                const attrMatch = originalText.match(attrRegex);
                if (attrMatch) pendingAttribute = attrMatch[1];

                // Fonctions
                const fnMatch = originalText.match(fnRegex);
                if (fnMatch) {
                    const name = fnMatch[1];
                    const params = fnMatch[2] === "()" ? "" : fnMatch[2];
                    const detail = pendingAttribute ? `${pendingAttribute} ${params}` : params;

                    const symbol = new vscode.DocumentSymbol(
                        name,
                        detail,
                        vscode.SymbolKind.Function,
                        line.range,
                        line.range
                    );

                    if (stack.length > 0) {
                        stack[stack.length - 1].symbol.children.push(symbol);
                    } else {
                        rootSymbols.push(symbol);
                    }

                    // On push sur la stack AVEC la profondeur actuelle
                    stack.push({ symbol, depth: currentDepth });
                    pendingAttribute = null;
                }
                // Variables
                else {
                    const varMatch = originalText.match(varRegex);
                    if (varMatch) {
                        const name = varMatch[2];
                        const type = varMatch[3];
                        const isConstant = /^[A-Z0-9_]+$/.test(name);
                        
                        const symbol = new vscode.DocumentSymbol(
                            name,
                            type ? `: ${type}` : "",
                            isConstant ? vscode.SymbolKind.Constant : vscode.SymbolKind.Variable,
                            line.range,
                            line.range
                        );

                        if (stack.length > 0) {
                            stack[stack.length - 1].symbol.children.push(symbol);
                        } else {
                            rootSymbols.push(symbol);
                        }
                    }
                }

                // 5. MISE À JOUR DE LA PROFONDEUR
                // On traite d'abord les fermetures (pour fermer le bloc courant avant d'en ouvrir un autre éventuel)
                for (let b = 0; b < closes; b++) {
                    currentDepth--;
                    if (stack.length > 0 && stack[stack.length - 1].depth === currentDepth) {
                        const closed = stack.pop();
                        if (closed) {
                            closed.symbol.range = new vscode.Range(closed.symbol.range.start, line.range.end);
                        }
                    }
                }
                
                // Ensuite les ouvertures
                currentDepth += opens;

                if (trimmed === "" && !attrMatch) pendingAttribute = null;
            }

            return rootSymbols;
        }
    });
}