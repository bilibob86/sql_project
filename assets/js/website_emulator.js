const mainBox = document.getElementById("website_emulator")
const pageLinks = mainBox.getElementsByClassName("page_link");
const pages = [
    mainBox.getElementsByClassName("connexion")[0],
    mainBox.getElementsByClassName("products")[0],
    mainBox.getElementsByClassName("cart")[0],
    mainBox.getElementsByClassName("orders")[0],
    mainBox.getElementsByClassName("account")[0]
]
const connexionForm = document.getElementById("connexion_form");

class userSession {
    constructor() {
        this.userId = null;
        this.isConnected = false;
    }
    async connexion(username, password) {
        username = username.replace(/'/g, "''");
        password = password.replace(/'/g, "''");
        let request = await sqlRequest("SELECT * FROM utilisateurs WHERE email = '" + username + "' AND mdp = '" + password + "'");
        if (request) {
            if (request.code == 200) {
                if (request.result[1].lenght != 0) {
                    this.userId = request.result[1][0][0];
                    this.isConnected = true;
                    return 200;
                } else {
                    return 404;
                }
            } else {
                return 500;
            }
        } else {
            return 500;
        }
    }
    async addToCart(productId, quantity) {
        let request = await sqlRequest("INSERT INTO panier (utilisateur_id, produit_id, qt) VALUES (" + this.userId + ", " + productId + ", " + quantity + ")");
        if (request) {
            if (request.code == 200) {
                return 200;
            } else {
                return 500;
            }
        } else {
            return 500;
        }
    }
    async removeFromCart(productId) {
        let request = await sqlRequest("DELETE FROM panier WHERE utilisateur_id = " + this.userId + " AND produit_id = " + productId);
        if (request) {
            if (request.code == 200) {
                return 200;
            } else {
                return 500;
            }
        } else {
            return 500;
        }
    }
    async getCart() {
        let request = await sqlRequest("SELECT * FROM panier WHERE utilisateur_id = " + this.userId);
        if (request) {
            if (request.code == 200) {
                response = [];
                for (let i = 0; i < request.result[1].length; i++) {
                    let product = await this.getProducts(request.result[1][i][2]);
                    response.push([product[0][1], product[0][2], product[0][3], product[0][4], request.result[1][i][3]]);
                }
                return response;
            } else {
                return 500;
            }
        } else {
            return 500;
        }
    }
    async order() {
        let request = await sqlRequest("INSERT INTO commandes (id_utilisateur) VALUES (" + this.userId + ")");
        if (request) {
            if (request.code == 200) {
                return 200;
            } else {
                return 500;
            }
        } else {
            return 500;
        }
    }
    async getOrders() {
        let request = await sqlRequest("SELECT * FROM commandes WHERE id_utilisateur = " + this.userId);
        if (request) {
            if (request.code == 200) {
                return request.result[1];
            } else {
                return 500;
            }
        } else {
            return 500;
        }
    }
    async getProducts(id = null) {
        let request = await sqlRequest("SELECT * FROM produits" + (id ? " WHERE id = " + id : ""));
        if (request) {
            if (request.code == 200) {
                return request.result[1];
            } else {
                return 500;
            }
        } else {
            return 500;
        }
    }
}

let session = new userSession();

connexionForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let connexion = await session.connexion(username, password);
    if (connexion == 200) {
        pages[0].style.display = "none";
        pages[1].style.display = "block";
    } else if (connexion == 404) {
        alert("Identifiants incorrects");
    } else if (connexion == 500) {
        alert("Une erreur est survenue");
    }
});