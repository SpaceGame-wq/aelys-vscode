# Architecture Technique

Ce document explique le fonctionnement de l'extention avec ces différents fichées. Contrairement à certaines extensions qui utilisent un LSP lourd, Aelys Programming Language utilise une approche légère basée sur des providers et des regex.

## Structure du Code (`src/`)

L'extension est divisée en "features" distinctes:

```text
src/
├── commands/                   # Commandes (run, update, ASM)
├── compiler/                   # Gestion du binaire (Téléchargement GitHub, Versioning)
├── core/                       # Constantes et utilitaires terminaux
├── features/                   # Intelligence du langage
│   ├── completionProvider.ts   # Autocomplétion (IntelliSense)
│   ├── definitionProvider.ts   # Go to definition (Ctrl+Clic)
│   ├── hoverProvider.ts        # Documentation au survol
│   ├── signatureProvider.ts    # Aide aux paramètres
│   └── symbolProvider.ts       # Vue outline (Structure)
├── server/                     # (Futur) Placeholder pour l'analyse statique avancée
└── docs.ts                     # Base de données statique de la documentation standard
```

## Fonctionnement des Providers

Chaque fonctionnalité clé repose sur une analyse lexicale rapide du document actif.

### Analyse des Symboles (`symbolProvider.ts`)
Pour construire l'outline, nous ne parsons pas tout l'AST. Nous lisons le fichier ligne par ligne
*   On fait une détection de `fn name(...)` et `let name = ...`
*   Un compteur intelligent suit les accolades `{` et `}` (en ignorant celles dans les chaînes ou commentaires) pour recréer la hiérarchie parent/enfant

### Résolution des Imports
Plusieurs providers (`completion`, `definition`, `hover`) partagent une logique commune
1.  Scan des lignes commençant par `needs`
2.  Extraction du nom du module et de son alias éventuel (`as alias`)
3.  Résolution du chemin
    *   Si `std.*` -> Utilisation des données internes (`src/docs.ts`)
    *   Si module local -> Recherche de `module.ae` ou `module.aelys` sur le disque

### Visibilité (`completionProvider.ts`)
Lors de l'analyse d'un fichier externe
*   Nous extrayons toutes les fonctions via Regex
*   Nous vérifions la présence du groupe de capture public `(pub\s+)?`
*   Si `pub` est absent, la fonction est exclue des suggestions d'autocomplétion(elle sera considéré comme fonction privé/local au fichié)

## Cycle de Vie

Au démarage, on éxécute le fichié `extension.ts` qui enregistre tous les providers auprès de l'API VS Code/Codium.
Au lancement, `compiler/manager.ts` vérifie l'API GitHub pour voir si une nouvelle version du binaire Aelys est disponible pour l'ordinateur(avec vérification de l'OS + de l'architecture CPU) sauf si un chemin local est défini dans les paramètres.
