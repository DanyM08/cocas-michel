// Punto de entrada de la página de inicio: arranca cada parte.
import { NEGOCIO } from "../data/negocio.js";
import { iniciarComun } from "./comun.js";
import { diasAbiertosTexto, diasCerradosTexto, horasTexto } from "./utilidades.js";
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

// Horarios: salen de negocio.js (días abiertos y hora de abrir y cerrar).
const cerrados = diasCerradosTexto();
document.getElementById("lista-horarios").innerHTML =
  `<div><dt>${diasAbiertosTexto()}</dt><dd>${horasTexto()}</dd></div>` +
  (cerrados ? `<div><dt>${cerrados}</dt><dd>Cerrado</dd></div>` : "");

iniciarServicios();
iniciarCotizador();
iniciarGaleria();
