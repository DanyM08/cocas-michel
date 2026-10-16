// Punto de entrada: arranca cada parte de la página.
import { NEGOCIO } from "../data/negocio.js";
import { linkWhatsApp } from "./utilidades.js";
import { iniciarMenu } from "./menu.js";
import { iniciarServicios } from "./servicios.js";
import { iniciarCotizador } from "./cotizador.js";
import { iniciarGaleria } from "./galeria.js";

// Botones de WhatsApp: toman su mensaje del atributo data-whatsapp.
document.querySelectorAll("[data-whatsapp]").forEach((boton) => {
  boton.href = linkWhatsApp(boton.dataset.whatsapp);
  boton.target = "_blank";
  boton.rel = "noopener";
});

// Ubicación: el mapa y el enlace de "Cómo llegar" salen de negocio.js.
const comoLlegar = document.getElementById("como-llegar");
document.getElementById("mapa").src = NEGOCIO.ubicacion.mapa;
document.getElementById("direccion").textContent = NEGOCIO.ubicacion.direccion;
comoLlegar.href = NEGOCIO.ubicacion.enlace;
comoLlegar.target = "_blank";
comoLlegar.rel = "noopener";

// Botones de redes: el enlace sale de negocio.js. Si una red no tiene enlace, su botón se quita.
document.querySelectorAll("[data-red]").forEach((boton) => {
  const enlace = NEGOCIO.redes[boton.dataset.red];
  if (!enlace) {
    boton.remove();
    return;
  }
  boton.href = enlace;
  boton.target = "_blank";
  boton.rel = "noopener";
});

// Si ninguna red tiene enlace, se quitan también las filas vacías y el enlace "Redes" del menú.
document.querySelectorAll(".redes").forEach((fila) => {
  if (!fila.children.length) fila.remove();
});
if (!document.querySelector(".bloque-redes .redes")) {
  document.querySelector(".bloque-redes")?.remove();
  document.querySelector('a[href="#redes"]')?.parentElement.remove();
}

iniciarMenu();
iniciarServicios();
iniciarCotizador();
iniciarGaleria();

document.getElementById("anio").textContent = new Date().getFullYear();