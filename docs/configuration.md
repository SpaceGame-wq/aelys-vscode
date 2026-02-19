# Guide de Configuration

Vous pouvez personnaliser l'extension via le menu settings (`Ctrl+,`) en cherchant "Aelys", ou directement dans votre `settings.json`.

## Paramètres du Compilateur

| ID | Type | Défaut | Description |
|----|------|--------|-------------|
| `aelys.compiler.path` | `string` | `""` | Chemin absolu vers l'exécutable `aelys`. Si vide, l'extension utilise la version téléchargée automatiquement dans son dossier global |
| `aelys.compiler.version` | `string` | `"latest"` | Version cible à télécharger (ex: `v0.19.14-b`) |
| `aelys.compiler.autoCheck` | `boolean` | `true` | Vérifie les mises à jour du compilateur sur GitHub au démarrage de VSCode |

## Paramètres d'Exécution

| ID | Type | Défaut | Description |
|----|------|--------|-------------|
| `aelys.execution.defaultArguments` | `string` | `--ae-trusted=true` | Arguments passés au compilateur lors du clic sur le bouton "Play" ou via la commande run |
| `aelys.asm.defaultArguments` | `string` | `-O0` | Arguments utilisés pour l'inspecteur de bytecode. Utilisez `-O0` pour voir le code brut, ou `-O3` pour voir le résultat optimisée |

## Exemple de configuration (settings.json)

```json
{
    "aelys.compiler.path": "C:\\Dev\\aelys_lang\\target\\release\\aelys.exe",
    "aelys.execution.defaultArguments": "--ae-trusted=true",
    "aelys.autoUpdate": false
}
```