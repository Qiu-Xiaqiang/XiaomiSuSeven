document.addEventListener("DOMContentLoaded", function() {
    fetch('index.json')
        .then(response => response.json())
        .then(data => {
            // Navbar
            document.getElementById('logo').src = data.navbar.logo;
            document.getElementById('navbar-home').textContent = data.navbar.home;
            document.getElementById('home-link').textContent = data.navbar.home;
            document.getElementById('cart-link').textContent = data.navbar.cart;
            document.getElementById('contact-link').textContent = data.navbar.contact;
            document.getElementById('login-link').textContent = data.navbar.login;

            // Hero Section
            document.getElementById('hero-title').textContent = data.hero.title;
            document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
            document.getElementById('hero-image').src = data.hero.image;
            document.getElementById('hero-button').textContent = data.hero.buttonText;
            document.getElementById('hero-button').href = data.hero.buttonLink;

            // Models Section (disposizione 2x2)
            const modelsSection = document.getElementById('models-section');
            data.models.forEach((model, index) => {
                const modelCard = `
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <h5 class="card-title">${model.name}</h5>
                                <p class="price">${model.price}</p>
                                <img src="${model.image}" alt="${model.name}" class="card-img-top">
                                <p class="card-text">${model.description}</p>
                                <a href="${model.link}" class="btn btn-primary">Scopri di più</a>
                            </div>
                        </div>
                    </div>
                `;
                modelsSection.innerHTML += modelCard;
            });

            // Footer
            document.getElementById('footer-copyright').textContent = data.footer.copyright;
            document.getElementById('footer-sale').textContent = data.footer.sale;
            document.getElementById('footer-last-update').textContent = data.footer.lastUpdate;
            document.getElementById('footer-home').textContent = data.navbar.home;
            document.getElementById('footer-cart').textContent = data.navbar.cart;
            document.getElementById('footer-contact').textContent = data.navbar.contact;
            document.getElementById('footer-login').textContent = data.navbar.login;
        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));
});
