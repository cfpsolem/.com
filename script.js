document.addEventListener('DOMContentLoaded', () => {

    // 1. Gestion du menu de navigation mobile (burger menu)
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Fermeture du menu si l'on clique sur un lien
    document.querySelectorAll('.nav-menu a').forEach(item => {
        item.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // 2. Défilement fluide (Smooth Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Animation du compteur pour la section "Statistiques"
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    // Utilisation de l'API Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                statNumbers.forEach(number => {
                    const target = parseInt(number.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 100;

                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(interval);
                        }
                        number.textContent = Math.ceil(current);
                    }, 20);
                });
                hasAnimated = true;
            }
        });
    }, {
        threshold: 0.5
    });

    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // NOUVELLE FONCTIONNALITÉ : Gestion du formulaire de contact pour envoyer un email
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Empêche l'envoi classique du formulaire vers une page
            e.preventDefault(); 
            
            // Récupère les valeurs des champs du formulaire
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const phone = contactForm.querySelector('input[name="phone"]').value;
            const formation = contactForm.querySelector('select[name="formation"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            // Construit le corps du message pour le lien mailto
            const subject = `Message de contact du site web par ${name}`;
            const body = `Bonjour CFP SOLEM,\n\nVous avez reçu un nouveau message du site web.\n\nNom: ${name}\nE-mail: ${email}\nTéléphone: ${phone}\nDomaine de formation intéressé: ${formation}\n\nMessage:\n${message}`;

            // Crée le lien mailto:
            const mailtoLink = `mailto:cfptm.solem@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Ouvre le client de messagerie de l'utilisateur
            window.location.href = mailtoLink;

            alert('Votre message est prêt à être envoyé. Veuillez confirmer l\'envoi dans votre logiciel de messagerie.');
        });
    }

});

document.addEventListener('DOMContentLoaded', function() {
    // Le code de votre fonction est défini ici...
    const textElement = document.querySelector('.animated-text');
    const textToAnimate = "Maîtriser les compétences pour un impact durable et humanitaire.";
    let charIndex = 0;
    const typingSpeed = 75;

    function typeWriter() {
        if (charIndex < textToAnimate.length) {
            textElement.textContent += textToAnimate.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            textElement.style.borderRight = 'none';
        }
    }

    // L'appel de la fonction se fait une seule fois, ici :
    typeWriter(); 
});