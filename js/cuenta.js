// Página "Mi cuenta": datos del usuario y sus citas. Si no hay sesión, manda a ingresar.
import { iniciarComun } from "./comun.js";
import { obtenerSesion, cerrarSesion, misCitas, cancelarCita } from "./api.js";

iniciarComun();

const lista = document.getElementById("lista-citas");
const sinCitas = document.getElementById("sin-citas");
const errorGeneral = document.getElementById("error-general");

const fechaLegible = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

// Todo se escribe con textContent para que ningún dato pueda meter código en la página.
function dato(titulo, valor) {
  const fila = document.createElement("div");
  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  dt.textContent = titulo;
  dd.textContent = valor;
  fila.append(dt, dd);
  return fila;
}

function tarjetaCita(cita) {
  const item = document.createElement("li");
  item.className = `cita ${cita.estado}`;

  const info = document.createElement("div");
  const titulo = document.createElement("strong");
  titulo.textContent = cita.servicio;
  const cuando = document.createElement("span");
  cuando.textContent = `${fechaLegible(cita.fecha)}, ${cita.hora}`;
  const estado = document.createElement("span");
  estado.className = "estado";
  estado.textContent = cita.estado === "cancelada" ? "Cancelada" : "Pendiente de confirmar";
  info.append(titulo, cuando, estado);
  item.appendChild(info);

  if (cita.estado !== "cancelada") {
    const cancelar = document.createElement("button");
    cancelar.type = "button";
    cancelar.className = "btn-secundario";
    cancelar.textContent = "Cancelar";
    cancelar.addEventListener("click", async () => {
      if (!confirm("¿Seguro que quieres cancelar esta cita?")) return;
      cancelar.disabled = true;
      try {
        await cancelarCita(cita.id);
        await mostrarCitas();
      } catch (error) {
        errorGeneral.textContent = error.message;
        cancelar.disabled = false;
      }
    });
    item.appendChild(cancelar);
  }
  return item;
}

async function mostrarCitas() {
  errorGeneral.textContent = "";
  const citas = await misCitas();
  lista.replaceChildren(...citas.map(tarjetaCita));
  sinCitas.hidden = citas.length > 0;
}

async function iniciar() {
  const usuario = await obtenerSesion();
  if (!usuario) {
    location.replace("login.html");
    return;
  }

  document.getElementById("saludo").textContent = `Hola, ${usuario.nombre}.`;
  document.getElementById("datos").replaceChildren(
    dato("Nombre", usuario.nombre),
    dato("Teléfono", usuario.telefono),
    dato("Correo", usuario.email)
  );

  await mostrarCitas();
}

document.getElementById("cerrar-sesion").addEventListener("click", async () => {
  await cerrarSesion();
  location.href = "index.html";
});

iniciar().catch((error) => {
  errorGeneral.textContent = error.message;
});
