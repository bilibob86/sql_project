const cart = document.getElementsByClassName('cart')[0];

function addToCart() {
    const qt = cart.dataset.qt;
    if (qt == 0) {
        nextPart();
    }
    cart.dataset.qt = parseInt(qt) + 1;
    cart.innerHTML = "<p>Vous avez " + cart.dataset.qt + " article(s) dans votre panier</p>";
}