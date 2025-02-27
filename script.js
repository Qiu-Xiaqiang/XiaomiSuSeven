// index.js

document.addEventListener("DOMContentLoaded", function() {
    // Carica il file JSON con tutti i riferimenti testuali
    fetch('index.json')
      .then(response => response.json())
      .then(data => {
        // Aggiorna il titolo della pagina
        document.title = data.title;
  
        // Navbar: aggiorna il brand e i link
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) navbarBrand.textContent = data.navbar.brand;
  
        const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
        if (navbarLinks.length >= 4) {
          navbarLinks[0].textContent = data.navbar.links.home;
          navbarLinks[1].textContent = data.navbar.links.carrello;
          navbarLinks[2].textContent = data.navbar.links.contattaci;
          navbarLinks[3].textContent = data.navbar.links.login;
        }
  
        // Hero Section: aggiorna heading, lead e bottone
        const heroHeading = document.querySelector('.hero h1');
        if (heroHeading) heroHeading.textContent = data.hero.heading;
  
        const heroLead = document.querySelector('.hero .lead');
        if (heroLead) heroLead.textContent = data.hero.lead;
  
        const heroBtn = document.querySelector('.hero a.esplora-btn');
        if (heroBtn) heroBtn.textContent = data.hero.btn;
  
        // Sezione principale: heading e sottotitolo
        const modelsHeading = document.querySelector('main section h2');
        if (modelsHeading) modelsHeading.textContent = data.modelsSection.heading;
  
        const modelsSubheading = document.querySelector('main section p.text-muted');
        if (modelsSubheading) modelsSubheading.textContent = data.modelsSection.subheading;
  
        // Cards: aggiorna titoli, prezzi, descrizioni e bottoni
        const cardTitles = document.querySelectorAll('.card .card-title');
        const cardPrices = document.querySelectorAll('.card .price');
        const cardTexts = document.querySelectorAll('.card .card-text');
        const cardBtns = document.querySelectorAll('.card a.btn-primary');
  
        if (cardTitles.length === 4) {
          cardTitles[0].textContent = data.cards.base.title;
          cardTitles[1].textContent = data.cards.pro.title;
          cardTitles[2].textContent = data.cards.max.title;
          cardTitles[3].textContent = data.cards.ultra.title;
        }
        if (cardPrices.length === 4) {
          cardPrices[0].textContent = data.cards.base.price;
          cardPrices[1].textContent = data.cards.pro.price;
          cardPrices[2].textContent = data.cards.max.price;
          cardPrices[3].textContent = data.cards.ultra.price;
        }
        if (cardTexts.length === 4) {
          cardTexts[0].textContent = data.cards.base.description;
          cardTexts[1].textContent = data.cards.pro.description;
          cardTexts[2].textContent = data.cards.max.description;
          cardTexts[3].textContent = data.cards.ultra.description;
        }
        if (cardBtns.length === 4) {
          cardBtns[0].textContent = data.cards.base.btn;
          cardBtns[1].textContent = data.cards.pro.btn;
          cardBtns[2].textContent = data.cards.max.btn;
          cardBtns[3].textContent = data.cards.ultra.btn;
        }
  
        // Footer: aggiorna il testo dei crediti mantenendo il <span> per il grassetto
        const footerCreditParagraph = document.querySelector('footer .container p');
        if (footerCreditParagraph && data.footer.credits) {
          footerCreditParagraph.innerHTML = data.footer.credits.pre +
            '<span class="fw-bold">' + data.footer.credits.bold + '</span>' +
            data.footer.credits.post;
        }
  
        // Footer: aggiorna i link
        const footerLinks = document.querySelectorAll('footer .footer-link');
        if (footerLinks.length >= 4) {
          footerLinks[0].textContent = data.footer.links.home;
          footerLinks[1].textContent = data.footer.links.carrello;
          footerLinks[2].textContent = data.footer.links.contattaci;
          footerLinks[3].textContent = data.footer.links.login;
        }
      })
      .catch(error => console.error('Errore nel caricamento del file JSON:', error));
  });
  