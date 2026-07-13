const header =
  document.querySelector("header");

window.addEventListener("scroll", () => {

  if(window.scrollY > 30){
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});

/* COLOR LAB */

const colorButtons = document.querySelectorAll(".color-buttons button");
const furniture = document.getElementById("colorFurniture");

if (furniture) {
  furniture.src = "./images/MUEBLE VERDE.png";
  furniture.style.opacity = "1";
  furniture.style.transform = "scale(1)";
}

if (colorButtons.length && furniture) {
  colorButtons.forEach(button => {
    button.addEventListener("click", () => {
      furniture.style.opacity = "0";
      furniture.style.transform = "scale(.97)";

      setTimeout(() => {
        furniture.src = button.dataset.image;

        furniture.onload = () => {
          furniture.style.opacity = "1";
          furniture.style.transform = "scale(1)";
        };
      }, 150);
    });
  });
}

/* HERO */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("compareSlider");
  const oldWrapper = document.getElementById("compareOldWrapper");
  const line = document.getElementById("compareLine");

  if (!slider || !oldWrapper || !line) {
    console.error("No se encontraron los elementos del comparador.");
    return;
  }

  let isDragging = false;
  let animationFrame = null;
  let pendingPosition = 50;

  function applyPosition(position) {
    const safePosition = Math.max(0, Math.min(100, position));
    const hiddenRight = 100 - safePosition;

    /*
      El contenedor de la imagen vieja y la línea
      reciben exactamente la misma posición.
    */

    oldWrapper.style.clipPath =
      `inset(0 ${hiddenRight}% 0 0)`;

    oldWrapper.style.webkitClipPath =
      `inset(0 ${hiddenRight}% 0 0)`;

    line.style.left = `${safePosition}%`;
  }

  function calculatePosition(clientX) {
    const rect = slider.getBoundingClientRect();

    return (
      (clientX - rect.left) /
      rect.width
    ) * 100;
  }

  function requestPosition(clientX) {
    pendingPosition = calculatePosition(clientX);

    pendingPosition = Math.max(
      0,
      Math.min(100, pendingPosition)
    );

    if (animationFrame !== null) {
      return;
    }

    animationFrame = requestAnimationFrame(() => {
      applyPosition(pendingPosition);
      animationFrame = null;
    });
  }

  function startDragging(event) {
    isDragging = true;

    slider.classList.add("is-dragging");

    if (slider.setPointerCapture) {
      slider.setPointerCapture(event.pointerId);
    }

    requestPosition(event.clientX);
  }

  function moveDragging(event) {
    if (!isDragging) {
      return;
    }

    requestPosition(event.clientX);
  }

  function stopDragging(event) {
    if (!isDragging) {
      return;
    }

    isDragging = false;

    slider.classList.remove("is-dragging");

    if (
      slider.hasPointerCapture &&
      slider.hasPointerCapture(event.pointerId)
    ) {
      slider.releasePointerCapture(event.pointerId);
    }
  }

  slider.addEventListener("pointerdown", startDragging);
  slider.addEventListener("pointermove", moveDragging);
  slider.addEventListener("pointerup", stopDragging);
  slider.addEventListener("pointercancel", stopDragging);

  applyPosition(50);
});


/* ==================================
   TESTIMONIOS
================================== */

const testimonialData = [
  {
    text: "“Llegué sin experiencia y hoy restauro mis propios muebles.”",
    mobileText: "“Hoy restauro mis propios muebles.”",
    name: "Martina Fernández",
    info: "29 años · Curso Integral"
  },
  {
    text: "“Aprendí que restaurar también es diseñar y crear algo nuevo.”",
    mobileText: "“Aprendí a diseñar y crear.”",
    name: "Camila Rodríguez",
    info: "34 años · Color Lab"
  },
  {
    text: "“El ambiente del taller hizo que disfrutara cada parte del proceso.”",
    mobileText: "“Disfruté cada parte del proceso.”",
    name: "Julieta Acosta",
    info: "27 años · Curso Inicial"
  },
  {
    text: "“Ahora miro los muebles antiguos con otros ojos.”",
    mobileText: "“Ahora miro los muebles de otra manera.”",
    name: "Lucía Herrera",
    info: "31 años · Curso Integral"
  },
  {
    text: "“El curso me dio herramientas para empezar mi propio proyecto.”",
    mobileText: "“Empecé mi propio proyecto.”",
    name: "Sofía Benítez",
    info: "38 años · Rediseño Avanzado"
  },
  {
    text: "“Descubrí una nueva forma de combinar materiales y color.”",
    mobileText: "“Descubrí una nueva forma de crear.”",
    name: "Valentina López",
    info: "26 años · Color Lab"
  },
  {
    text: "“Terminé con una pieza restaurada y ganas de seguir creando.”",
    mobileText: "“Terminé con ganas de seguir creando.”",
    name: "Carolina Méndez",
    info: "33 años · Curso Integral"
  }
];

