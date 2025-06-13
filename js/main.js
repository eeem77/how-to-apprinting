document.addEventListener("DOMContentLoaded", () => {
  // Registrar plugins GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Animaciones de entrada para secciones
  gsap.utils.toArray("section").forEach((section, index) => {
    if (index === 0) return; // Saltar la primera sección

    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        toggleActions: "play pause resume reset",
      },
      opacity: 0,
      y: 50,
      duration: 1.5,
    });
  });

  // Animación para tarjetas de pasos
  gsap.to(".step-card", {
    scrollTrigger: {
      scrub: true,
      trigger: ".step-card",
      end: "botton top",
      start: "top bottom",
      /*toggleActions: "play none none none",*/
    },
    opacity: 1,
    y: -50,
    stagger: 0.9,
    ease: "power.in",
    duration: 1.3,
  });
  // Animación para tarjetas de beneficios
  gsap.to(".benefit-card", {
    scrollTrigger: {
      scrub: true,
      trigger: ".benefits-section",
      start: "top bottom",
      end: "bottom top",
      /*toggleActions: "play none none none",*/
    },
    opacity: 1,
    y: -50,
    stagger: 0.25,
    ease: "power.in",
    duration: 1.3,
  });

  // Animación para botón CTA
  gsap.from(".cta-button", {
    scrollTrigger: {
      trigger: ".cta-section",
      start: "top center",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
  });

  // Canvas para explicar el margen de corte
  const bleedCanvas = document.getElementById("bleedCanvas");
  bleedCanvas.width = window.innerWidth / 3; // Ancho del canvas
  bleedCanvas.height = bleedCanvas.height; // Alto del canvas
  const bleedCtx = bleedCanvas.getContext("2d");
  const bleedWidth = bleedCanvas.width;
  const bleedHeight = bleedCanvas.height;

  function drawBleedExample() {
    // Limpiar canvas
    bleedCtx.clearRect(0, 0, bleedWidth, bleedHeight);

    // Margen de corte de 0.25 pulgadas (asumiendo 96 DPI: 0.25*96 = 24px)
    const bleed = 30;

    // Área de sangrado
    bleedCtx.fillStyle = "rgba(233, 69, 96, 0.2)";
    bleedCtx.fillRect(0, 0, bleedWidth, bleedHeight);

    // Área segura
    bleedCtx.fillStyle = "#ffffff";
    bleedCtx.fillRect(
      bleed,
      bleed,
      bleedWidth - 2 * bleed,
      bleedHeight - 2 * bleed
    );

    // Línea de corte
    bleedCtx.strokeStyle = "#EC5D75";
    bleedCtx.lineWidth = 2;
    bleedCtx.strokeRect(0, 0, bleedWidth, bleedHeight);

    // Línea de área segura
    bleedCtx.strokeStyle = "#EC5D75";
    bleedCtx.setLineDash([5, 3]);
    bleedCtx.strokeRect(
      bleed,
      bleed,
      bleedWidth - 2 * bleed,
      bleedHeight - 2 * bleed
    );
    bleedCtx.setLineDash([]);

    // Textos
    bleedCtx.fillStyle = "#333";
    bleedCtx.font = "bold 16px Arial";
    bleedCtx.fillText("Safe Design Area", bleedWidth / 2.9, bleed + 30);

    bleedCtx.fillStyle = "#e94560";
    bleedCtx.font = "bold 14px Arial";
    bleedCtx.fillText('Cutting Margin (0.25")', bleedWidth / 3, 20);
  }

  // Canvas interactivo
  const interactiveCanvas = document.getElementById("interactiveCanvas");
  if (window.innerWidth < 450) {
    interactiveCanvas.width = window.innerWidth - 40; // Ancho del canvas
  }
  const interactiveCtx = interactiveCanvas.getContext("2d");
  const canvasWidth = interactiveCanvas.width;
  const canvasHeight = interactiveCanvas.height;

  let bleedValue = 30; // 0.25" en píxeles (96 DPI)
  let showBleed = true;

  drawInteractiveCanvas();
  
  function drawInteractiveCanvas() {
    // Limpiar canvas
    interactiveCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dibujar fondo
    interactiveCtx.fillStyle = "#f0f0f0";
    interactiveCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Dibujar margen de corte si está activo
    if (showBleed) {
      interactiveCtx.fillStyle = "rgba(233, 69, 96, 0.15)";
      interactiveCtx.fillRect(0, 0, canvasWidth, canvasHeight);

      interactiveCtx.strokeStyle = "#e94560";
      interactiveCtx.lineWidth = 1;
      interactiveCtx.strokeRect(0, 0, canvasWidth, canvasHeight);

      // Texto de margen de corte
      interactiveCtx.fillStyle = "#e94560";
      interactiveCtx.font = "bold 14px Arial";
      interactiveCtx.fillText("Cutting Margin", canvasWidth / 2, 19);
    }

    // Área segura (tamaño final del documento)
    const safeX = showBleed ? bleedValue : 0;
    const safeY = showBleed ? bleedValue : 0;
    const safeWidth = canvasWidth - (showBleed ? 2 * bleedValue : 0);
    const safeHeight = canvasHeight - (showBleed ? 2 * bleedValue : 0);

    interactiveCtx.fillStyle = "#ffffff";
    interactiveCtx.fillRect(safeX, safeY, safeWidth, safeHeight);

    interactiveCtx.strokeStyle = "#EC5D75";
    interactiveCtx.setLineDash([5, 3]);
    interactiveCtx.lineWidth = 1;
    interactiveCtx.strokeRect(safeX, safeY, safeWidth, safeHeight);
    interactiveCtx.setLineDash([]);

    // Secure Area
    interactiveCtx.fillStyle = "#0f3460";
    interactiveCtx.font = "bold 16px Arial";
    //interactiveCtx.fillText("Secure Area", safeX + 100, safeY + 30);
    interactiveCtx.fillText("Secure Area", canvasWidth / 2, safeY + 30);

    // Elemento de diseño de ejemplo (invitación)
    interactiveCtx.fillStyle = "#1a1a2e";
    if (window.innerWidth < 450) {
      interactiveCtx.fillRect(
        safeX + 10,
        safeY + 100,
        safeWidth - 20,
        safeHeight - 200
      );
    } else {
      interactiveCtx.fillRect(
        safeX + 50,
        safeY + 100,
        safeWidth - 100,
        safeHeight - 200
      );
    }
    interactiveCtx.fillStyle = "#ffffff";
    interactiveCtx.font = "italic 28px Georgia";
    interactiveCtx.textAlign = "center";
    interactiveCtx.fillText(
      "Wedding Invitation",
      canvasWidth / 2,
      canvasHeight / 2 - 20
    );

    interactiveCtx.font = "18px Georgia";
    interactiveCtx.fillText(
      "Saturday, June 15, 2024",
      canvasWidth / 2,
      canvasHeight / 2 + 20
    );
  }

  // Controladores de botones
  document.getElementById("addBleed").addEventListener("click", () => {
    showBleed = true;
    drawInteractiveCanvas();
  });

  document.getElementById("removeBleed").addEventListener("click", () => {
    showBleed = false;
    drawInteractiveCanvas();
  });

  // document.getElementById("resetCanvas").addEventListener("click", () => {
  //   showBleed = true;
  //   bleedValue = 30;
  //   drawInteractiveCanvas();
  // });

  // Inicializar canvas
  drawBleedExample();
  drawInteractiveCanvas();

  // Animación para el canvas de margen de corte
  gsap.to(bleedCanvas, {
    scrollTrigger: {
      trigger: ".bleed-section",
      start: "top center",
      /*toggleActions: "play none none none",*/
    },
    duration: 1,
    opacity: 1,
    scale: 1,
    ease: "power2.out",
  });
});
