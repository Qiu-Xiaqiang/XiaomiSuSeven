function submitForm() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const year = document.getElementById("year").value;
    const phone = document.getElementById("phone").value;

    if (name && surname && year && phone) {
        document.getElementById("contact-form").reset();
        document.getElementById("success-message").classList.remove("hidden");
    } else {
        alert("Compila tutti i campi prima di inviare il modulo.");
    }
}
function submitForm() {
    document.getElementById("contact-form").style.display = "none"; // Nasconde il form
    document.getElementById("success-message").classList.remove("hidden"); // Mostra il messaggio di conferma
    document.getElementById("home-link").classList.remove("hidden"); // Mostra la freccia per tornare alla Home
}
// Funzione per caricare i contenuti dal JSON
fetch('contatti.json')
    .then(response => response.json())
    .then(data => {
        // Carica i contenuti della pagina contatti
        document.getElementById('page-title').textContent = "Contatti - Xiaomi SU7";
        document.getElementById('contact-image').src = data.navbar.icons.contact;
        document.getElementById('form-title').textContent = data.contact.title;
        document.getElementById('name-label').textContent = data.contact.form.name;
        document.getElementById('surname-label').textContent = data.contact.form.surname;
        document.getElementById('year-label').textContent = data.contact.form.year;
        document.getElementById('phone-label').textContent = data.contact.form.phone;
        document.getElementById('submit-button').textContent = data.contact.button;
        document.getElementById('success-message').textContent = data.contact.successMessage;
        document.getElementById('home-link').textContent = data.contact.homeLink;
    })
    .catch(error => console.error('Errore nel caricamento del JSON:', error));

// Funzione per inviare il modulo
function submitForm() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const year = document.getElementById("year").value;
    const phone = document.getElementById("phone").value;

    if (name && surname && year && phone) {
        document.getElementById("contact-form").style.display = "none"; // Nasconde il form
        document.getElementById("success-message").classList.remove("hidden"); // Mostra il messaggio di conferma
        document.getElementById("home-link").classList.remove("hidden"); // Mostra la freccia per tornare alla Home
    } else {
        alert("Compila tutti i campi prima di inviare il modulo.");
    }
}

document.getElementById('submit-button').addEventListener('click', submitForm);
