// Funciones pequeñas que usan varios archivos.
import { NEGOCIO } from "../data/negocio.js";

// Crea el enlace de WhatsApp con el mensaje ya escrito.
export function linkWhatsApp(mensaje) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

// 1500 -> "$1,500 MXN"
export function formatoPrecio(numero) {
  return `$${numero.toLocaleString("es-MX")} MXN`;
}