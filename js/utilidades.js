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

/* ---------- Horario de atención ---------- */

const NOMBRES_DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const lunesPrimero = (dia) => (dia + 6) % 7;   // para listar de lunes a domingo

// "19:30" -> "7:30 p. m."
function hora12(hora) {
  const [h, m] = hora.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "p. m." : "a. m."}`;
}

// [1, 2, 4] -> "Lunes, martes y jueves"
function listaDeDias(dias) {
  const nombres = [...dias].sort((a, b) => lunesPrimero(a) - lunesPrimero(b)).map((d) => NOMBRES_DIAS[d]);
  const texto = nombres.length > 1 ? `${nombres.slice(0, -1).join(", ")} y ${nombres.at(-1)}` : nombres[0];
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// "Lunes, martes, jueves, viernes y sábado"
export const diasAbiertosTexto = () => listaDeDias(NEGOCIO.horario.diasAbiertos);

// "Miércoles y domingo" (o "" si abren todos los días)
export function diasCerradosTexto() {
  const cerrados = [0, 1, 2, 3, 4, 5, 6].filter((d) => !NEGOCIO.horario.diasAbiertos.includes(d));
  return cerrados.length ? listaDeDias(cerrados) : "";
}

// "11:00 a. m. a 7:30 p. m."
export const horasTexto = () => `${hora12(NEGOCIO.horario.abre)} a ${hora12(NEGOCIO.horario.cierra)}`;

// "Lunes, martes, jueves, viernes y sábado de 11:00 a. m. a 7:30 p. m."
export const horarioTexto = () => `${diasAbiertosTexto()} de ${horasTexto()}`;

// ¿Abren ese día? Recibe una fecha "AAAA-MM-DD".
export function esDiaAbierto(fechaISO) {
  const dia = new Date(`${fechaISO}T12:00:00`).getDay();
  return NEGOCIO.horario.diasAbiertos.includes(dia);
}

// ¿Está dentro del horario? Recibe una hora "HH:MM" (la hora de cierre sí cuenta).
export function esHoraAbierta(hora) {
  return hora >= NEGOCIO.horario.abre && hora <= NEGOCIO.horario.cierra;
}
