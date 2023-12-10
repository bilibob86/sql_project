# sql_project
Présentation HTML, d'une base de données SQL, sur le thème du site de e-commerce. Le fichier readme est en français, pour la bonne compréhension globale du projet. Les explications de code sont en anglais, car il s'agit d'un projet de formation, et que l'anglais est la langue de programmation.

[]: # Path: README.md

## Présentation du projet

Ce projet est un projet de formation, il a pour but de mettre en pratique les connaissances acquises sur le langage SQL.

## Prérequis

Pour pouvoir utiliser ce projet, il vous faudra installer un serveur local, tel que MAMP ou WAMP.
Il faudrait par la suite accéder à phpMyAdmin, et créer la base de donnée `sql_project`.
De plus il est necessaire d'installer les modules python Flask, Flask-Cors, colorama, et mysql-connector-python.

## Installation des modules

Pour installer les modules, il faut utiliser la commande `pip install <nom du module>` dans le terminal.

### Installation de Flask

Pour installer Flask, il faut utiliser la commande :
```bash
pip install Flask
```

### Installation de Flask-Cors

Pour installer Flask-Cors, il faut utiliser la commande :
```bash
pip install Flask-Cors
```

### Installation de mysql-connector-python

Pour installer mysql-connector-python, il faut utiliser la commande :
```bash	
pip install mysql-connector-python
```

### Verifiez la version de Python

Pour verifier la version de Python, il faut utiliser la commande :
```bash
python --version
```
Il faut que python soit en version 3.11 ou supérieur.
Notez que vous devrez peut-être utiliser pip3 au lieu de pip si vous utilisez Python 3. De plus, si vous rencontrez des problèmes de permissions, essayez d'ajouter --user à la fin de la commande pip.


## Utilisation

Après initialisation de la base de donnée, il faut lancer le fichier `main.py` dans le terminal.
Il faut ensuite telechargé les données de ce github et les mettre dans le dossier `www` de MAMP ou WAMP.
Après avoir lancer WAMP accédez à la page `localhost` et rentrez l'adresse depuis la racine `www` du fichier `index.html`.


# Documentation importante

## Fichier python `main.py`

Ce fichier python est le fichier principal du projet, il permet de lancer le serveur local, et de faire le lien entre la base de donnée et le site web. Il permet aussi de faire les requêtes SQL. Il est composé de 2 fonctions principales, `root`, et `execute`.
Les fonctions sont commentées dans le fichier.

## Fichier Javascript `sql_exe.js` - lignes 242 à 283

Ce fichier javascript est le fichier qui permet de faire les requêtes SQL, il est composé d'une fonction principale dont il est question ici : `sql_exe()`.

### Fonction `sql_exe()`

```javascript
async function sqlRequest(request) {
    const response = await fetch('http://127.0.0.1:5000/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        return false;
    }
}
```

Cette fonction permet de faire une requête SQL, elle prend en paramètre une requête SQL, et renvoie le résultat de la requête.
Elle est composée de 3 parties :
- La première partie est la partie qui permet de faire la requête SQL, elle est composée de la fonction `fetch`, qui permet de faire une requête HTTP, et de la fonction `JSON.stringify`, qui permet de convertir un objet JSON en chaîne de caractères.
- La deuxième partie est la partie qui permet de récupérer le résultat de la requête SQL, elle est composée de la fonction `response.json()`, qui permet de convertir le résultat de la requête en objet JSON.
- La troisième partie est la partie qui permet de gérer les erreurs, elle est composée d'un `try` et d'un `catch`, qui permettent de gérer les erreurs, et de renvoyer `false` en cas d'erreur.

## Les autres commentaires importants

D'autres fichies sont commentés, il s'agit des suivants :
- `assets/js/sql_editor.js` - Il permet de mettre en subrillance la syntaxe SQL.
- `assets/js/sql_exe.js` - Il permet de faire les requêtes SQL.