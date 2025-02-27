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
// Variabile globale per il prezzo numerico (impostato dal JSON)
window.productPrice = 0;
// Variabile globale per memorizzare i dati JSON (per riferimento successivo)
let jsonData = null;

document.addEventListener("DOMContentLoaded", () => {
  fetch("Su7Max.json")
    .then(response => response.json())
    .then(data => {
      jsonData = data; // Salva i dati per eventuali riferimenti futuri
      
      // Imposta il titolo della pagina
      document.getElementById("page-title").innerText = data.pageTitle;
      document.title = data.pageTitle;
      
      // --- Navbar ---
      const navbarLinks = document.getElementById("navbar-links");
      navbarLinks.innerHTML = "";
      data.navbar.links.forEach(link => {
        // Crea un <li> con struttura Flex per avere l'icona a sinistra del testo
        const li = document.createElement("li");
        li.classList.add("nav-item", "d-flex", "align-items-center");
        li.innerHTML = `<img src="${link.img}" style="height:40px; margin-right:10px;"><a class="nav-link" href="${link.href}">${link.text}</a>`;
        navbarLinks.appendChild(li);
      });
      document.getElementById("navbar-brand").innerText = data.navbar.brand;
      document.getElementById("logo-img").src = data.navbar.logo;
      
      // --- Sezione Modello ---
      document.getElementById("model-title").innerText = data.model.title;
      document.getElementById("desc-title").innerText = data.model.title;
      document.getElementById("desc-text").innerText = data.model.description;
      
      // Specifiche
      const specsList = document.getElementById("specs-list");
      specsList.innerHTML = "";
      data.model.specs.forEach(spec => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="${spec.icon}"></i> ${spec.text}`;
        specsList.appendChild(li);
      });
      
      // Prezzo e pulsante "Aggiungi al Carrello"
      document.getElementById("price-text").innerText = data.model.price;
      document.getElementById("add-to-cart-btn").innerText = data.model.button;
      document.getElementById("color-selection-text").innerText = data.model.colorSelectionText;
      window.productPrice = data.model.priceValue;
      
      // --- Carosello ---
      populateCarousel(data.model.carouselImages.pink);
      // Imposta i testi dei controlli
      document.getElementById("prev-text").innerText = data.carouselControls.prev;
      document.getElementById("next-text").innerText = data.carouselControls.next;
      
      // Imposta i colori delle caselle di selezione
      document.getElementById("color-pink").style.backgroundColor = data.colorBoxes.pink;
      document.getElementById("color-purple").style.backgroundColor = data.colorBoxes.purple;
      
      // --- Recensioni ---
      document.getElementById("reviews-title").innerText = data.reviews.title;
      const reviewsContainer = document.getElementById("reviews-container");
      reviewsContainer.innerHTML = "";
      data.reviews.items.forEach(review => {
        const col = document.createElement("div");
        col.classList.add("col-md-4");
        const card = document.createElement("div");
        card.classList.add("card", "text-white", "bg-dark", "mb-4");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerText = review.name;
        const p = document.createElement("p");
        p.classList.add("card-text");
        p.innerText = `"${review.text}"`;
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.innerHTML += generateStars(review.rating);
        card.appendChild(cardBody);
        col.appendChild(card);
        reviewsContainer.appendChild(col);
      });
      
      // Assegna il listener per il pulsante "Aggiungi al Carrello"
      document.getElementById("add-to-cart-btn").addEventListener("click", addToCart);
      
      // Aggiorna il conteggio del carrello
      updateCartCount();
    })
    .catch(error => console.error("Errore nel caricamento del JSON:", error));
});

// Funzione per popolare il carosello
function populateCarousel(imagesArray) {
  const carouselInner = document.getElementById("carousel-inner");
  carouselInner.innerHTML = "";
  imagesArray.forEach((imgSrc, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("carousel-item");
    if (index === 0) itemDiv.classList.add("active");
    const img = document.createElement("img");
    img.src = imgSrc;
    // Usa l'attributo alt definito in JSON oppure un valore di default
    img.alt = jsonData && jsonData.model.carouselAlt ? jsonData.model.carouselAlt : "Xiaomi Su7 Max";
    img.classList.add("d-block", "w-100", "car-image");
    itemDiv.appendChild(img);
    carouselInner.appendChild(itemDiv);
  });
}

// Funzione per cambiare il colore del carosello e aggiornare l'evidenziazione
function changeCarColor(color) {
  selectedColor = color;
  // Ricarica il JSON per ottenere le immagini corrispondenti (oppure usa jsonData se non cambia dinamicamente)
  if (jsonData && jsonData.model.carouselImages[color]) {
    populateCarousel(jsonData.model.carouselImages[color]);
  }
  // Evidenzia la casella del colore selezionato
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach(box => { box.style.border = "none"; });
  const selectedBox = Array.from(colorBoxes).find(box => box.style.backgroundColor.toLowerCase() === getColorHex(color).toLowerCase());
  if (selectedBox) { selectedBox.style.border = "3px solid black"; }
}

// Funzione per ottenere il codice esadecimale di un colore
function getColorHex(color) {
  switch(color) {
    case "pink": return "#e91e63";
    case "purple": return "#9c27b0";
    default: return "#e91e63";
  }
}

// Funzione per generare l'HTML delle stelle per il rating
function generateStars(rating) {
  let starsHTML = "";
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<i class="fas fa-star"></i> `;
  }
  if (halfStar) {
    starsHTML += `<i class="fas fa-star-half-alt"></i> `;
  }
  const totalStars = halfStar ? fullStars + 1 : fullStars;
  const emptyStars = 5 - totalStars;
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += `<i class="far fa-star"></i> `;
  }
  return starsHTML;
}

// Funzione per aggiungere il prodotto al carrello
function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const car = {
    name: document.getElementById("model-title").innerText,
    price: window.productPrice,
    color: selectedColor,
    image: document.querySelector("#carousel-inner .carousel-item.active img").src
  };
  cart.push(car);
  localStorage.setItem("cart", JSON.stringify(cart));
  showSuccessMessage();
  updateCartCount();
}

// Funzione per mostrare un messaggio di conferma
function showSuccessMessage() {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("success-message");
  msgDiv.innerText = "Macchina aggiunta al carrello con successo!";
  document.body.appendChild(msgDiv);
  setTimeout(() => { msgDiv.remove(); }, 3000);
}

// Funzione per aggiornare il conteggio degli articoli nel carrello
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = cart.length;
}
