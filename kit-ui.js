const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {
      menuBtn.textContent = "✕";
      menuBtn.setAttribute("aria-expanded", "true");
    } else {
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==================================
   CARRUSELES IDENTIDAD VISUAL MOBILE
================================== */

function initUiCarousel(carouselId, dotsId, cardSelector) {
  const carousel =
    document.getElementById(carouselId);

  const dotsContainer =
    document.getElementById(dotsId);

  if (!carousel || !dotsContainer) return;

  const cards = Array.from(
    carousel.querySelectorAll(cardSelector)
  );

  if (!cards.length) return;

  dotsContainer.innerHTML = "";

  const dots = cards.map((card, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "ui-carousel-dot";
    dot.setAttribute(
      "aria-label",
      `Ver elemento ${index + 1}`
    );

    dot.addEventListener("click", () => {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    });

    dotsContainer.appendChild(dot);

    return dot;
  });

  function updateActiveDot() {
    const carouselRect =
      carousel.getBoundingClientRect();

    const carouselCenter =
      carouselRect.left +
      carouselRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect =
        card.getBoundingClientRect();

      const cardCenter =
        cardRect.left +
        cardRect.width / 2;

      const distance = Math.abs(
        cardCenter - carouselCenter
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle(
        "active",
        index === closestIndex
      );
    });
  }

  let scrollTimer = null;

  carousel.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(
        updateActiveDot,
        60
      );
    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateActiveDot
  );

  updateActiveDot();
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    initUiCarousel(
      "colorCarousel",
      "colorDots",
      ".color-card"
    );

    initUiCarousel(
      "contrastCarousel",
      "contrastDots",
      ".contrast-card"
    );
  }
);

/* ==================================
   CARRUSEL TIPOGRAFÍAS MOBILE
================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    initUiCarousel(
      "typeFamilyCarousel",
      "typeFamilyDots",
      ".type-family-card"
    );
  }
);

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initUiCarousel(
      "spacingCarousel",
      "spacingDots",
      ".spacing-card"
    );

    initUiCarousel(
      "radiusShadowCarousel",
      "radiusShadowDots",
      ".token-panel"
    );

  }
);

const spacingValues = [

  {
    value:"4 PX",
    text:"Microajustes",
    width:"8%"
  },

  {
    value:"8 PX",
    text:"Separación mínima",
    width:"14%"
  },

  {
    value:"12 PX",
    text:"Etiquetas",
    width:"22%"
  },

  {
    value:"16 PX",
    text:"Gap pequeño",
    width:"30%"
  },

  {
    value:"24 PX",
    text:"Cards y controles",
    width:"42%"
  },

  {
    value:"32 PX",
    text:"Bloques internos",
    width:"56%"
  },

  {
    value:"48 PX",
    text:"Encabezados",
    width:"75%"
  },

  {
    value:"72 PX",
    text:"Separación entre secciones",
    width:"100%"
  }

];

let spacingIndex = 0;

const spacingCard =
document.getElementById("spacingCard");

if(spacingCard){

  spacingCard.addEventListener(
    "click",
    ()=>{

      spacingIndex++;

      if(
        spacingIndex >=
        spacingValues.length
      ){
        spacingIndex = 0;
      }

      document.getElementById(
        "spacingValue"
      ).textContent =
      spacingValues[
        spacingIndex
      ].value;

      document.getElementById(
        "spacingDescription"
      ).textContent =
      spacingValues[
        spacingIndex
      ].text;

      document.getElementById(
        "spacingBar"
      ).style.width =
      spacingValues[
        spacingIndex
      ].width;

    }
  );

}
initUiCarousel(
  "courseCardsCarousel",
  "courseCardsDots",
  ".demo-course-card, .demo-info-card"
);

initUiCarousel(
  "effectsCarousel",
  "effectsDots",
  ".effect-card"
);

initUiCarousel(
  "responsiveCarousel",
  "responsiveDots",
  ".breakpoint-card"
);