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

window.productPrice = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch("Su7Base.json")
    .then(response => response.json())
    .then(data => {
      // Imposta titolo della pagina
      document.getElementById("page-title").innerText = data.title;
      document.title = data.title;
      
      // --- Navbar ---      
      const navbarItemsContainer = document.getElementById("navbar-items");
      navbarItemsContainer.innerHTML = "";
      data.navbar.items.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("nav-item", "d-flex", "align-items-center");
        li.innerHTML = `<img src="${item.img}" style="height:40px; margin-right:10px;"><a class="nav-link" href="${item.link}">${item.text}</a>`;
        navbarItemsContainer.appendChild(li);
      });
      document.getElementById("navbar-logo").src = data.navbar.logo;
      document.getElementById("navbar-brand").innerText = data.navbar.brand;
      
      // --- Carosello ---      
      document.getElementById("carousel-title").innerText = data.title;
      let carouselInnerHTML = "";
      data.carousel.forEach((imgObj, index) => {
        carouselInnerHTML += `<div class="carousel-item ${index === 0 ? "active" : ""}">\n` +
                             `  <img src="${imgObj.src}" alt="${imgObj.alt}" class="d-block w-100 car-image">\n` +
                             `</div>`;
      });
      document.getElementById("carousel-inner").innerHTML = carouselInnerHTML;
      document.getElementById("prev-text").innerText = "Precedente";
      document.getElementById("next-text").innerText = "Successivo";
      
      // --- Descrizione ---      
      document.getElementById("description-title").innerText = data.description.title;
      document.getElementById("description-text").innerText = data.description.text;
      
      let featuresHTML = "";
      data.description.features.forEach(feature => {
        featuresHTML += `<li><i class="fas fa-check"></i> ${feature}</li>`;
      });
      document.getElementById("features-list").innerHTML = featuresHTML;
      
      document.getElementById("color-selection-title").innerText = "Scegli il colore del tuo modello:";
      let colorOptionsHTML = "";
      for (const [color, hex] of Object.entries(data.colors)) {
        colorOptionsHTML += `<div class="color-box" style="background-color: ${hex};" onclick="changeCarColor('${color}')"></div>`;
      }
      document.getElementById("color-options").innerHTML = colorOptionsHTML;
      
      document.getElementById("price").innerText = data.description.price;
      document.getElementById("add-to-cart").innerText = data.description.addToCart;
      // Imposta il prezzo numerico globale
      window.productPrice = data.description.priceValue;
      
      // --- Recensioni ---      
      let reviewsHTML = `<h3 class="text-white mb-4">Recensioni dei Clienti</h3><div class="row">`;
      data.reviews.forEach(review => {
        let starsHTML = "";
        const fullStars = Math.floor(review.stars);
        const halfStar = review.stars % 1 !== 0;
        for (let i = 0; i < fullStars; i++) starsHTML += "<i class='fas fa-star'></i>";
        if (halfStar) starsHTML += "<i class='fas fa-star-half-alt'></i>";
        const emptyStars = 5 - (halfStar ? fullStars + 1 : fullStars);
        for (let i = 0; i < emptyStars; i++) starsHTML += "<i class='far fa-star'></i>";
        
        reviewsHTML += `<div class="col-md-4">\n` +
                       `  <div class="card text-white bg-dark mb-4">\n` +
                       `    <div class="card-body">\n` +
                       `      <h5 class="card-title">${review.name}</h5>\n` +
                       `      <p class="card-text">"${review.text}"</p>\n` +
                       `      ${starsHTML}\n` +
                       `    </div>\n` +
                       `  </div>\n` +
                       `</div>`;
      });
      reviewsHTML += "</div>";
      document.getElementById("reviews-section").innerHTML = reviewsHTML;
      
      // --- Event Listener per Aggiungi al Carrello ---      
      document.getElementById("add-to-cart").addEventListener("click", addToCart);
      
      // Aggiorna il conteggio del carrello
      updateCartCount();
    })
    .catch(error => console.error("Errore nel caricamento del JSON:", error));
});

// Funzione per cambiare il colore (e aggiornare le immagini del carosello)
function changeCarColor(color) {
  selectedColor = color;
  const carImages = document.querySelectorAll(".car-image");
  carImages.forEach((img, index) => {
    switch(color) {
      case "white":
        img.src = `Immagini/white${index + 1}.jpg`;
        break;
      case "celeste":
        img.src = `Immagini/celeste${index + 1}.jpg`;
        break;
      case "green":
        img.src = `Immagini/green${index + 1}.jpg`;
        break;
      default:
        img.src = `Immagini/white${index + 1}.jpg`;
    }
  });
  
  // Evidenzia la casella colore selezionata
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach(box => { box.style.border = "none"; });
  const selectedBox = Array.from(colorBoxes).find(box => box.style.backgroundColor.toLowerCase() === getColorHex(color).toLowerCase());
  if (selectedBox) { selectedBox.style.border = "3px solid black"; }
}

// Funzione per ottenere il codice esadecimale per un colore
function getColorHex(color) {
  switch(color) {
    case "white": return "#ffffff";
    case "celeste": return "#00bcd4";
    case "green": return "#4caf50";
    default: return "#ffffff";
  }
}

// Funzione per aggiungere il prodotto al carrello
function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const car = {
    name: document.getElementById("description-title").innerText,
    price: window.productPrice,
    color: selectedColor,
    image: document.querySelector("#carousel-inner .carousel-item.active img").src
  };
  cart.push(car);
  localStorage.setItem("cart", JSON.stringify(cart));
  showSuccessMessage();
  updateCartCount();
}

// Mostra un messaggio di conferma
function showSuccessMessage() {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("success-message");
  msgDiv.innerText = "Macchina aggiunta al carrello con successo!";
  document.body.appendChild(msgDiv);
  setTimeout(() => { msgDiv.remove(); }, 3000);
}

// Aggiorna il conteggio degli articoli nel carrello (nella navbar)
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = cart.length;
}
