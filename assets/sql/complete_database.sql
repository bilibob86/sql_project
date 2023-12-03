-- Create the 'utilisateurs' table to store user information
CREATE TABLE `utilisateurs` (
  id INT NOT NULL AUTO_INCREMENT,
  nom TEXT NOT NULL,
  email VARCHAR(100) NOT NULL,
  mdp VARCHAR(200) NOT NULL,
  anniv DATE NOT NULL,
  creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- Insert sample data into the 'utilisateurs' table
INSERT INTO utilisateurs (nom, email, mdp, anniv) VALUES
  ('John Doe', 'john.doe@example.com', 'motdepasse1', '1990-01-01'),
  ('Alice Smith', 'alice.smith@example.com', 'motdepasse2', '1991-02-02'),
  ('Bob Johnson', 'bob.johnson@example.com', 'motdepasse3', '1992-03-03'),
  ('Emily Davis', 'emily.davis@example.com', 'motdepasse4', '1993-04-04'),
  ('Michael Wilson', 'michael.wilson@example.com', 'motdepasse5', '1994-05-05'),
  ('Sophie Brown', 'sophie.brown@example.com', 'motdepasse6', '1995-06-06'),
  ('David Lee', 'david.lee@example.com', 'motdepasse7', '1996-07-07'),
  ('Emma Miller', 'emma.miller@example.com', 'motdepasse8', '1997-08-08'),
  ('Matthew Taylor', 'matthew.taylor@example.com', 'motdepasse9', '1998-09-09'),
  ('Olivia Anderson', 'olivia.anderson@example.com', 'motdepasse10', '1999-10-10'),
  ('Daniel White', 'daniel.white@example.com', 'motdepasse11', '2000-11-11'),
  ('Grace Harris', 'grace.harris@example.com', 'motdepasse12', '2001-12-12'),
  ('Christopher Martinez', 'christopher.martinez@example.com', 'motdepasse13', '2002-01-01'),
  ('Ella Jackson', 'ella.jackson@example.com', 'motdepasse14', '2003-02-02'),
  ('Benjamin Thompson', 'benjamin.thompson@example.com', 'motdepasse15', '2004-03-03');

-- Create the 'produit' table to store product information
CREATE TABLE `produits` (
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  prix FLOAT NOT NULL,
  PRIMARY KEY (id)
);

-- Insert sample data into the 'produit' table
INSERT INTO produits (nom, description, prix) VALUES
  ("Ordinateur portable HP", "Ordinateur portable HP avec processeur rapide et écran haute résolution.", 899.99),
  ("Smartphone Samsung Galaxy", "Smartphone Samsung Galaxy avec appareil photo haute résolution et écran OLED.", 699.99),
  ("Casque audio Sony", "Casque audio sans fil de qualité supérieure avec suppression du bruit.", 249.99),
  ("Tablette Apple iPad", "Tablette iPad d'Apple avec processeur puissant et écran Retina.", 499.99),
  ("Enceinte Bluetooth JBL", "Enceinte Bluetooth portable étanche avec une excellente qualité audio.", 79.99),
  ("Appareil photo Canon EOS", "Appareil photo reflex numérique Canon EOS avec capteur haute résolution.", 1199.99),
  ("Laptop Dell XPS", "Laptop Dell XPS ultraportable avec processeur Intel Core et écran InfinityEdge.", 1299.99),
  ("Écouteurs sans fil Apple AirPods", "Écouteurs sans fil Apple AirPods avec boîtier de charge.", 159.99),
  ("Moniteur LG UltraWide", "Moniteur LG UltraWide avec résolution 4K et technologie IPS.", 699.99),
  ("Caméra de sécurité Nest", "Caméra de sécurité Nest avec vision nocturne et détection de mouvement.", 199.99),
  ("Console de jeux Sony PlayStation", "Console de jeux Sony PlayStation avec capacités 4K et lecteur Blu-ray.", 499.99),
  ("Routeur WiFi ASUS", "Routeur WiFi ASUS haut de gamme pour des connexions rapides et stables.", 149.99),
  ("Imprimante Epson EcoTank", "Imprimante Epson EcoTank avec réservoirs d'encre rechargeables.", 299.99),
  ("Souris gaming Logitech", "Souris gaming Logitech avec capteur optique avancé et éclairage RGB.", 69.99),
  ("Drone DJI Mavic", "Drone DJI Mavic avec caméra 4K et fonctionnalités de vol intelligentes.", 899.99),
  ("Disque dur externe Seagate", "Disque dur externe Seagate avec grande capacité de stockage.", 129.99),
  ("Smartwatch Fitbit", "Smartwatch Fitbit avec suivi de la santé et des activités.", 129.99),
  ("Routeur mesh Google Nest", "Routeur mesh Google Nest pour une couverture WiFi étendue.", 199.99),
  ("Clavier mécanique Corsair", "Clavier mécanique Corsair avec switches Cherry MX et rétroéclairage RGB.", 129.99),
  ("Écran gaming Acer Predator", "Écran gaming Acer Predator avec taux de rafraîchissement élevé et résolution WQHD.", 399.99);

-- Create the 'panier' table to store user's shopping cart information
CREATE TABLE panier (
  id INT NOT NULL AUTO_INCREMENT, 
  utilisateurs_id INT NOT NULL,
  produit_id INT NOT NULL,
  qt INT NOT NULL,
  PRIMARY KEY (id), 
  FOREIGN KEY (utilisateurs_id) REFERENCES utilisateurs(id), 
  FOREIGN KEY(produit_id) REFERENCES produits(id)
);

-- Insert sample data into the 'panier' table
INSERT INTO panier (utilisateurs_id, produit_id, qt) VALUES
  (1, 1, 2),
  (1, 3, 1),
  (2, 5, 3),
  (3, 7, 1),
  (3, 10, 2),
  (4, 12, 1),
  (4, 15, 1),
  (5, 18, 2);

-- Create the 'commandes' table to store user's orders information
CREATE TABLE commandes (
  id INT NOT NULL AUTO_INCREMENT,
  utilisateurs_id INT NOT NULL,
  livraison VARCHAR(100) NOT NULL,
  total FLOAT NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (utilisateurs_id) REFERENCES utilisateurs(id)
);

-- Insert sample data into the 'commandes' table
INSERT INTO commandes (utilisateurs_id, livraison, total) VALUES
  (1, 'Retrait en magasin', 199.99),
  (2, 'Retrait en magasin', 459.98),
  (3, 'Retrait en magasin', 799.97),
  (4, 'Retrait en magasin', 359.99);

-- Create the 'contenu' table to store the contents of each order
CREATE TABLE contenu (
  id INT NOT NULL AUTO_INCREMENT,
  commande_id INT NOT NULL,
  produit_id INT NOT NULL,
  qt INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (commande_id) REFERENCES commandes(id),
  FOREIGN KEY (produit_id) REFERENCES produits(id)
);

-- Insert sample data into the 'contenu' table
INSERT INTO contenu (commande_id, produit_id, qt) VALUES
  (1, 1, 1),
  (1, 3, 2),
  (2, 5, 2),
  (2, 7, 1),
  (2, 9, 3),
  (3, 11, 1),
  (3, 13, 2),
  (3, 15, 1),
  (4, 17, 3),
  (4, 19, 2);