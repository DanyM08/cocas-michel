// Galería: muestra las fotos; si no hay foto todavía, deja un espacio de ejemplo.
import { NEGOCIO } from "../data/negocio.js";

export function iniciarGaleria() {
  const grid = document.getElementById("galeria-grid");

  NEGOCIO.galeria.forEach((foto) => {
    const figura = document.createElement("figure");

    if (foto.src) {
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