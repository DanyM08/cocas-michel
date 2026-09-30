// Punto de entrada: arranca cada parte de la página.
import { linkWhatsApp } from "./utilidades.js";
import { iniciarServicios } from "./servicios.js";
import { iniciarCotizador } from "./cotizador.js";
import { iniciarGaleria } from "./galeria.js";

// Botones de WhatsApp: toman su mensaje del atributo data-whatsapp.
document.querySelectorAll("[data-whatsapp]").forEach((boton) => {
  boton.href = linkWhatsApp(boton.dataset.whatsapp);
  boton.target = "_blank";
  boton.rel = "noopener";
});

iniciarServicios();
iniciarCotizador();
iniciarGaleria();

document.getElementById("anio").textContent = new Date().getFullYear();