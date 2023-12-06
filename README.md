# sql_project
Présentation HTML, d'une base de données SQL, sur le thème du site de e-commerce.

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

### Installation de colorama

Pour installer colorama, il faut utiliser la commande :
```bash
pip install colorama
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
