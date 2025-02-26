// Mostra il totale dal carrello salvato
document.addEventListener("DOMContentLoaded", function() {
    const totalPrice = localStorage.getItem("totalPrice") || "€0.00";
    document.getElementById("checkout-total").textContent = totalPrice;
});

// Gestisce l'invio del modulo
document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita il refresh della pagina

    // Prendi i valori inseriti
    const name = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const cap = document.getElementById("cap").value;
    const citizenship = document.getElementById("citizenship").value;
    const cardNumber = document.getElementById("card-number").value;
    const swift = document.getElementById("swift").value;

    // Controllo di validità
    if (!name || !email || !address || !cap || !citizenship || !cardNumber || !swift) {
        alert("Compila tutti i campi prima di inviare l'ordine.");
        return;
    }

    // Simula la conferma dell'ordine
    alert(`Grazie ${name}! Il tuo ordine è stato inviato con successo. Ti invieremo una conferma a ${email}.`);

    // Svuota il carrello
    localStorage.removeItem("cart");

    // Reindirizza alla homepage
    window.location.href = "index.html";
});
// Funzione per caricare i contenuti dal file JSON
window.onload = function() {
    // Carica il file JSON
    fetch('checkout.json')
        .then(response => response.json())
        .then(data => {
            // Imposta il titolo della pagina
            document.title = data.title;

            // Navbar
            document.querySelector('.navbar-brand').textContent = data.navbar.brand;
            const navbarLinks = document.getElementById('navbar-links');
            data.navbar.menu.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('nav-item');
                li.innerHTML = `<a class="nav-link" href="${item.url}">${item.label}</a>`;
                navbarLinks.appendChild(li);
            });

            // Sezione Checkout
            document.getElementById('checkout-title').textContent = data.checkout.title;
            
            const formFields = document.getElementById('form-fields');
            for (const key in data.checkout.form) {
                const div = document.createElement('div');
                div.classList.add('mb-3');
                div.innerHTML = `
                    <label class="form-label">${data.checkout.form[key]}</label>
                    <input type="text" id="${key}" class="form-control" required>
                `;
                formFields.appendChild(div);
            }

            document.getElementById('checkout-total-label').textContent = data.checkout.total_label;
            document.getElementById('submit-button').textContent = data.checkout.submit_button;

            // Footer
            document.getElementById('footer-text').textContent = data.footer.text;
            const footerLinks = document.getElementById('footer-links');
            data.footer.links.forEach(link => {
                const a = document.createElement('a');
                a.classList.add('text-light', 'footer-link', 'me-3');
                a.href = link.url;
                a.textContent = link.label;
                footerLinks.appendChild(a);
            });

            // Visualizza il totale da pagare
            const totalPrice = localStorage.getItem('totalPrice');
            const checkoutTotalElement = document.getElementById('checkout-total');
            if (checkoutTotalElement && totalPrice) {
                checkoutTotalElement.textContent = totalPrice;
            }

            // Gestisci la conferma dell'ordine
            const checkoutForm = document.getElementById('checkout-form');
            checkoutForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert("Ordine confermato con successo!");
                // Reindirizza alla pagina di conferma
                window.location.href = 'index.html';
            });
        })
        .catch(error => {
            console.error("Errore nel caricamento del JSON:", error);
        });
};


