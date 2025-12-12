window.addEventListener('DOMContentLoaded', () => {
  /* ---------- VARIABLES ---------- */
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('header nav a');
  const sections = document.querySelectorAll('section');

  /* ---------- MENU HAMBURGER ---------- */
  if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active'); // active : navbar s'étend verticalement
    });
  }

  if (navLinks) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbar) navbar.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('bx-x');
      });
    });
  }

  /* ---------- SCROLL & LIENS ACTIVE ---------- */
  window.addEventListener('scroll', () => {
    let top = window.scrollY;
    sections.forEach(sec => {
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });

  /* ---------- Typewriter Effect ---------- */
  const typeEl = document.getElementById('typewriter');
  const phrases = ['Développeuse Web','Technicien en Informatique', 'Créatrice de Contenu'];
  let pIndex = 0, lIndex = 0, deleting = false;
  const typeSpeed = 90, pauseAfter = 1500;

  function typeLoop() {
    if (!typeEl) return;
    const current = phrases[pIndex];
    if (!deleting) {
      lIndex++;
      typeEl.textContent = current.substring(0, lIndex);
      if (lIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, pauseAfter);
        return;
      }
    } else {
      lIndex--;
      typeEl.textContent = current.substring(0, lIndex);
      if (lIndex === 0) {
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? typeSpeed / 1.4 : typeSpeed);
  }
  typeLoop();

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- SLIDER ---------- */
  const sliderInner = document.querySelector(".slides-inner");
  const slides = document.querySelectorAll(".project-card");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  if (sliderInner && slides.length > 0) {
    let index = 0;
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth + 24; // largeur + margin droite (2.4rem ≈ 24px)

    function updateSlider() {
      sliderInner.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        index = (index - 1 + totalSlides) % totalSlides;
        updateSlider();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        index = (index + 1) % totalSlides;
        updateSlider();
      });
    }

    setInterval(() => {
      index = (index + 1) % totalSlides;
      updateSlider();
    }, 5000);
  }

  /* ---------- FORMULAIRE EMAILJS ---------- */
  /* ---------- FORMULAIRE EMAILJS ---------- */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceID = 'service_7rez26n';
    const templateID = 'template_slv81bl';
    const status = document.getElementById('status');

    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      if (status) {
        status.textContent = "Message envoyé ✅";
        status.style.display = 'block';           // on affiche le message
        status.style.position = 'fixed';          // position fixe en haut
        status.style.top = '10px';
        status.style.left = '50%';
        status.style.transform = 'translateX(-50%)';
        status.style.backgroundColor = '#28a745'; // vert discret
        status.style.color = '#fff';
        status.style.padding = '6px 12px';
        status.style.borderRadius = '5px';
        status.style.fontSize = '14px';
        status.style.zIndex = '9999';
        setTimeout(() => { status.style.display = 'none'; }, 3000); // disparaît après 3s
      }
      this.reset();
    })
    .catch((err) => {
      if (status) {
        status.textContent = "Erreur ❌";
        status.style.display = 'block';
        status.style.backgroundColor = '#dc3545'; // rouge pour erreur
        setTimeout(() => { status.style.display = 'none'; }, 3000);
      }
      console.error(err);
    });
  });
}
  
});