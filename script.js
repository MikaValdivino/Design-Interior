document.addEventListener("DOMContentLoaded", function () {
  splitTextIntoSpans(".logo p");
  splitTextIntoSpans(".hero-copy h1");

  gsap.to(".img-holder img", {
    left: 0,
    stagger: 0.1,
    ease: "power4.out",
    duration: 1.5,
    delay: 4,
  });

  gsap.to(".img-holder img", {
    left: "110%",
    stagger: -0.1,
    ease: "power4.out",
    duration: 1.5,
    delay: 7,
  });

  // Seleciona o menu toggle e a nav
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  // Evento de clique para abrir e fechar o menu
  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("menu-open");
  });

  // Fechar o menu ao clicar fora dele
  document.addEventListener("click", function (e) {
    if (
      !nav.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      nav.classList.contains("menu-open")
    ) {
      nav.classList.remove("menu-open");
    }
  });

  // Evento de clique nos links do menu
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function (event) {
      // Fecha o menu se estiver aberto
      nav.classList.remove("menu-open");

      // Obtem a seção alvo a partir do atributo href do link
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
    });
  });

  // Animação da seção About
  const aboutSection = document.getElementById("about");
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.fromTo(
          aboutSection,
          { opacity: 0, y: 50 }, // Garantindo que o texto começa invisível e deslocado
          { opacity: 1, y: 0, duration: 1 }
        );

        gsap.from("#about h2", {
          scrollTrigger: "#about",
          opacity: 1,
          y: 50,
          duration: 0.5,
        });

        gsap.fromTo(
          ".about-content",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        );
      }
    });
  });
  aboutObserver.observe(aboutSection);

  // Animação da seção Projects
  const projectsSection = document.getElementById("projects");
  const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.fromTo(
          projectsSection,
          { opacity: 0, y: 50 }, // Começa invisível e deslocado
          { opacity: 1, y: 0, duration: 1 }
        );

        // Animação dos projetos individuais
        const projectItems = projectsSection.querySelectorAll(".project-item");
        projectItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.2, // Adiciona um delay baseado na ordem
            }
          );
        });
      }
    });
  });
  projectsObserver.observe(projectsSection);

  // Animação da seção Services
  const servicesSection = document.getElementById("services");
  const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.fromTo(
          servicesSection,
          { opacity: 0, y: 50 }, // Mesma lógica para garantir que comece invisível
          { opacity: 1, y: 0, duration: 1 }
        );
      }
    });
  });
  servicesObserver.observe(servicesSection);

  // Animação da seção Contact
  const contactSection = document.getElementById("contact");
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.fromTo(
          contactSection,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 }
        );
      }
    });
  });
  contactObserver.observe(contactSection);

  // Função de fade-in quando o elemento entra na tela
  window.addEventListener("scroll", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    fadeElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("fade-in-visible");
      }
    });
  });
});

function splitTextIntoSpans(selector) {
  var element = document.querySelector(selector);
  if (element) {
    var text = element.innerText;
    var splitText = text
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");
    element.innerHTML = splitText;
  }
}

function startLoader() {
  var counterElement = document.querySelector(".counter p");
  var logoElement = document.querySelector(".logo p");
  var currentValue = 0;

  // Esconde a navbar imediatamente ao começar o loader
  gsap.to("nav", {
    opacity: 0,
    ease: "power3.inOut",
    duration: 0.5, // Ajuste o tempo da animação de desaparecimento
  });

  function updateCounter() {
    if (currentValue >= 100) {
      currentValue = 100;
      animateText();
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 5;
    currentValue = currentValue > 100 ? 100 : currentValue;
    counterElement.innerHTML =
      currentValue
        .toString()
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("") + "<span>%</span>";

    var delay = Math.floor(Math.random() * 200) + 100;
    setTimeout(updateCounter, delay);
  }

  function animateText() {
    setTimeout(() => {
      gsap.to(".counter p span", {
        top: "-400px",
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 1,
      });

      gsap.to(".logo p span", {
        top: "0",
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 1,
      });

      gsap.to(".logo p span", {
        top: "-400px",
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 1,
        delay: 3,
      });

      gsap.to(".overlay", {
        opacity: 0,
        ease: "power3.inOut",
        duration: 1,
        delay: 4,
      });

      gsap.to(".hero img", {
        scale: 1,
        ease: "power3.inOut",
        duration: 2,
        delay: 3.5,
      });

      gsap.to(".hero-copy h1 span", {
        top: "0",
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 2,
        delay: 4,
      });

      // Exibe a navbar novamente após a animação
      gsap.to("nav", {
        opacity: 1,
        ease: "power3.inOut",
        duration: 1,
        delay: 5, // Ajuste o delay conforme necessário
      });
    }, 300);
  }

  updateCounter();
}

startLoader();
