// Encabezado, pie de página y botón de WhatsApp: se escriben UNA vez aquí y salen en todas las páginas.
import { NEGOCIO } from "../data/negocio.js";
import { linkWhatsApp } from "./utilidades.js";
import { obtenerSesion } from "./api.js";

const REDES = [
  { id: "instagram", nombre: "Instagram" },
  { id: "tiktok", nombre: "TikTok" },
  { id: "facebook", nombre: "Facebook" }
];

// Solo se dibujan las redes que tienen enlace en negocio.js.
const redesConEnlace = REDES.filter((red) => NEGOCIO.redes[red.id]);

const iconosRedes = () => redesConEnlace
  .map((red) => `<a href="${NEGOCIO.redes[red.id]}" target="_blank" rel="noopener" aria-label="${red.nombre}"><img src="img/iconos/${red.id}.svg" alt=""></a>`)
  .join("");

const encabezado = () => `
  <div class="contenedor">
    <nav aria-label="Principal">
      <a class="logo" href="index.html#inicio"><img src="img/logo.jpg" alt="Cocas’ Michel, el salón de la estética"></a>
      <button class="menu-boton" id="menu-boton" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu">
        <span></span><span></span><span></span>
      </button>
      <div class="menu" id="menu">
        <ul>
          <li><a href="index.html#servicios">Servicios</a></li>
          <li><a href="index.html#cotizador">Cotizador</a></li>
          <li><a href="index.html#galeria">Galería</a></li>
          <li><a href="productos.html">Productos</a></li>
          <li><a href="index.html#ubicacion">Ubicación</a></li>
          <li><a href="index.html#contacto">Contacto</a></li>
          ${redesConEnlace.length ? '<li><a href="index.html#redes">Redes</a></li>' : ""}
        </ul>
        <div class="menu-acciones">
          <a class="btn" href="citas.html">Agendar cita</a>
          <a class="btn-secundario" id="enlace-cuenta" href="login.html">Ingresar</a>
        </div>
        ${redesConEnlace.length ? `<div class="redes">${iconosRedes()}</div>` : ""}
      </div>
    </nav>
  </div>`;

const pie = () => `
  <div class="contenedor pie">
    <span>© ${new Date().getFullYear()} Cocas’ Michel · <a href="privacidad.html">Aviso de privacidad</a> · <a href="condiciones.html">Condiciones del servicio</a></span>
    ${redesConEnlace.length ? `<div class="redes">${iconosRedes()}</div>` : ""}
  </div>`;

export function montarLayout() {
  document.getElementById("encabezado").innerHTML = encabezado();
  document.getElementById("pie").innerHTML = pie();

  document.body.insertAdjacentHTML("beforeend", `
    <div class="flotantes">
      <a class="whatsapp-flotante" href="${linkWhatsApp("Hola, quiero información de sus servicios.")}" target="_blank" rel="noopener">WhatsApp</a>
    </div>`);

  // Filas de redes que están dentro de la página (por ejemplo en Contacto).
  document.querySelectorAll("[data-redes]").forEach((fila) => {
    if (redesConEnlace.length) fila.innerHTML = iconosRedes();
    else (fila.closest(".bloque-redes") || fila).remove();
  });

  marcarPaginaActual();
  mostrarCuenta();
}

// Resalta en el menú la página donde estás (solo las que son páginas aparte, no secciones de inicio).
function marcarPaginaActual() {
  const actual = location.pathname.split("/").pop();
  document.querySelectorAll("#menu li a").forEach((enlace) => {
    if (!enlace.getAttribute("href").includes("#") && enlace.getAttribute("href") === actual) {
      enlace.setAttribute("aria-current", "page");
    }
  });
}

// Si hay sesión iniciada, "Ingresar" se convierte en "Mi cuenta".
function mostrarCuenta() {
  const enlace = document.getElementById("enlace-cuenta");
  obtenerSesion()
    .then((usuario) => {
      if (!usuario) return;
      enlace.textContent = "Mi cuenta";
      enlace.href = "cuenta.html";
    })
    .catch(() => {});
}
