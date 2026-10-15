//Logica de las imagenes de la galeria 
import { NEGOCIO } from "../data/negocio.js";

export function iniciarGaleria() {
  const grid = document.getElementById("galeria-grid");
  const  filtros = document.getElementById("filtros");

  function dibujar(lista){
    grid.innerHTML = "";
    lista.forEach((foto) => {
      const figura = document.createElement("figure");
      if (foto.src && foto.tipo === "video"){
        const video = document.createElement("video");
        video.src = foto.src;
        video.controls = true;
        video.preload = "metadata";
        video.playsInline = true;
        video.setAttribute("aria-label", foto.alt);
        figura.appendChild(video);
      }else if (foto.src){
        const img = document.createElement("img");
        img.src = foto.src;
        img.alt = foto.alt;
        img.loading = "lazy";
        figura.appendChild(img);
      }else{
        figura.textContent = "Imagen no disponible";
      }
      grid.appendChild(figura);
  });
}
// Categorías sin repetir, con "Todos" al principio
const categorias = ["Todos", ...new Set(NEGOCIO.galeria.map((f) => f.categoria))];

categorias.forEach((categoria) => {
  const boton = document.createElement("button");
  boton.textContent = categoria;
  boton.addEventListener("click", () => {
    // 1. Mostrar las fotos que toquen
    if (categoria === "Todos") {
      dibujar(NEGOCIO.galeria);
    } else {
      dibujar(NEGOCIO.galeria.filter((f) => f.categoria === categoria));
    }

    // 2. Marcar solo este botón como activo
    filtros.querySelectorAll("button").forEach((b) => b.classList.remove("activo"));
    boton.classList.add("activo");
  });
  filtros.appendChild(boton);
  });
  dibujar(NEGOCIO.galeria);
  filtros.querySelector("button").classList.add("activo"); // "Todos" empieza activo
}




