# Aelys Language Support

[![Version](https://img.shields.io/visual-studio-marketplace/v/vbxq.aelys-lang?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=SpaceGame.aelys-lang)
[![License](https://img.shields.io/github/license/vbxq/aelys_lang?style=flat-square)](https://github.com/vbxq/aelys_lang/blob/main/LICENSE)

**Aelys** est un langage de script moderne, performant et conscient du système, conçu pour offrir la simplicité du Python avec le contrôle du Rust. Cette extension apporte un support complet de la coloration syntaxique pour VS Code.

> [!TIP]
> Le compilateur et la VM Aelys sont disponibles sur le dépôt officiel : [vbxq/aelys_lang](https://github.com/vbxq/aelys_lang)

---

## Fonctionnalités de l'extension

- **Coloration Syntaxique Avancée** : Support complet des mots-clés, types, attributs et constantes.
- **Support des Attributs** : Mise en évidence spéciale pour `@no_gc`, `@inline`, `@inline_always`.
- **Interpolation de Chaînes** : Coloration intelligente du code à l'intérieur des chaînes `{expression}`.
- **Gestion des Modules** : Identification visuelle des imports `needs ... from ...`.
- **Types Génériques** : Coloration propre des structures `Vec<T>` et `Array<T>`.

---

## Aperçu du langage Aelys

Aelys se distingue par son système hybride de gestion mémoire et ses performances élevées pour une VM bytecode.

### Exemple : Compresseur LZW (Unicode-Binary)
Voici à quoi ressemble le code Aelys avec cette extension :

```rust
needs std.io
needs std.fs as fs
needs std.string as str

// Attribut de performance pour désactiver le Garbage Collector
@no_gc
fn compress(text: string) -> Vec<Int> {
    let dict = init_dictionary()
    let mut w = ""
    let output = Vec[0]; output.pop()

    for i in 0..str.len(text) {
        let c = str.char_at(text, i)
        let wc = w + c
        if find_in_dict(dict, wc) != -1 {
            w = wc
        } else {
            output.push(find_in_dict(dict, w))
            dict.push(wc)
            w = c
        }
    }
    return output
}
```

### Pourquoi Aelys ?
- **Performance** : Nan-boxing (entiers 48 bits) et VM optimisée.
- **Contrôle** : Possibilité de gestion manuelle de la mémoire avec `@no_gc`.
- **Sécurité** : Système de capacités (`--allow-caps`) pour restreindre l'accès FS/NET.
- **Moderne** : Typage graduel (Hindley-Milner) et syntaxe expressive.

---

## Installation

1. Ouvrez **VS Code**.
2. Allez dans l'onglet **Extensions** (`Ctrl+Shift+X`).
3. Recherchez **"Aelys"**.
4. Cliquez sur **Installer**.

---

## Documentation & Communauté

Pour en savoir plus sur le langage Aelys, ses bibliothèques standards (`std.io`, `std.fs`, `std.net`, `std.bytes`) et ses benchmarks, visitez :

- **Documentation officielle** : [vbxq/aelys_lang/docs](https://github.com/vbxq/aelys_lang/blob/master/docs/getting-started.md)
- **Exemples de code** : [vbxq/aelys_lang/examples](https://github.com/vbxq/aelys_lang/blob/master/examples/README.md)

---

## Contribution

Les contributions à cette extension sont les bienvenues ! Si vous trouvez un bug dans la coloration ou si vous souhaitez ajouter des snippets :

1. Forkez le projet.
2. Créez votre branche (`git checkout -b feature/AmazingFeature`).
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`).
4. Pushez sur la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une Pull Request.

---

**Développé pour la communauté Aelys.**
*Extension créée par [Space Game](https://github.com/SpaceGame-wq), Langage créé par [vbxq](https://github.com/vbxq).*