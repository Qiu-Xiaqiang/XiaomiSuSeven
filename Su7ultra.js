// Immagine predefinita per Su7Ultra
let selectedCarImage = 'ultra3.jpg';

// Funzione per aggiornare l'immagine della macchina
function changeCarImage() {
    const carImages = document.querySelectorAll('.car-image');
    carImages.forEach(image => {
        image.src = `Immagini/${selectedCarImage}`;
    });
}

// Funzione per aggiornare il conteggio degli articoli nel carrello
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}

// Funzione per mostrare il messaggio di conferma (stile verde, uguale a Su7Pro.js)
function showSuccessMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('success-message');
    messageDiv.innerText = 'Macchina aggiunta al carrello con successo!';
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Funzione per aggiungere l'auto al carrello e mostrare il messaggio di conferma
function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const car = {
        name: "Xiaomi Su7-Ultra",
        price: 105000,
        image: `Immagini/${selectedCarImage}`,
        color: "Giallo"
    };
    cart.push(car);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showSuccessMessage(); // Ora viene usata la funzione personalizzata
}

// Al caricamento del DOM
document.addEventListener("DOMContentLoaded", function() {
    // Imposta l'immagine e aggiorna il conteggio
    changeCarImage();
    updateCartCount();

    // Aggiungi il listener per il pulsante "Aggiungi al Carrello"
    const addToCartButton = document.getElementById("add-to-cart");
    if (addToCartButton) {
        addToCartButton.addEventListener("click", addToCart);
    }

    // Carica i contenuti dal file JSON e popola il DOM
    fetch('Su7ultra.json')
        .then(response => response.json())
        .then(data => {
            // Imposta il titolo della pagina
            document.title = data.title;
            
            // Navbar
            const navbarBrand = document.querySelector('.navbar-brand');
            if (navbarBrand) {
                navbarBrand.innerText = data.navbarTitle;
            }
            const navLinks = document.querySelectorAll('.nav-link');
            if (navLinks.length >= 4) {
                navLinks[0].innerText = data.navbarHome;
                navLinks[1].innerText = data.navbarCart;
                navLinks[2].innerText = data.navbarContacts;
                navLinks[3].innerText = data.navbarLogin;
            }
            const cartCountElement = document.getElementById("cart-count");
            if (cartCountElement) {
                cartCountElement.innerText = data.cartCount;
            }
            
            // Sezione Immagini
            const imageSectionH2 = document.querySelector('.image-section h2');
            if (imageSectionH2) {
                imageSectionH2.innerText = data.carTitle;
            }
            
            // Controlli del Carousel (aggiorna il testo dei pulsanti nascosti)
            const carouselControls = document.querySelectorAll('.carousel-control-prev .visually-hidden, .carousel-control-next .visually-hidden');
            if (carouselControls.length === 2) {
                carouselControls[0].innerText = data.carouselControls.prev;
                carouselControls[1].innerText = data.carouselControls.next;
            }
            
            // Sezione Descrizione
            const descriptionH4 = document.querySelector('.description-section h4');
            if (descriptionH4) {
                descriptionH4.innerText = data.carTitle;
            }
            const leadDescription = document.querySelector('.description-section .lead');
            if (leadDescription) {
                leadDescription.innerText = data.description;
            }
            const specsSpans = document.querySelectorAll('.description-section ul.list-unstyled span');
            if (specsSpans.length === 3) {
                specsSpans[0].innerText = data.specs.autonomy;
                specsSpans[1].innerText = data.specs.power;
                specsSpans[2].innerText = data.specs.design;
            }
            
            // Prezzo e pulsante "Aggiungi al Carrello"
            const priceParagraph = document.querySelector('.description-section .text-white.mt-4');
            if (priceParagraph) {
                priceParagraph.innerText = data.price;
            }
            if (addToCartButton) {
                addToCartButton.innerText = data.addToCart;
            }
            
            // Recensione
            const reviewTitle = document.querySelector('.card .card-title');
            if (reviewTitle) {
                reviewTitle.innerText = data.review.name;
            }
            const reviewComment = document.querySelector('.card .card-text');
            if (reviewComment) {
                reviewComment.innerText = data.review.comment;
            }
        })
        .catch(error => console.error("Errore nel caricamento del JSON:", error));
});
