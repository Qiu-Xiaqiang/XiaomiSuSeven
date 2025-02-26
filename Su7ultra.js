// Variabile globale per l'immagine dell'auto
let selectedCarImage = 'ultra3.jpg'; // Immagine predefinita per Su7Ultra

// Funzione per cambiare l'immagine dell'auto (se necessario, ma nel caso dell'Ultra, non cambia)
function changeCarImage() {
    const carImages = document.querySelectorAll('.car-image');

    // Imposta sempre la stessa immagine per l'auto Su7Ultra
    carImages.forEach((image) => {
        image.src = `Immagini/${selectedCarImage}`;
    });
}

// Funzione per aggiungere al carrello
function addToCart() {
    // Oggetti del carrello già esistenti in localStorage (se ce ne sono)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Dati del modello auto aggiunto al carrello
    const car = {
        name: "Xiaomi Su7-Ultra",
        price: 105000, // Aggiungi il prezzo corretto se necessario
        image: `Immagini/${selectedCarImage}`, // Usa sempre l'immagine ultra3.jpg
        color: 'Giallo'  // Non è necessario un colore, quindi mettiamo "default"
    };

    // Aggiungi l'auto al carrello
    cart.push(car);

    // Salva il carrello aggiornato nel localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Opzionale: Aggiorna il conteggio degli articoli nel carrello nella navbar
    updateCartCount();
}

// Funzione per aggiornare il conteggio degli articoli nel carrello
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.getElementById("cart-count");
    cartCount.innerText = cart.length;
}

// (Opzionale) Se vuoi aggiungere un'azione al caricamento della pagina per visualizzare l'immagine giusta
document.addEventListener("DOMContentLoaded", function() {
    changeCarImage(); // Imposta l'immagine predefinita quando la pagina è caricata
});
