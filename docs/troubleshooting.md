# Dépannage (Troubleshooting)

## Le compilateur n'est pas trouvé
**Symptôme**: Erreur "Aelys executable not found" lors de l'exécution.
**Solution**
1. Vérifiez que vous êtes connecté à internet pour le téléchargement initial
2. Lancez la commande `Aelys: Check for Compiler Updates` pour forcer l'installation
3. Si vous avez défini `aelys.compiler.path`, vérifié que le chemin est correct et pointe vers l'exécutable(et non le dossier)

## L'autocomplétion ne voit pas mes fichiers
**Symptôme**: `needs utils as u` fonctionne, mais `u.` ne suggère rien
**Solution**
1. Assurez-vous que le fichier importé est bien sauvegardé
2. Vérifiez que les fonctions que vous voulez appeler sont marquées `pub` (ex: `pub fn test()`)
3. L'extension cherche les fichiers `.aelys` ou `.ae` dans le même dossier que le fichier en cours

## L'Outline est cassé / mal imbriqué
**Symptôme**: Des variables sortent de leur fonction dans la vue outline
**Cause**: Une accolade fermante `}` manque probablement quelque part, ou une syntaxe complexe a trompé l'analyseur(Si vous arrivez à tromper l'analyseur, veuillez m'en faire part pour que je puisse corriger cette erreur)
**Solution**: Vérifiez que vos blocs de code sont bien fermé. L'analyseur est robuste aux accolades dans les chaînes (`"}"`), mais une erreur de syntaxe réelle peut le perturber.

## Logs
Pour voir ce qui se passe dans l'extention
1. Ouvrez le panneau "Output" de VS Code
2. Sélectionnez "Extension Host" (ou "Aelys" si disponible) dans le menu déroulant.
