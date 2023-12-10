const mainBox = document.getElementById("website_emulator")
const pageName = document.getElementById("page_title");
const pageLinks = mainBox.getElementsByClassName("page_link");
const pages = [
    mainBox.getElementsByClassName("connexion")[0],
    mainBox.getElementsByClassName("products")[0],
    mainBox.getElementsByClassName("cart")[0],
    mainBox.getElementsByClassName("orders")[0]
]
const pagesNames = [
    "connexion",
    "products",
    "cart",
    "orders"
]
const connexionForm = document.getElementById("connexion_form");

/**
 * @class userSession - User session class
 * @property {number} userId - User id
 * @property {boolean} isConnected - User connection status
 * @method connexion - User connection method
 * @method addToCart - Add a product to the cart
 * @method removeFromCart - Remove a product from the cart
 * @method getCart - Get the cart
 * @method getTotal - Get the total price of the cart
 * @method order - Order the cart
 * @method getOrders - Get the orders
 * @method getProducts - Get the products
 * @returns {userSession} - User session object
 * 
 */
class userSession {
    constructor() {
        this.userId = null;
        this.isConnected = false;
    }
    async connexion(username, password) {
        username = username.replace(/'/g, "''"); // SQL injection protection
        password = password.replace(/'/g, "''"); // SQL injection protection
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
                let response = [];
                for (let i = 0; i < request.result[1].length; i++) {
                    let product = await this.getProducts(request.result[1][i][2]);
                    response.push([product[0][0], product[0][1], product[0][2], product[0][3], request.result[1][i][3]]);
                }
                return response;
            } else {
                return 500;
            }
        } else {
            return 500;
        }
    }
    async getTotal() {
        let request = await sqlRequest("SELECT SUM(produits.prix * panier.qt) FROM panier INNER JOIN produits ON panier.produit_id = produits.id WHERE panier.utilisateur_id = " + this.userId);
        if (request) {
            if (request.code == 200) {
                return request.result[1][0][0];
            } else {
                return 500;
            }
        } else {
            return 500;
        }
    }
    async order() {
        // Insert set utilisateur_id, livraison, total
        let total = await this.getTotal();
        let request = await sqlRequest("INSERT INTO commandes (utilisateur_id, livraison, total) VALUES (" + this.userId + ", NOW(), " + total + ")");
        let order_id = await sqlRequest("SELECT id FROM commandes WHERE utilisateur_id = " + this.userId + " ORDER BY id DESC LIMIT 1");
        let cart = await this.getCart();
        for (let i = 0; i < cart.length; i++) {
            let addToOrder = await sqlRequest("INSERT INTO contenu (commande_id, produit_id, qt) VALUES (" + order_id.result[1][0][0] + ", " + cart[i][0] + ", " + cart[i][3] + ")");
            let deleteFromCart = await this.removeFromCart(cart[i][0]);
        }
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
        // get all orders, order_content and products
        let request = await sqlRequest("SELECT commandes.id AS commande_id, commandes.livraison AS moyen_de_livraison, commandes.total AS total_commande, commandes.date AS date_commande, produits.id AS produit_id, produits.nom AS produit_nom, produits.prix AS produit_prix, contenu.qt AS quantite FROM commandes JOIN contenu ON commandes.id = contenu.commande_id JOIN produits ON contenu.produit_id = produits.id WHERE commandes.utilisateur_id=" + this.userId + " ORDER BY commande_id DESC");
        if (request) {
            if (request.code == 200) {
                let response = [];
                for (let i = 0; i < request.result[1].length; i++) {
                    let order = [];
                    let products = [];
                    let order_id = request.result[1][i][0];
                    let order_delivery = request.result[1][i][1];
                    let order_total = request.result[1][i][2];
                    let order_date = request.result[1][i][3];
                    for (let j = 0; j < request.result[1].length; j++) {
                        if (request.result[1][j][0] == order_id) {
                            products.push([request.result[1][j][3], request.result[1][j][4], request.result[1][j][5], request.result[1][j][6]]);
                        }
                    }
                    order.push([order_id, order_delivery, order_total, order_date]);
                    response.push([order, products]);
                }
                return response;
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
        pages[0].classList.add("hidden");
        pages[1].classList.remove("hidden");
        updateProducts();
    } else if (connexion == 404) {
        alert("Identifiants incorrects");
    } else if (connexion == 500) {
        alert("Une erreur est survenue");
    }
});

for (let i = 0; i < pageLinks.length; i++) {
    pageLinks[i].addEventListener("click", function() {
        if (session.isConnected) {
            for (let j = 0; j < pages.length; j++) {
                pages[j].classList.add("hidden");
            }
            pages[i + 1].classList.remove("hidden");
            if (i == 0) {
                updateProducts();
            } else if (i == 1) {
                updateCart();
            } else if (i == 2) {
                updateOrders();
            }
        }
    });
}

async function updateProducts() {
    session.getProducts().then(function(products) {
        let productsList = mainBox.getElementsByClassName("products")[0];
        for (let i = 0; i < products.length; i++) {
            let product = document.createElement("div");
            product.classList.add("product");

            let productImg = document.createElement("div");
            productImg.classList.add("product_img");
            let img = document.createElement("img");
            img.src = `../assets/img/website_emulator/${products[i][0]}.webp`;
            productImg.appendChild(img);
            product.appendChild(productImg);

            let productDesc = document.createElement("div");
            productDesc.classList.add("product_desc");
            let productName = document.createElement("div");
            productName.classList.add("product_name");
            productName.innerHTML = products[i][1];
            let productPrice = document.createElement("div");
            productPrice.classList.add("product_price");
            productPrice.innerHTML = `${products[i][3]}€`;
            productDesc.appendChild(productName);
            productDesc.appendChild(productPrice);
            product.appendChild(productDesc);

            let addToCartBtn = document.createElement("div");
            addToCartBtn.classList.add("product_add");
            let cartImg = document.createElement("img");
            cartImg.src = "../assets/icons/icons8-caddie-30.png";
            addToCartBtn.appendChild(cartImg);
            product.appendChild(addToCartBtn);

            productsList.appendChild(product);

            addToCartBtn.addEventListener("click", async function() {
                let addToCart = await session.addToCart(products[i][0], 1);
                if (addToCart == 200) {
                    alert("Produit ajouté au panier");
                } else if (addToCart == 500) {
                    alert("Une erreur est survenue");
                }
            });
        }
    });
}

async function updateCart() {
    let cart = await session.getCart();
    let cartList = mainBox.getElementsByClassName("cart_products")[0];
    cartList.innerHTML = "";
    if (cart.length == 0) {
        cartList.innerHTML = "Votre panier est vide";
    }
    for (let i = 0; i < cart.length; i++) {
        let product = document.createElement("div");
        product.classList.add("product");

        let productImg = document.createElement("div");
        productImg.classList.add("product_img");
        let img = document.createElement("img");
        img.src = `../assets/img/website_emulator/${cart[i][0]}.webp`;
        productImg.appendChild(img);
        product.appendChild(productImg);

        let productDesc = document.createElement("div");
        productDesc.classList.add("product_desc");
        let productName = document.createElement("div");
        productName.classList.add("product_name");
        productName.innerHTML = cart[i][1];
        productDesc.appendChild(productName);
        let productPrice = document.createElement("div");
        productPrice.classList.add("product_price");
        productPrice.innerHTML = `${cart[i][3]}€`;
        productDesc.appendChild(productPrice);
        let productQuantity = document.createElement("div");
        productQuantity.classList.add("product_quantity");
        productQuantity.innerHTML = cart[i][4];
        productDesc.appendChild(productQuantity);
        product.appendChild(productDesc);

        let removeFromCartBtn = document.createElement("div");
        removeFromCartBtn.classList.add("product_remove");
        let cartImg = document.createElement("img");
        cartImg.src = "../assets/icons/icons8-supprimer-30.png";
        removeFromCartBtn.appendChild(cartImg);
        product.appendChild(removeFromCartBtn);

        cartList.appendChild(product);

        removeFromCartBtn.addEventListener("click", async function() {
            let removeFromCart = await session.removeFromCart(cart[i][0]);
            if (removeFromCart == 200) {
                alert("Produit retiré du panier");
                updateCart();
            } else if (removeFromCart == 500) {
                alert("Une erreur est survenue");
            }
        });
    }

    let total = document.getElementById("cart_total_amount");
    total.innerHTML = await session.getTotal();
}

let orderButton = document.getElementById("to_order");
orderButton.addEventListener("click", async function() {
    let order = await session.order();
    if (order == 200) {
        alert("Commande effectuée");
        updateCart();
    } else if (order == 500) {
        alert("Une erreur est survenue");
    }
});

async function updateOrders() {
    let orders = await session.getOrders();
    let ordersList = mainBox.getElementsByClassName("orders_list")[0];
    ordersList.innerHTML = "";
    if (orders.length == 0) {
        ordersList.innerHTML = "Vous n'avez pas encore passé de commande";
    }
    console.log(orders);
    order_id = 0;
    i = -1;
    for (let i = 0; i < orders.length; i++) {
        if (order_id != orders[i][0][0][0]) {
            let order = document.createElement("div");
            order.classList.add("order");

            let orderHeader = document.createElement("div");
            orderHeader.classList.add("order_header");
            let orderId = document.createElement("div");
            orderId.classList.add("order_id");
            orderId.innerHTML = `Commande n°${orders[i][0][0][0]}`;
            orderHeader.appendChild(orderId);
            let orderDelivery = document.createElement("div");
            orderDelivery.classList.add("order_delivery");
            orderDelivery.innerHTML = orders[i][0][0][1];
            orderHeader.appendChild(orderDelivery);
            let orderTotal = document.createElement("div");
            orderTotal.classList.add("order_total");
            orderTotal.innerHTML = `${orders[i][0][0][2]}€`;
            orderHeader.appendChild(orderTotal);
            let orderDate = document.createElement("div");
            orderDate.classList.add("order_date");
            orderDate.innerHTML = orders[i][0][0][3];
            orderHeader.appendChild(orderDate);
            order.appendChild(orderHeader);

            let orderProducts = document.createElement("div");
            orderProducts.classList.add("order_products");
            for (let j = 0; j < orders[i][1].length; j++) {
                let product = document.createElement("div");
                product.classList.add("product");

                let productImg = document.createElement("div");
                productImg.classList.add("product_img");
                let img = document.createElement("img");
                img.src = `../assets/img/website_emulator/${orders[i][1][j][1]}.webp`;
                productImg.appendChild(img);
                product.appendChild(productImg);

                let productDesc = document.createElement("div");
                productDesc.classList.add("product_desc");
                let productName = document.createElement("div");
                productName.classList.add("product_name");
                productName.innerHTML = orders[i][1][j][2];
                productDesc.appendChild(productName);
                let productPrice = document.createElement("div");
                productPrice.classList.add("product_price");
                productPrice.innerHTML = `${orders[i][1][j][3]}€`;
                productDesc.appendChild(productPrice);
                let productQuantity = document.createElement("div");
                productQuantity.classList.add("product_quantity");
                productQuantity.innerHTML = orders[i][1][j][1];
                productDesc.appendChild(productQuantity);
                product.appendChild(productDesc);

                orderProducts.appendChild(product);
            }
            order.appendChild(orderProducts);
            ordersList.appendChild(order);
        }
        order_id = orders[i][0][0][0];
    }
}