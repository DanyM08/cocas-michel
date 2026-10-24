// Página "Ingresar".
import { iniciarComun } from "./comun.js";
import { iniciarSesion, obtenerSesion } from "./api.js";
import { validarFormulario, mostrarError, esEmail, obligatorio } from "./validacion.js";

iniciarComun();

const formulario = document.getElementById("formulario-login");
const errorGeneral = document.getElementById("error-general");
const boton = document.getElementById("enviar");

// Si ya hay sesión, no tiene sentido pedir los datos otra vez.
obtenerSesion()
  .then((usuario) => { if (usuario) location.replace("cuenta.html"); })
  .catch(() => {});

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  errorGeneral.textContent = "";

  const valido = validarFormulario(formulario, {
    email: [obligatorio("Escribe tu correo."), (v) => (esEmail(v) ? "" : "Ese correo no parece válido.")],
    password: [obligatorio("Escribe tu contraseña.")]
  });
  if (!valido) return;

  boton.disabled = true;
  boton.textContent = "Ingresando…";
  try {
    // La contraseña no se recorta con trim(): los espacios también cuentan.
    await iniciarSesion(formulario.elements.email.value.trim(), formulario.elements.password.value);
    location.href = "cuenta.html";
  } catch (error) {
    errorGeneral.textContent = error.message;
    boton.disabled = false;
    boton.textContent = "Ingresar";
  }
});

formulario.addEventListener("input", (evento) => {
  if (evento.target.closest(".campo")) mostrarError(evento.target, "");
});