const testimonialDesktop =
  document.querySelector(".testimonial-desktop");

const testimonialQuote =
  document.querySelector(".testimonial-quote");

const testimonialText =
  document.getElementById("testimonialText");

const testimonialName =
  document.getElementById("testimonialName");

const testimonialInfo =
  document.getElementById("testimonialInfo");

const testimonialDots =
  document.querySelectorAll(".testimonial-dots .dot");

let testimonialIndex = 0;
let testimonialAnimating = false;

/* ACTUALIZAR CONTENIDO */

function updateTestimonial(index, direction = 1) {
  const item = testimonialData[index];

  if (
    !item ||
    !testimonialText ||
    !testimonialName ||
    !testimonialInfo ||
    testimonialAnimating
  ) {
    return;
  }

  testimonialAnimating = true;

  const exitX = direction > 0 ? -30 : 30;
  const enterX = direction > 0 ? 30 : -30;

  testimonialText.style.opacity = "0";
  testimonialName.style.opacity = "0";
  testimonialInfo.style.opacity = "0";

  testimonialText.style.transform =
    `translateX(${exitX}px)`;

  testimonialName.style.transform =
    `translateX(${exitX}px)`;

  testimonialInfo.style.transform =
    `translateX(${exitX}px)`;

  setTimeout(() => {
    testimonialText.textContent =
      window.innerWidth <= 620
        ? item.mobileText
        : item.text;

    testimonialName.textContent = item.name;
    testimonialInfo.textContent = item.info;

    testimonialDots.forEach(dot => {
      dot.classList.remove("active");
    });

    if (testimonialDots[index]) {
      testimonialDots[index].classList.add("active");
    }

    testimonialText.style.transition = "none";
    testimonialName.style.transition = "none";
    testimonialInfo.style.transition = "none";

    testimonialText.style.transform =
      `translateX(${enterX}px)`;

    testimonialName.style.transform =
      `translateX(${enterX}px)`;

    testimonialInfo.style.transform =
      `translateX(${enterX}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const transition =
          "opacity .3s ease, transform .35s ease";

        testimonialText.style.transition = transition;
        testimonialName.style.transition = transition;
        testimonialInfo.style.transition = transition;

        testimonialText.style.opacity = "1";
        testimonialName.style.opacity = "1";
        testimonialInfo.style.opacity = "1";

        testimonialText.style.transform =
          "translateX(0)";

        testimonialName.style.transform =
          "translateX(0)";

        testimonialInfo.style.transform =
          "translateX(0)";
      });
    });

    setTimeout(() => {
      testimonialAnimating = false;
    }, 380);

  }, 220);
}

/* ==================================
   DESKTOP: TOCAR LOS PUNTOS
================================== */

testimonialDots.forEach(dot => {
  dot.addEventListener("click", () => {
    if (window.innerWidth <= 620) return;

    const newIndex =
      Number(dot.dataset.testimonial);

    if (
      Number.isNaN(newIndex) ||
      newIndex === testimonialIndex
    ) {
      return;
    }

    const direction =
      newIndex > testimonialIndex ? 1 : -1;

    testimonialIndex = newIndex;

    updateTestimonial(
      testimonialIndex,
      direction
    );
  });
});

/* ==================================
   MOBILE: DESLIZAR CON EL DEDO
================================== */

if (testimonialDesktop) {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchCurrentX = 0;
  let touchCurrentY = 0;
  let isTouching = false;

  testimonialDesktop.addEventListener(
    "touchstart",
    event => {
      if (window.innerWidth > 620) return;
      if (!event.touches.length) return;

      isTouching = true;

      touchStartX =
        event.touches[0].clientX;

      touchStartY =
        event.touches[0].clientY;

      touchCurrentX = touchStartX;
      touchCurrentY = touchStartY;

      if (testimonialQuote) {
        testimonialQuote.classList.add(
          "swiping"
        );
      }
    },
    { passive: true }
  );

  testimonialDesktop.addEventListener(
    "touchmove",
    event => {
      if (
        window.innerWidth > 620 ||
        !isTouching ||
        !event.touches.length
      ) {
        return;
      }

      touchCurrentX =
        event.touches[0].clientX;

      touchCurrentY =
        event.touches[0].clientY;

      const distanceX =
        touchCurrentX - touchStartX;

      const distanceY =
        touchCurrentY - touchStartY;

      /*
        Solo movemos visualmente el contenido
        cuando el gesto es principalmente horizontal.
      */

      if (
        Math.abs(distanceX) >
        Math.abs(distanceY)
      ) {
        if (testimonialQuote) {
          testimonialQuote.style.transform =
            `translateX(${distanceX * .18}px)`;
        }
      }
    },
    { passive: true }
  );

  testimonialDesktop.addEventListener(
    "touchend",
    () => {
      if (
        window.innerWidth > 620 ||
        !isTouching
      ) {
        return;
      }

      isTouching = false;

      if (testimonialQuote) {
        testimonialQuote.classList.remove(
          "swiping"
        );

        testimonialQuote.style.transform =
          "translateX(0)";
      }

      const distanceX =
        touchCurrentX - touchStartX;

      const distanceY =
        touchCurrentY - touchStartY;

      /*
        Si predominó el movimiento vertical,
        fue un scroll normal de la página.
      */

      if (
        Math.abs(distanceX) <=
        Math.abs(distanceY)
      ) {
        return;
      }

      /*
        Evita cambiar de testimonio
        con un toque o gesto mínimo.
      */

      if (Math.abs(distanceX) < 45) {
        return;
      }

      const direction =
        distanceX < 0 ? 1 : -1;

      testimonialIndex =
        (
          testimonialIndex +
          direction +
          testimonialData.length
        ) % testimonialData.length;

      updateTestimonial(
        testimonialIndex,
        direction
      );
    },
    { passive: true }
  );

  testimonialDesktop.addEventListener(
    "touchcancel",
    () => {
      isTouching = false;

      if (testimonialQuote) {
        testimonialQuote.classList.remove(
          "swiping"
        );

        testimonialQuote.style.transform =
          "translateX(0)";
      }
    },
    { passive: true }
  );
}

/* ==================================
   TEXTO CORRECTO AL CARGAR/REDIMENSIONAR
================================== */

function refreshCurrentTestimonial() {
  const item =
    testimonialData[testimonialIndex];

  if (
    !item ||
    !testimonialText ||
    !testimonialName ||
    !testimonialInfo
  ) {
    return;
  }

  testimonialText.textContent =
    window.innerWidth <= 620
      ? item.mobileText
      : item.text;

  testimonialName.textContent =
    item.name;

  testimonialInfo.textContent =
    item.info;

  testimonialDots.forEach(dot => {
    dot.classList.remove("active");
  });

  if (testimonialDots[testimonialIndex]) {
    testimonialDots[
      testimonialIndex
    ].classList.add("active");
  }
}

refreshCurrentTestimonial();

window.addEventListener(
  "resize",
  refreshCurrentTestimonial
);


/* =========================
   MUEBLES CÁPSULA
========================= */

const capsuleTrack =
  document.querySelector(".capsule-track");

const capsulePrev =
  document.querySelector(".capsule-prev");

const capsuleNext =
  document.querySelector(".capsule-next");

const capsuleSlider =
  document.querySelector(".capsule-slider");

const capsuleItems =
  document.querySelectorAll(".capsule-item");

if (
  capsuleTrack &&
  capsulePrev &&
  capsuleNext &&
  capsuleSlider &&
  capsuleItems.length
) {
  let capsuleIndex = 0;

  function getVisibleCapsuleCards() {
    if (window.innerWidth <= 620) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateCapsuleCarousel() {
    const firstItem = capsuleItems[0];

    if (!firstItem) return;

    const trackStyles =
      window.getComputedStyle(capsuleTrack);

    const gap =
      parseFloat(trackStyles.columnGap) || 24;

    const itemWidth =
      firstItem.getBoundingClientRect().width;

    const maxIndex = Math.max(
      0,
      capsuleItems.length -
      getVisibleCapsuleCards()
    );

    capsuleIndex = Math.max(
      0,
      Math.min(capsuleIndex, maxIndex)
    );

    const movement =
      capsuleIndex * (itemWidth + gap);

    capsuleTrack.style.transform =
      `translate3d(-${movement}px, 0, 0)`;

    /* Izquierda oculta solamente al comienzo */

    capsulePrev.classList.toggle(
      "hidden",
      capsuleIndex === 0
    );

    /* Derecha oculta solamente en la última card */

    capsuleNext.classList.toggle(
      "hidden",
      capsuleIndex === maxIndex
    );
  }

  /* FLECHA DERECHA */

  capsuleNext.addEventListener("click", event => {
    event.stopPropagation();

    capsuleIndex++;

    /* Ocultar información al cambiar de foto */

    capsuleItems.forEach(item => {
      item.classList.remove("active");
    });

    updateCapsuleCarousel();
  });

  /* FLECHA IZQUIERDA */

  capsulePrev.addEventListener("click", event => {
    event.stopPropagation();

    capsuleIndex--;

    capsuleItems.forEach(item => {
      item.classList.remove("active");
    });

    updateCapsuleCarousel();
  });


  /* RECALCULAR */

  window.addEventListener(
    "resize",
    updateCapsuleCarousel
  );

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      updateCapsuleCarousel();
    });
  });

  window.addEventListener("load", () => {
    capsuleIndex = 0;
    updateCapsuleCarousel();
  });
}


/* PROYECTOS MOBILE */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
  const flip = card.querySelector(".project-flip");

  if (flip) {
    flip.addEventListener("click", (e) => {
      if (window.innerWidth <= 620) {
        e.preventDefault();
        e.stopPropagation();

        card.classList.toggle("active");
      }
    });
  }
});

/* TRANSFORMACIÓN ACORDEÓN */

const storyPanels = document.querySelectorAll(".story-panel");

storyPanels.forEach(panel => {

    const trigger = panel.querySelector(".story-trigger");
    const icon = trigger.querySelector("strong");

    trigger.addEventListener("click", () => {

        // Si el panel ya está abierto, se cierra
        if (panel.classList.contains("active")) {

            panel.classList.remove("active");
            icon.textContent = "+";

            return;
        }

        // Cerrar todos
        storyPanels.forEach(item => {

            item.classList.remove("active");

            item.querySelector("strong").textContent = "+";

        });

        // Abrir el seleccionado
        panel.classList.add("active");

        icon.textContent = "−";

    });

});

/* ==================================
   CAMBIAR LA MIRADA — DESKTOP
================================== */

const discoverMap =
  document.getElementById("discoverMap");

const layerHotspots =
  document.querySelectorAll(
    ".discover-desktop-layout .hotspot"
  );

const layerCards =
  document.querySelectorAll(
    ".discover-info .layer-card"
  );

const discoverPlaceholder =
  document.querySelector(
    ".discover-info-placeholder"
  );

if (
  discoverMap &&
  layerHotspots.length &&
  layerCards.length
) {
  layerHotspots.forEach(hotspot => {
    hotspot.addEventListener("click", event => {
      event.stopPropagation();

      const selected =
        hotspot.dataset.card;

      const wasActive =
        hotspot.classList.contains("active");

      layerHotspots.forEach(item => {
        item.classList.remove("active");
      });

      layerCards.forEach(card => {
        card.classList.remove("active");
      });

      if (discoverPlaceholder) {
        discoverPlaceholder.classList.remove("active");
      }

      /* Si vuelve a tocar el mismo, se cierra */

      if (wasActive) {
        if (discoverPlaceholder) {
          discoverPlaceholder.classList.add("active");
        }

        return;
      }

      hotspot.classList.add("active");

      const selectedCard =
        document.querySelector(
          `.discover-info .layer-card[data-info="${selected}"]`
        );

      if (selectedCard) {
        selectedCard.classList.add("active");
      }
    });
  });
}

/* CURSOS MOBILE FLIP */

const courseCards = document.querySelectorAll(".course-card");

courseCards.forEach(card => {
  card.addEventListener("click", () => {
    if (window.innerWidth <= 620) {
      card.classList.toggle("active");
    }
  });
});



/* DESCUBRIR MOBILE FLIP */

const discoverMobileCard = document.querySelector(".discover-mobile-card");

if (discoverMobileCard) {
  discoverMobileCard.addEventListener("click", () => {
    discoverMobileCard.classList.toggle("active");
  });
}

/* SCROLL REVEAL CORREGIDO */

const revealElements = document.querySelectorAll(
  ".reveal:not(section):not(footer)"
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");

      /* Deja de observarlo una vez que apareció */
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.08,
    rootMargin: "0px 0px -30px 0px"
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});

/* ==================================
   ESPACIO RAÍZ DESKTOP
================================== */

const spaceImage =
  document.getElementById("spaceImage");

const spaceTitle =
  document.getElementById("spaceTitle");

const spaceDescription =
  document.getElementById("spaceDescription");

const spaceOverlay =
  document.querySelector(".space-overlay");

const spacePoints =
  document.querySelectorAll(".space-point");

let spaceChanging = false;

function changeSpaceContent(index) {
  const selectedPoint = spacePoints[index];

  if (
    !selectedPoint ||
    !spaceImage ||
    !spaceTitle ||
    !spaceDescription ||
    !spaceOverlay ||
    spaceChanging
  ) {
    return;
  }

  const nextImage =
    selectedPoint.dataset.image;

  const nextTitle =
    selectedPoint.dataset.title;

  const nextDescription =
    selectedPoint.dataset.description;

  if (
    !nextImage ||
    !nextTitle ||
    !nextDescription
  ) {
    return;
  }

  spaceChanging = true;

  spacePoints.forEach(point => {
    point.classList.remove("active");
  });

  selectedPoint.classList.add("active");

  spaceImage.classList.add("changing");
  spaceOverlay.classList.add("changing");

  const preloadImage = new Image();

  preloadImage.onload = () => {
    setTimeout(() => {
      spaceImage.src = nextImage;
      spaceTitle.textContent = nextTitle;
      spaceDescription.textContent =
        nextDescription;

      requestAnimationFrame(() => {
        spaceImage.classList.remove("changing");
        spaceOverlay.classList.remove("changing");
      });

      setTimeout(() => {
        spaceChanging = false;
      }, 350);
    }, 160);
  };

  preloadImage.onerror = () => {
    spaceImage.classList.remove("changing");
    spaceOverlay.classList.remove("changing");
    spaceChanging = false;

    console.error(
      "No se pudo cargar la imagen:",
      nextImage
    );
  };

  preloadImage.src = nextImage;
}

spacePoints.forEach((point, index) => {
  point.addEventListener("mouseenter", () => {
    if (window.innerWidth > 620) {
      changeSpaceContent(index);
    }
  });

  point.addEventListener("click", () => {
    if (window.innerWidth > 620) {
      changeSpaceContent(index);
    }
  });
});

/* ==================================
   ESPACIO RAÍZ MOBILE
================================== */

const spaceMobileSlider =
  document.getElementById("spaceMobileSlider");

const spaceMobileSlides =
  document.querySelectorAll(".space-mobile-slide");

const spaceMobileDots =
  document.querySelectorAll(".space-mobile-dot");

if (
  spaceMobileSlider &&
  spaceMobileSlides.length &&
  spaceMobileDots.length
) {
  function updateSpaceMobileDot() {
    const sliderRect =
      spaceMobileSlider.getBoundingClientRect();

    let closestIndex = 0;
    let closestDistance = Infinity;

    spaceMobileSlides.forEach((slide, index) => {
      const slideRect =
        slide.getBoundingClientRect();

      const distance = Math.abs(
        slideRect.left - sliderRect.left
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    spaceMobileDots.forEach(dot => {
      dot.classList.remove("active");
    });

    if (spaceMobileDots[closestIndex]) {
      spaceMobileDots[
        closestIndex
      ].classList.add("active");
    }
  }

  let mobileSpaceScrollTimer = null;

  spaceMobileSlider.addEventListener(
    "scroll",
    () => {
      clearTimeout(mobileSpaceScrollTimer);

      mobileSpaceScrollTimer = setTimeout(
        updateSpaceMobileDot,
        70
      );
    },
    { passive: true }
  );

  spaceMobileDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const targetSlide =
        spaceMobileSlides[index];

      if (!targetSlide) return;

      targetSlide.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    });
  });

  updateSpaceMobileDot();
}

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("spaceMobileSlider");
  const track = document.getElementById("spaceMobileTrack");
  const dotsContainer = document.getElementById("spaceMobileDots");

  if (!slider || !track || !dotsContainer) return;

  const slides = Array.from(
    track.querySelectorAll(".space-mobile-slide")
  );

  const dots = Array.from(
    dotsContainer.querySelectorAll(".space-mobile-dot")
  );

  let currentSlide = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function showSlide(index) {
    currentSlide = Math.max(
      0,
      Math.min(slides.length - 1, index)
    );

    track.style.transform =
      `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle(
        "active",
        dotIndex === currentSlide
      );
    });
  }

  function startDrag(event) {
    isDragging = true;
    startX = event.clientX;
    currentX = startX;

    slider.setPointerCapture?.(event.pointerId);
  }

  function moveDrag(event) {
    if (!isDragging) return;

    currentX = event.clientX;
  }

  function endDrag(event) {
    if (!isDragging) return;

    isDragging = false;

    const distance = currentX - startX;
    const minimumDistance = 45;

    if (distance < -minimumDistance) {
      showSlide(currentSlide + 1);
    } else if (distance > minimumDistance) {
      showSlide(currentSlide - 1);
    } else {
      showSlide(currentSlide);
    }

    if (
      slider.hasPointerCapture?.(event.pointerId)
    ) {
      slider.releasePointerCapture(event.pointerId);
    }
  }

  slider.addEventListener("pointerdown", startDrag);
  slider.addEventListener("pointermove", moveDrag);
  slider.addEventListener("pointerup", endDrag);
  slider.addEventListener("pointercancel", endDrag);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  showSlide(0);
});

