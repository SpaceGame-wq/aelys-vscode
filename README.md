# Aelys pour VS Code/VS Codium

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github)](https://github.com/SpaceGame-wq/aelys-vscode)
[![Version](https://img.shields.io/visual-studio-marketplace/v/SpaceGame.aelys-lang?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=SpaceGame.aelys-lang)
[![License](https://img.shields.io/github/license/vbxq/aelys_lang?style=flat-square)](https://github.com/SpaceGame-wq/aelys-vscode/blob/main/LICENSE.txt)

Cette extension fournit le support du langage Aelys pour VSCode et VSCodium. Elle permet la coloration syntaxique, l'autocomplétion et les outils nécessaires pour compiler et exécuter vos scripts.

## Fonctionnalités

*   **Autocomplétion**: Suggestions contextuelles pour les modules standards et vos propres fichiers. Gère les alias `needs std.io as io` et respecte la visibilité `pub`
*   **Navigation**: `Ctrl + Clic` (ou F12) pour aller à la définition d'une fonction ou d'une variable, même dans un autre fichier
*   **Vue structure (Outline)**: Aperçu hiérarchique de votre fichier dans la barre latérale
*   **Documentation**: Survolez une fonction pour voir sa signature et sa documentation
*   **Outils intégrés**: Commandes pour lancer le script, inspecter le bytecode(ASM) ou ouvrir un REPL

## Installation

1. Installez l'extension depuis la [Marketplace](https://marketplace.visualstudio.com/items?itemName=SpaceGame.aelys-lang)
2. Ouvrez un fichier `.aelys` ou `.ae`
3. Au premier lancement, l'extension téléchargera automatiquement la dernière version du compilateur Aelys

## Exemple

```rust
needs std.io

// Attribut pour désactiver le GC (Performance)
@no_gc
fn calculate(x: int) -> int {
    return x * 2
}

fn main() {
    let result = calculate(21)
    io.println("Result: {result}")
}
```

## Documentation

- [Spécification](docs/features.md)
- [Configuration](docs/configuration.md)
- [Dépannage](docs/troubleshooting.md)
- [Architecture](docs/architecture.md)

## Liens utiles

- [**Langage Aelys**](https://github.com/vbxq/aelys_lang)
- [**Signaler un bug**](https://github.com/SpaceGame-wq/aelys-vscode/issues)