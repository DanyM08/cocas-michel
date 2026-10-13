// Galería: muestra fotos y videos; si no hay recurso todavía, deja un espacio de ejemplo.
import { NEGOCIO } from "../data/negocio.js";

export function iniciarGaleria() {
  const grid = document.getElementById("galeria-grid");

  NEGOCIO.galeria.forEach((foto) => {
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
      figura.appendChild(img);
    } else {
      figura.textContent = "Aquí va una foto";
    }
    grid.appendChild(figura);
  });
}