/* ==================================
   CONTACTO
================================== */

const contactForm =
  document.getElementById("contactForm");

const contactFeedback =
  document.getElementById("contactFeedback");

if (contactForm && contactFeedback) {
  contactForm.addEventListener(
    "submit",
    event => {
      event.preventDefault();

      const formData =
        new FormData(contactForm);

      const name =
        String(formData.get("name") || "").trim();

      const email =
        String(formData.get("email") || "").trim();

      const message =
        String(formData.get("message") || "").trim();

      if (!name || !email || !message) {
        contactFeedback.textContent =
          "Completá todos los campos para continuar.";

        return;
      }

      contactFeedback.textContent =
        "¡Gracias! Recibimos tu consulta.";

      contactForm.reset();

      const firstOption =
        contactForm.querySelector(
          'input[name="consultation"]'
        );

      if (firstOption) {
        firstOption.checked = true;
      }

      setTimeout(() => {
        contactFeedback.textContent = "";
      }, 4500);
    }
  );
}


/* ==================================
   MENÚ MOBILE
================================== */

document.addEventListener("DOMContentLoaded", () => {
  const menuButton =
    document.getElementById("menuBtn");

  const navigation =
    document.getElementById("nav");

  if (!menuButton || !navigation) return;

  function closeMenu() {
    navigation.classList.remove("active");

    menuButton.textContent = "☰";

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Abrir menú"
    );

    document.body.classList.remove("menu-open");
  }

  menuButton.addEventListener("click", event => {
    event.preventDefault();

    const isOpen =
      navigation.classList.toggle("active");

    menuButton.textContent =
      isOpen ? "✕" : "☰";

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen
        ? "Cerrar menú"
        : "Abrir menú"
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );
  });

  navigation
    .querySelectorAll("a")
    .forEach(link => {
      link.addEventListener(
        "click",
        closeMenu
      );
    });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 620) {
      closeMenu();
    }
  });
});


/* CURSOS RELACIONADOS MOBILE */

const relatedCourseCards =
  document.querySelectorAll(".related-course-card");

relatedCourseCards.forEach(card => {
  card.addEventListener("click", event => {
    if (window.innerWidth > 620) return;

    if (event.target.closest("a")) return;

    const wasActive =
      card.classList.contains("active");

    relatedCourseCards.forEach(item => {
      item.classList.remove("active");
    });

    if (!wasActive) {
      card.classList.add("active");
    }
  });
});


