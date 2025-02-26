function submitLogin(event) {
    event.preventDefault(); // Impedisce l'invio del form e il ricaricamento della pagina

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    // Verifica se i campi sono compilati
    if (email && password) {
        // Se "Ricordami" è selezionato, salva i dati nel localStorage
        if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
        }

        // Mostra il messaggio di successo
        const successMessage = document.getElementById("login-success-message");
        successMessage.style.display = 'block'; // Cambia display da 'none' a 'block'

        // Opzionale: reset del modulo
        document.getElementById("login-form").reset();

        // Dopo 2 secondi, reindirizza alla homepage
        setTimeout(function() {
            window.location.href = "index.html"; // Reindirizza alla homepage
        }, 2000); // 2000 millisecondi = 2 secondi
    } else {
        alert("Compila tutti i campi per effettuare il login.");
    }
}
document.addEventListener("DOMContentLoaded", function() {
    fetch('login.json')
        .then(response => response.json())
        .then(data => {
            // Navbar
            document.getElementById('logo').src = data.navbar.logo;

            // Login Section
            document.getElementById('login-title').textContent = data.login.title;
            document.getElementById('email-label').textContent = data.login.emailLabel;
            document.getElementById('password-label').textContent = data.login.passwordLabel;
            document.getElementById('remember-me-label').textContent = data.login.rememberMeLabel;
            document.getElementById('submit-button').textContent = data.login.submitButton;
            document.getElementById('back-home').textContent = data.login.backHomeText;
            
            // Messaggio di successo
            const successMessage = document.getElementById("login-success-message");
            successMessage.textContent = data.login.loginSuccessMessage;

        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));
});

function submitLogin(event) {
    event.preventDefault(); // Impedisce l'invio del form e il ricaricamento della pagina

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    // Verifica se i campi sono compilati
    if (email && password) {
        // Se "Ricordami" è selezionato, salva i dati nel localStorage
        if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
        }

        // Mostra il messaggio di successo
        const successMessage = document.getElementById("login-success-message");
        successMessage.style.display = 'block'; // Cambia display da 'none' a 'block'

        // Opzionale: reset del modulo
        document.getElementById("login-form").reset();

        // Dopo 2 secondi, reindirizza alla homepage
        setTimeout(function() {
            window.location.href = "index.html"; // Reindirizza alla homepage
        }, 2000); // 2000 millisecondi = 2 secondi
    } else {
        alert("Compila tutti i campi per effettuare il login.");
    }
}
