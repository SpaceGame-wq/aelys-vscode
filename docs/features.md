# Fonctionnalités

Ce document détaille les capacités de l'extension.

## IntelliSense et Autocomplétion

L'extention vous donne une complétions de fonction que vous avez créer(inter-fichiées et intra-fichiées), en vous donnant les paramètres personalitée avec leurs types.

### Résolution des Modules
Lorsque vous tapez `needs std.fs as fsn`, l'extension enregistre l'alias `fsn`
* Si vous tapez `fsn.`, elle proposera les fonctions du module `std.fs`
* Si vous survolez `fsn.read_text`, elle affichera la documentation de `read_text` de std.fs

### Visibilité (`pub`)
L'autocomplétion respecte l'encapsulation sur différents fichées
* Vous avez accès à toutes les fonctions d'un fichée local
* Et pour les fichées importée, seules les fonctions marquées `pub fn` sont suggérées. Les fonctions privées restent cachées

## Navigation et Structure

### Vue outline (Hiérarchique)
La barre latérale "Outline" offre une vue rapide de votre fichier
* **Icônes**: `[f]` pour fonctions, `[x]` pour variables, `[C]` pour constantes
* **Imbrication**: Les variables déclarées dans une fonction sont affichées comme enfants de cette fonction
* **Détails**: Affiche les types et les paramètres en gris à côté du nom
* **Logique**: Utilise un algorithme de comptage d'accolades (`{}`) pour ne pas être trompé par des blocs `if` ou `for`

### Go to definition (`F12` ou `Ctrl+Clic`)
* Fonctionne sur les **fonctions** et les **variables**
* Si vous cliquez sur une fonction importée (`utils.calcul()`), l'extension ouvre le fichier `utils.ae`, cherche la ligne de définition et y place le curseur

## Aide à la signature

Lorsque vous tapez une fonction, une info-bulle apparaît
1. **Surlignage du paramètre**: Le paramètre en cours de frappe est mis en gras
2. **Support imbriqué**: `math.max(math.min(a, b), c)` -> L'extension sait exactement où vous êtes
3. **Docstrings**: Si vous avez documenté votre fonction avec `//`, ce commentaire apparaît dans l'aide

## Exécution et Bytecode

### Bytecode Inspector
La commande `Aelys: Inspect Bytecode` lance le compilateur avec l'option `asm` et redirige la sortie (`stdout`) vers un fichier temporaire en lecture seule dans VS Code. Cela permet de voir comment votre code Aelys est traduit en instructions machine virtuelles.