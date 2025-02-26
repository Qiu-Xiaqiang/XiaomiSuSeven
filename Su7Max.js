// Variabile globale per il colore selezionato
let selectedColor = 'pink'; // Colore di default

// Funzione per cambiare il colore della macchina nelle immagini del carosello
function changeCarColor(color) {
    const carImages = document.querySelectorAll('.car-image');
    const colorBoxes = document.querySelectorAll('.color-box');
    
    // Cambia la sorgente delle immagini per il colore selezionato
    carImages.forEach((image, index) => {
        switch(color) {
            case 'pink':
                image.src = `Immagini/pink${index + 1}.jpg`; // pink1.jpg, pink2.jpg, etc.
                break;
            case 'purple':
                image.src = `Immagini/viola${index + 1}.jpg`; // viola1.jpg, viola2.jpg, etc.
                break;
            default:
                image.src = `Immagini/pink${index + 1}.jpg`; // Default rosa (se non è stato selezionato un colore)
        }
    });

    // Evidenzia la casella di colore selezionata
    colorBoxes.forEach(box => {
        box.style.border = 'none';
    });
    const selectedBox = Array.from(colorBoxes).find(box => box.style.backgroundColor === getColorHex(color));
    if (selectedBox) {
        selectedBox.style.border = '3px solid black'; // Evidenzia la casella selezionata
    }

    // Salva il colore selezionato nella variabile globale
    selectedColor = color;
}

// Funzione per ottenere il codice esadecimale del colore selezionato
function getColorHex(color) {
    switch(color) {
        case 'pink':
            return '#e91e63'; // Rosa
        case 'purple':
            return '#9c27b0'; // Viola
        default:
            return '#e91e63'; // Default rosa
    }
}

// Funzione per aggiungere al carrello
function addToCart() {
    // Oggetti del carrello già esistenti in localStorage (se ce ne sono)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Dati del modello auto aggiunto al carrello
    const car = {
        name: "Xiaomi Su7-Max",
        price: 40000,
        image: getCarImageForColor(selectedColor), // Usa la funzione per ottenere l'immagine corretta
        color: selectedColor  // Aggiungi il colore selezionato
    };

    // Aggiungi l'auto al carrello
    cart.push(car);

    // Salva il carrello aggiornato nel localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Opzionale: Aggiorna il conteggio degli articoli nel carrello nella navbar
    updateCartCount();
}

// Funzione per ottenere l'immagine corretta in base al colore selezionato
function getCarImageForColor(color) {
    switch(color) {
        case 'pink':
            return 'Immagini/pink.jpg'; // Immagine per il colore rosa
        case 'purple':
            return 'Immagini/viola5.jpg'; // Immagine per il colore viola
        default:
            return 'Immagini/pink.jpg'; // Default rosa
    }
}

// Funzione per aggiornare il conteggio degli articoli nel carrello
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.getElementById("cart-count");
    cartCount.innerText = cart.length;
}
