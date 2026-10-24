// Página "Agendar cita": valida el formulario, guarda la cita y deja confirmarla por WhatsApp.
import { NEGOCIO } from "../data/negocio.js";
import { iniciarComun } from "./comun.js";
import { crearCita, obtenerSesion } from "./api.js";
import { linkWhatsApp, esDiaAbierto, esHoraAbierta, horarioTexto } from "./utilidades.js";
import { validarFormulario, mostrarError, esTelefono, soloDigitos, obligatorio, minimo } from "./validacion.js";

iniciarComun();

const formulario = document.getElementById("formulario-cita");
const errorGeneral = document.getElementById("error-general");
const boton = document.getElementById("enviar-cita");
const confirmacion = document.getElementById("confirmacion");

// Hoy en formato AAAA-MM-DD (hora local, no UTC) para no permitir fechas pasadas.
const hoy = new Date();
const hoyISO = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
formulario.elements.fecha.min = hoyISO;

// Hora actual "HH:MM" (para no aceptar una hora que ya pasó el mismo día).
const horaActual = () => new Date().toTimeString().slice(0, 5);

// Horario de atención: se muestra y se usa para avisar si piden algo fuera de horario.
const avisoHorario = document.getElementById("aviso-horario");
document.getElementById("horario-cita").textContent = horarioTexto();
document.getElementById("texto-horario").textContent = horarioTexto();
document.getElementById("hablar-personal").href = linkWhatsApp("Hola, necesito agendar una cita urgente fuera de horario.");
document.getElementById("hablar-personal").target = "_blank";
document.getElementById("hablar-personal").rel = "noopener";
formulario.elements.hora.min = NEGOCIO.horario.abre;
formulario.elements.hora.max = NEGOCIO.horario.cierra;

// Muestra el aviso "fuera de horario" en cuanto eligen un día cerrado o una hora fuera del horario.
function revisarHorario() {
  const { fecha, hora } = formulario.elements;
  const fueraDeHorario = (fecha.value && !esDiaAbierto(fecha.value)) || (hora.value && !esHoraAbierta(hora.value));
  avisoHorario.hidden = !fueraDeHorario;
}
formulario.elements.fecha.addEventListener("change", revisarHorario);
formulario.elements.hora.addEventListener("change", revisarHorario);

// Llena el menú de servicios con los de negocio.js.
NEGOCIO.servicios.forEach((servicio) => {
  formulario.elements.servicio.add(new Option(servicio.nombre, servicio.nombre));
});

// Si hay sesión, el nombre y el teléfono ya vienen escritos.
obtenerSesion()
  .then((usuario) => {
    if (!usuario) return;
    formulario.elements.nombre.value = usuario.nombre;
    formulario.elements.telefono.value = usuario.telefono;
  })
  .catch(() => {});

const fechaLegible = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  errorGeneral.textContent = "";

  const valido = validarFormulario(formulario, {
    nombre: [obligatorio("Escribe tu nombre."), minimo(2, "El nombre es muy corto.")],
    telefono: [obligatorio("Escribe tu teléfono."), (v) => (esTelefono(v) ? "" : "Debe tener 10 dígitos.")],
    servicio: [obligatorio("Elige un servicio.")],
    fecha: [
      obligatorio("Elige una fecha."),
      (v) => (v >= hoyISO ? "" : "La fecha ya pasó."),
      (v) => (esDiaAbierto(v) ? "" : "Ese día no atendemos.")
    ],
    hora: [
      obligatorio("Elige una hora."),
      (v) => (esHoraAbierta(v) ? "" : "Esa hora está fuera de horario."),
      (v) => (formulario.elements.fecha.value === hoyISO && v < horaActual() ? "Esa hora ya pasó." : "")
    ],
    privacidad: [obligatorio("Para solicitar la cita, acepta el aviso de privacidad.")],
    condiciones: [obligatorio("Para solicitar la cita, acepta las condiciones del servicio.")]
  });
  revisarHorario();
  if (!valido) return;

  const datos = {
    nombre: formulario.elements.nombre.value.trim(),
    telefono: soloDigitos(formulario.elements.telefono.value),
    servicio: formulario.elements.servicio.value,
    fecha: formulario.elements.fecha.value,
    hora: formulario.elements.hora.value,
    notas: formulario.elements.notas.value.trim(),
    privacidadAceptada: true,
    condicionesAceptadas: true
  };

  boton.disabled = true;
  boton.textContent = "Enviando…";
  try {
    await crearCita(datos);
  } catch (error) {
    errorGeneral.textContent = error.message;
    boton.disabled = false;
    boton.textContent = "Solicitar cita";
    return;
  }

  const resumen = `${datos.servicio}, ${fechaLegible(datos.fecha)} a las ${datos.hora}.`;
  document.getElementById("resumen-cita").textContent = resumen;
  document.getElementById("confirmar-whatsapp").href = linkWhatsApp(
    `Hola, soy ${datos.nombre}. Quiero agendar: ${resumen}${datos.notas ? ` Notas: ${datos.notas}` : ""}`
  );
  document.getElementById("confirmar-whatsapp").target = "_blank";
  document.getElementById("confirmar-whatsapp").rel = "noopener";

  formulario.hidden = true;
  confirmacion.hidden = false;
  confirmacion.focus();
});

// Al corregir un campo, su error desaparece.
formulario.addEventListener("input", (evento) => {
  if (evento.target.closest(".campo")) mostrarError(evento.target, "");
});
