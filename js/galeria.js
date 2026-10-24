// Galería: muestra fotos y videos, filtra por categoría y amplía las fotos al tocarlas.
import { NEGOCIO } from "../data/negocio.js";

export function iniciarGaleria() {
  const grid = document.getElementById("galeria-grid");
  const filtros = document.getElementById("filtros");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");

  function dibujar(lista) {
    grid.innerHTML = "";
    grid.scrollLeft = 0;          // al filtrar, la tira vuelve al principio
    lista.forEach((foto) => {
      const figura = document.createElement("figure");

      if (foto.src && foto.tipo === "video") {
        const video = document.createElement("video");
        video.src = foto.src;
        video.controls = true;
        video.preload = "metadata";
        video.playsInline = true;
        video.setAttribute("aria-label", foto.alt);
        figura.appendChild(video);
      } else if (foto.src) {
        const img = document.createElement("img");
        img.src = foto.src;
        img.alt = foto.alt;
        img.loading = "lazy";
        img.decoding = "async";
        img.tabIndex = 0;                      // se puede llegar con el teclado
        img.setAttribute("role", "button");
        figura.appendChild(img);
      } else {
        figura.textContent = "Imagen no disponible";
      }
      if (foto.src) {
        const pie = document.createElement("figcaption");
        pie.textContent = foto.alt;
        figura.appendChild(pie);
      }
      grid.appendChild(figura);
    });
  }

  // Lightbox: un solo evento en la galería sirve para todas las fotos.
  let ultimaFoto = null;

  function abrirLightbox(foto) {
    ultimaFoto = foto;
    lightboxImg.src = foto.src;
    lightboxImg.alt = foto.alt;
    lightbox.classList.add("abierto");
    lightbox.querySelector("button").focus();   // el teclado pasa al botón de cerrar
  }

  function cerrarLightbox() {
    if (!lightbox.classList.contains("abierto")) return;
    lightbox.classList.remove("abierto");
    ultimaFoto?.focus();                        // y regresa a la foto que abriste
  }

  grid.addEventListener("click", (evento) => {
    if (evento.target.tagName === "IMG") abrirLightbox(evento.target);
  });
  grid.addEventListener("keydown", (evento) => {
    if ((evento.key === "Enter" || evento.key === " ") && evento.target.tagName === "IMG") {
      evento.preventDefault();
      abrirLightbox(evento.target);
    }
  });

  // Se cierra con la X, tocando el fondo oscuro o con la tecla Escape.
  lightbox.addEventListener("click", (evento) => {
    if (evento.target !== lightboxImg) cerrarLightbox();
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") cerrarLightbox();
  });

  // Categorías sin repetir, con "Todos" al principio.
  const categorias = ["Todos", ...new Set(NEGOCIO.galeria.map((f) => f.categoria))];

  // Con una sola categoría los filtros sobran: se quitan y aparecen solos cuando haya 2 o más.
  const hayFiltros = categorias.length > 2;
  if (!hayFiltros) filtros.remove();

  (hayFiltros ? categorias : []).forEach((categoria) => {
    const boton = document.createElement("button");
    boton.textContent = categoria;
    boton.addEventListener("click", () => {
      const fotos = categoria === "Todos"
        ? NEGOCIO.galeria
        : NEGOCIO.galeria.filter((f) => f.categoria === categoria);
      dibujar(fotos);

      filtros.querySelectorAll("button").forEach((b) => b.classList.remove("activo"));
      boton.classList.add("activo");
    });
    filtros.appendChild(boton);
  });

  dibujar(NEGOCIO.galeria);
  filtros.querySelector("button")?.classList.add("activo");
}
