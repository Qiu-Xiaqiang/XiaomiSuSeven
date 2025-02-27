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

    showSuccessMessage()

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
window.productPrice = 0; // verrà impostato dal JSON

document.addEventListener("DOMContentLoaded", () => {
  fetch("Su7Pro.json")
    .then(response => response.json())
    .then(data => {
      // Imposta titolo e navbar
      document.getElementById("page-title").innerText = data.pageTitle;
      document.title = data.pageTitle;
      document.getElementById("navbar-brand").innerText = data.navbar.brand;
      document.getElementById("logo-img").src = data.navbar.logo;
      const navbarLinks = document.getElementById("navbar-links");
      navbarLinks.innerHTML = "";
      data.navbar.links.forEach(link => {
        const li = document.createElement("li");
        li.classList.add("nav-item");
        // Struttura per avere icona a sinistra del testo
        li.innerHTML = `
          <div class="d-flex align-items-center">
            <img src="${link.img}" style="height:40px; margin-right:10px;">
            <a class="nav-link" href="${link.href}">${link.text}</a>
          </div>
        `;
        navbarLinks.appendChild(li);
      });

      // Sezione modello
      document.getElementById("model-title").innerText = data.model.title;
      document.getElementById("desc-title").innerText = data.model.title;
      document.getElementById("desc-text").innerText = data.model.description;
      const specsList = document.getElementById("specs-list");
      specsList.innerHTML = "";
      data.model.specs.forEach(spec => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="${spec.icon}"></i> ${spec.text}`;
        specsList.appendChild(li);
      });
      document.getElementById("price-text").innerText = data.model.price;
      document.getElementById("add-to-cart-btn").innerText = data.model.button;
      document.getElementById("color-selection-text").innerText = data.model.colorSelectionText;
      document.getElementById("prev-text").innerText = data.carouselControls.prev;
      document.getElementById("next-text").innerText = data.carouselControls.next;
      // Imposta colori delle caselle
      document.getElementById("color-black").style.backgroundColor = data.colorBoxes.black;
      document.getElementById("color-orange").style.backgroundColor = data.colorBoxes.orange;
      // Popola il carosello
      populateCarousel(data.model.carouselImages.black);
      // Imposta il prezzo numerico globale
      window.productPrice = data.model.priceValue;
      // Carica recensioni
      document.getElementById("reviews-title").innerText = data.reviews.title;
      const reviewsContainer = document.getElementById("reviews-container");
      reviewsContainer.innerHTML = "";
      data.reviews.items.forEach(review => {
        const col = document.createElement("div");
        col.classList.add("col-md-4");
        col.innerHTML = `
          <div class="card text-white bg-dark mb-4">
            <div class="card-body">
              <h5 class="card-title">${review.name}</h5>
              <p class="card-text">"${review.text}"</p>
              ${generateStars(review.rating)}
            </div>
          </div>
        `;
        reviewsContainer.appendChild(col);
      });
    })
    .catch(error => console.error("Errore nel caricamento del JSON:", error));
});

// Popola il carosello con le immagini in base al colore selezionato
function populateCarousel(imagesArray) {
  const carouselInner = document.getElementById("carousel-inner");
  carouselInner.innerHTML = "";
  imagesArray.forEach((imgSrc, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("carousel-item");
    if (index === 0) itemDiv.classList.add("active");
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = "Xiaomi Su7 Pro";
    img.classList.add("d-block", "w-100", "car-image");
    itemDiv.appendChild(img);
    carouselInner.appendChild(itemDiv);
  });
}

// Funzione per cambiare il colore (aggiorna il carosello)
function changeCarColor(color) {
  selectedColor = color;
  fetch("Su7Pro.json")
    .then(response => response.json())
    .then(data => {
      const imagesArray = data.model.carouselImages[color];
      if (imagesArray) {
        populateCarousel(imagesArray);
      }
      // Evidenzia la casella selezionata
      const colorBoxes = document.querySelectorAll(".color-box");
      colorBoxes.forEach(box => box.style.border = "none");
      const selectedBox = Array.from(colorBoxes).find(box => box.style.backgroundColor === data.colorBoxes[color]);
      if (selectedBox) selectedBox.style.border = "3px solid black";
    })
    .catch(error => console.error("Errore nel caricamento del JSON:", error));
}

// Genera le stelle per il rating
function generateStars(rating) {
  let starsHTML = "";
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<i class="fas fa-star"></i> `;
  }
  if (halfStar) starsHTML += `<i class="fas fa-star-half-alt"></i> `;
  const emptyStars = 5 - (halfStar ? fullStars + 1 : fullStars);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += `<i class="far fa-star"></i> `;
  }
  return starsHTML;
}

// Funzione per aggiungere al carrello (usa il prezzo numerico salvato in window.productPrice)
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

// Aggiorna il conteggio del carrello (mostrato nella navbar)
function updateCartCount() {
  // Cerca il link del carrello nella navbar e aggiorna il testo
  const cartLink = document.querySelector("#navbar-links a[href='carrello.html']");
  if (cartLink) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartLink.innerText = "Carrello: " + cart.length;
  }
}
