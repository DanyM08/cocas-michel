// Dibuja la lista de servicios a partir de los datos.
import { NEGOCIO } from "../data/negocio.js";
import { formatoPrecio } from "./utilidades.js";

export function iniciarServicios() {
  const lista = document.getElementById("lista-servicios");

  NEGOCIO.servicios.forEach((servicio) => {
    const li = document.createElement("li");
    const precio = servicio.precio === null
      ? `<span class="precio pendiente">Cotiza por WhatsApp</span>`
      : `<span class="precio">Desde ${formatoPrecio(servicio.precio)}</span>`;
    li.innerHTML = `<span class="nombre">${servicio.nombre}</span>${precio}`;
    lista.appendChild(li);
  });
}