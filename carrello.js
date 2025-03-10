// Carica i dati dal file JSON
async function loadCartData() {
    try {
        const response = await fetch('carrello.json');
        const data = await response.json();
        
        // Popola la navbar e la sezione carrello
        populateNavbar(data.navbar);
        populateCart(data.cart);
        // Mostra i prodotti nel carrello
        displayCart();

        // Gestisci i bottoni
        document.getElementById('apply-coupon-button').addEventListener('click', applyCoupon);
        document.getElementById('clear-cart-button').addEventListener('click', clearCart);
        document.getElementById('checkout-button').addEventListener('click', checkout);

    } catch (error) {
        console.error('Errore nel caricamento del JSON:', error);
    }
}

// Popola la navbar usando una struttura in cui icona e testo sono nello stesso elemento
function populateNavbar(navbar) {
    document.getElementById('logo').src = navbar.logo;
    document.getElementById('navbar-brand').textContent = navbar.home;
    
    // Per ogni voce, aggiorniamo il rispettivo <img> e <a>
    document.getElementById('home-link').textContent = navbar.home;
    document.getElementById('home-icon').src = navbar.icons.home;
    
    document.getElementById('cart-link').textContent = navbar.cart;
    document.getElementById('cart-icon').src = navbar.icons.cart;
    
    document.getElementById('contact-link').textContent = navbar.contact;
    document.getElementById('contact-icon').src = navbar.icons.contact;
    
    document.getElementById('login-link').textContent = navbar.login;
    document.getElementById('login-icon').src = navbar.icons.user;
}

// Popola la sezione carrello (testi, pulsanti, ecc.)
function populateCart(cart) {
    document.getElementById('cart-title').textContent = cart.title;
    document.getElementById('coupon-label').textContent = cart.couponLabel;
    document.getElementById('coupon').placeholder = cart.couponPlaceholder;
    document.getElementById('apply-coupon-button').textContent = cart.applyCouponButton;
    document.getElementById('clear-cart-button').textContent = cart.clearCartButton;
    document.getElementById('total-label').textContent = cart.totalLabel;
    document.getElementById('checkout-button').textContent = cart.checkoutButton;
}

// Visualizza gli articoli presenti nel carrello
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById('cart-items');
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Il tuo carrello è vuoto.</p>";
        document.getElementById('total-label').textContent = "Totale: €0.00";
        document.getElementById('final-price').textContent = "";
        return;
    }

    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('col-md-12', 'col-lg-6', 'mb-4');
        cartItem.innerHTML = `
            <div class="card">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Colore: ${item.color}</p>
                            <p class="card-price">€${Number(item.price).toFixed(2)}</p>
                            <button class="btn btn-danger" onclick="removeItemFromCart(${index})">Rimuovi</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartContainer.appendChild(cartItem);
        totalPrice += Number(item.price);
    });
    document.getElementById('total-label').textContent = `Totale: €${totalPrice.toFixed(2)}`;
    document.getElementById('final-price').textContent = "";
}

// Applica il coupon se valido
function applyCoupon() {
    const coupon = document.getElementById('coupon').value;
    const discount = 0.05;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;
    cart.forEach(item => totalPrice += Number(item.price));
    if (coupon === "XIAOMISU7") {
        const discountAmount = totalPrice * discount;
        const finalPrice = totalPrice - discountAmount;
        document.getElementById('final-price').textContent = `Prezzo finale: €${finalPrice.toFixed(2)} (Sconto: €${discountAmount.toFixed(2)})`;
        document.getElementById('total-label').textContent = `Totale: €${finalPrice.toFixed(2)}`;
        alert("Coupon applicato! Sconto del 5%.");
    } else {
        alert("Coupon non valido.");
    }
}

// Rimuove un articolo dal carrello
function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Svuota completamente il carrello
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

// Procedi al checkout
function checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Il carrello è vuoto! Aggiungi prodotti prima di procedere al pagamento.");
        return;
    }
    const totalPrice = document.getElementById('total-label').textContent;
    localStorage.setItem("totalPrice", totalPrice);
    window.location.href = "checkout.html";
}

// Avvia il caricamento dei dati al termine del caricamento della pagina
window.onload = loadCartData;
