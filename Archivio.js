document.addEventListener("DOMContentLoaded", function () {
    // Oggetto contenente le immagini per ogni modello
    const images = {
        "su7-base": ["Immagini/white4.jpg", "Immagini/white2.jpg", "Immagini/white3.jpg", "Immagini/white1.jpg", "Immagini/white.jpg"],
        "su7-pro": ["Immagini/black.jpg", "Immagini/black2.jpg", "Immagini/black3.jpg", "Immagini/black1.jpg", "Immagini/black4.jpg"],
        "su7-max": ["Immagini/pink.jpg", "Immagini/pink2.jpg", "Immagini/pink3.jpg", "Immagini/pink1.jpg", "Immagini/pink4.jpg"],
        "su7-ultra": ["Immagini/ultra2.jpg","Immagini/ultra3.jpg","Immagini/ultra1.jpg","Immagini/ultra.jpg"],
        "su7-interni": ["Immagini/Interni1.png","Immagini/interni2.png","Immagini/Interni3.png"]
    };

    // Gestisci il cambio di immagine per ogni contenitore
    document.querySelectorAll(".image-container").forEach(container => {
        const img = container.querySelector(".car-image");
        const model = img.dataset.model;  // Ottieni il modello tramite data-model
        let index = 0;  // Indice iniziale

        // Log per capire quale modello è selezionato
        console.log(`Modello: ${model}`);

        // Pulsante precedente
        container.querySelector(".prev").addEventListener("click", function () {
            console.log("Cliccato il pulsante 'prev'");  // Log per il debug
            // Vai all'immagine precedente
            index = (index - 1 + images[model].length) % images[model].length;
            console.log(`Indice dopo il prev: ${index}`);  // Log per il debug
            img.src = images[model][index];
        });

        // Pulsante successivo
        container.querySelector(".next").addEventListener("click", function () {
            console.log("Cliccato il pulsante 'next'");  // Log per il debug
            // Vai all'immagine successiva
            index = (index + 1) % images[model].length;
            console.log(`Indice dopo il next: ${index}`);  // Log per il debug
            img.src = images[model][index];
        });
    });
});
fetch('archivio.json')
    .then(response => response.json())
    .then(data => {
        // Impostiamo il titolo della pagina
        document.querySelector('[data-content="title"]').textContent = data.title;

        // Impostiamo i contenuti della navbar
        document.querySelector('[data-content="navbar.home"]').textContent = data.navbar.home;
        document.querySelector('[data-content="navbar.carrello"]').textContent = data.navbar.carrello;
        document.querySelector('[data-content="navbar.contatti"]').textContent = data.navbar.contatti;
        document.querySelector('[data-content="navbar.login"]').textContent = data.navbar.login;

        // Impostiamo il contenuto del main
        document.querySelector('[data-content="main.h1"]').textContent = data.main.h1;
        data.main.sections.forEach((section, index) => {
            document.querySelector(`[data-content="main.sections[${index}].title"]`).textContent = section.title;
            document.querySelector(`[data-content="main.sections[${index}].description"]`).textContent = section.description;
        });

        // Impostiamo il footer
        document.querySelector('[data-content="footer.text"]').textContent = data.footer.text;
    })
    .catch(error => console.error('Error loading JSON:', error));

