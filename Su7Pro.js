let selectedColor = 'black';  // Imposta il colore di default (nero)

// Funzione per cambiare il colore della macchina nelle immagini del carosello
function changeCarColor(color) {
    selectedColor = color;  // Memorizza il colore selezionato
    const carImages = document.querySelectorAll('.car-image');
    const colorBoxes = document.querySelectorAll('.color-box');

    // Cambia la sorgente delle immagini per il colore selezionato
    carImages.forEach((image, index) => {
        switch(color) {
            case 'black':
                image.src = `Immagini/black${index +1}.jpg`; // black1.jpg, black2.jpg, etc.
                break;
            case 'orange':
                image.src = `Immagini/arancione${index + 1}.jpg`; // arancione1.jpg, arancione2.jpg, etc.
                break;
            default:
                image.src = `Immagini/black${index+1}.jpg`; // Default nero (se non è stato selezionato un colore)
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
}

// Funzione per ottenere il codice esadecimale del colore selezionato
function getColorHex(color) {
    switch(color) {
        case 'black':
            return '#000000'; // Nero
        case 'orange':
            return '#FF5722'; // Arancione
        default:
            return '#000000'; // Default nero
    }
}

// Funzione per aggiungere al carrello
function addToCart() {
    // Oggetti del carrello già esistenti in localStorage (se ce ne sono)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Dati del modello auto aggiunto al carrello
    const car = {
        name: "Xiaomi Su7-Pro",
        price: 32000, // Puoi sostituire con il prezzo effettivo
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
        case 'black':
            return 'Immagini/black.jpg'; // Immagine per il colore nero
        case 'orange':
            return 'Immagini/arancione1.jpg'; // Immagine per il colore arancione
        default:
            return 'Immagini/black.jpg'; // Default nero
    }
}

// Funzione per aggiornare il conteggio nel carrello
function updateCartCount() {
    let cartCount = document.getElementById("cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.length;
}
