// Punto de entrada de la página de inicio: arranca cada parte.
import { NEGOCIO } from "../data/negocio.js";
import { iniciarComun } from "./comun.js";
import { iniciarServicios } from "./servicios.js";
import { iniciarCotizador } from "./cotizador.js";
import { iniciarGaleria } from "./galeria.js";

iniciarComun();

// Ubicación: el mapa, la dirección y el enlace de "Cómo llegar" salen de negocio.js.
const comoLlegar = document.getElementById("como-llegar");
document.getElementById("mapa").src = NEGOCIO.ubicacion.mapa;
document.getElementById("direccion").textContent = NEGOCIO.ubicacion.direccion;
comoLlegar.href = NEGOCIO.ubicacion.enlace;
comoLlegar.target = "_blank";
comoLlegar.rel = "noopener";

// Horarios: si no hay ninguno en negocio.js, el bloque no aparece.
if (NEGOCIO.horarios.length) {
  document.getElementById("lista-horarios").innerHTML = NEGOCIO.horarios
    .map((h) => `<div><dt>${h.dia}</dt><dd>${h.horas}</dd></div>`)
    .join("");
} else {
  document.getElementById("horarios").remove();
}

iniciarServicios();
iniciarCotizador();
iniciarGaleria();
