// Variabile globale per il colore selezionato
let selectedColor = 'white'; // Colore di default

// Funzione per cambiare il colore della macchina nelle immagini del carosello
function changeCarColor(color) {
    const carImages = document.querySelectorAll('.car-image');
    const colorBoxes = document.querySelectorAll('.color-box');
    
    // Cambia la sorgente delle immagini per il colore selezionato
    carImages.forEach((image, index) => {
        switch(color) {
            case 'white':
                image.src = `Immagini/white${index+1}.jpg`; // white1.jpg, white2.jpg, etc.
                break;
            case 'celeste':
                image.src = `Immagini/celeste${index + 1}.jpg`; // celeste1.jpg, celeste2.jpg, etc.
                break;
            case 'green':
                image.src = `Immagini/green${index + 1}.jpg`; // green1.jpg, green2.jpg, etc.
                break;
            default:
                image.src = `Immagini/white${index+1}.jpg`; // Default bianco (se non è stato selezionato un colore)
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
        case 'white':
            return '#ffffff';
        case 'celeste':
            return '#00bcd4';
        case 'green':
            return '#4caf50';
        default:
            return '#ffffff'; // Default bianco
    }
}
function showSuccessMessage() {
    // Crea il div per il messaggio
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('success-message');
    messageDiv.innerText = 'Macchina aggiunta al carrello con successo!';

    // Aggiungi il messaggio al corpo della pagina
    document.body.appendChild(messageDiv);

    // Rimuovi il messaggio dopo 3 secondi
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Funzione per aggiungere l'auto al carrello
function addToCart() {
    // Oggetti del carrello già esistenti in localStorage (se ce ne sono)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Dati del modello auto aggiunto al carrello
    const car = {
        name: "Xiaomi Su7-Base",
        price: 28000,
        image: getCarImageForColor(selectedColor), // Usa la funzione per ottenere l'immagine corretta
        color: selectedColor  // Aggiungi il colore selezionato
    };

    // Aggiungi l'auto al carrello
    cart.push(car);

    // Salva il carrello aggiornato nel localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Mostra il messaggio di conferma
    showSuccessMessage();

    // Opzionale: Aggiorna il conteggio degli articoli nel carrello nella navbar
    updateCartCount();
}

// Funzione per ottenere l'immagine corretta in base al colore selezionato
function getCarImageForColor(color) {
    switch(color) {
        case 'white':
            return 'Immagini/white.jpg'; // Immagine per il colore bianco
        case 'celeste':
            return 'Immagini/celeste5.jpg'; // Immagine per il colore celeste
        case 'green':
            return 'Immagini/green5.jpg'; // Immagine per il colore verde
        default:
            return 'Immagini/white.jpg'; // Default bianco
    }
}

// Funzione per aggiornare il conteggio nel carrello
function updateCartCount() {
    let cartCount = document.getElementById("cart-count");  // Supponiamo che tu abbia un elemento con id "cart-count"
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.length;  // Aggiorna il numero degli articoli nel carrello
}

// Funzione per caricare il JSON e aggiornare il contenuto
fetch('Su7base.json')
  .then(response => response.json())
  .then(data => {
    // Gestione titolo pagina
    document.getElementById('page-title').innerText = data.page_title;

    // Gestione Navbar
    const navbar = data.navbar;
    document.getElementById('navbar-logo').src = navbar.logo;
    document.getElementById('navbar-brand').innerText = navbar.brand_name;

    const navbarItems = document.getElementById('navbar-items');
    navbar.items.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('nav-item');
      const a = document.createElement('a');
      a.classList.add('nav-link');
      a.href = item.link;
      a.innerText = item.text;
      li.appendChild(a);
      navbarItems.appendChild(li);
    });

    // Gestione Sezione Immagini
    const imageSection = data.image_section;
    document.getElementById('image-section-title').innerText = imageSection.title;
    const carouselInner = document.getElementById('carousel-inner');
    imageSection.images.forEach((image, index) => {
      const div = document.createElement('div');
      div.classList.add('carousel-item');
      if (index === 0) div.classList.add('active');
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.classList.add('d-block', 'w-100', 'car-image');
      div.appendChild(img);
      carouselInner.appendChild(div);
    });

    // Gestione Sezione Descrizione
    const descriptionSection = data.description_section;
    document.getElementById('description-title').innerText = descriptionSection.title;
    document.getElementById('description-text').innerText = descriptionSection.text;

    const featuresList = document.getElementById('car-features');
    descriptionSection.features.forEach(feature => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="${feature.icon}"></i> ${feature.text}`;
      featuresList.appendChild(li);
    });

    document.getElementById('color-selection-title').innerText = descriptionSection.color_selection_title;
    const colorSelection = document.getElementById('color-selection');
    descriptionSection.colors.forEach(color => {
      const div = document.createElement('div');
      div.classList.add('color-box');
      div.style.backgroundColor = color.hex;
      div.onclick = () => changeCarColor(color.color);
      colorSelection.appendChild(div);
    });

    document.getElementById('price').innerHTML = descriptionSection.price;
    document.getElementById('add-to-cart').innerText = descriptionSection.add_to_cart_text;

    // Gestione Recensioni
    const reviewsSection = data.reviews_section;
    const reviewsContainer = document.getElementById('reviews-section');
    reviewsSection.reviews.forEach(review => {
      const div = document.createElement('div');
      div.classList.add('card', 'text-white', 'bg-dark', 'mb-4');
      const body = document.createElement('div');
      body.classList.add('card-body');
      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.innerText = review.name;
      const text = document.createElement('p');
      text.classList.add('card-text');
      text.innerText = review.text;
      const stars = document.createElement('div');
      for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.classList.add('fas', i < Math.floor(review.rating) ? 'fa-star' : 'fa-star-half-alt');
        stars.appendChild(star);
      }
      body.appendChild(title);
      body.appendChild(text);
      body.appendChild(stars);
      div.appendChild(body);
      reviewsContainer.appendChild(div);
    });

    // Aggiungi il listener per il bottone "Aggiungi al carrello"
    document.getElementById('add-to-cart').addEventListener('click', addToCart);

    // Aggiorna il conteggio carrello alla prima visita
    updateCartCount();
  })
  .catch(error => console.error('Errore nel caricamento del JSON:', error));
// Funzione per mostrare il messaggio di conferma
