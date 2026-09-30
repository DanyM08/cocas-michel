// Cotizador: elige un servicio, muestra el precio y arma el mensaje de WhatsApp.
import { NEGOCIO } from "../data/negocio.js";
import { linkWhatsApp, formatoPrecio } from "./utilidades.js";

export function iniciarCotizador() {
  const select = document.getElementById("servicio");
  const monto = document.getElementById("monto");
  const nota = document.getElementById("nota");
  const enviar = document.getElementById("enviar");

  // Llena el menú con los mismos servicios de la lista.
  NEGOCIO.servicios.forEach((servicio, i) => {
    select.add(new Option(servicio.nombre, i));
  });

  function actualizar() {
    const servicio = NEGOCIO.servicios[select.value];

    if (servicio.precio === null) {
      monto.textContent = "Por cotizar";
      nota.textContent = "Este servicio depende del trabajo. Mándanos un mensaje y te damos el precio.";
      enviar.href = linkWhatsApp(`Hola, quiero cotizar: ${servicio.nombre}.`);
    } else {
      monto.textContent = `Desde ${formatoPrecio(servicio.precio)}`;
      nota.textContent = "Precio aproximado. El total final se confirma al realizar el trabajo.";
      enviar.href = linkWhatsApp(`Hola, quiero: ${servicio.nombre} (desde ${formatoPrecio(servicio.precio)}). ¿Tienen cita disponible?`);
    }
    enviar.target = "_blank";
    enviar.rel = "noopener";
  }

  select.addEventListener("change", actualizar);
  actualizar();
}