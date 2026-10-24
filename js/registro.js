// Página "Crear cuenta".
import { iniciarComun } from "./comun.js";
import { registrar, obtenerSesion } from "./api.js";
import { validarFormulario, mostrarError, esEmail, esTelefono, soloDigitos, obligatorio, minimo } from "./validacion.js";

iniciarComun();

const formulario = document.getElementById("formulario-registro");
const errorGeneral = document.getElementById("error-general");
const boton = document.getElementById("enviar");

obtenerSesion()
  .then((usuario) => { if (usuario) location.replace("cuenta.html"); })
  .catch(() => {});

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  errorGeneral.textContent = "";

  const valido = validarFormulario(formulario, {
    nombre: [obligatorio("Escribe tu nombre."), minimo(2, "El nombre es muy corto.")],
    telefono: [obligatorio("Escribe tu teléfono."), (v) => (esTelefono(v) ? "" : "Debe tener 10 dígitos.")],
    email: [obligatorio("Escribe tu correo."), (v) => (esEmail(v) ? "" : "Ese correo no parece válido.")],
    password: [obligatorio("Crea una contraseña."), minimo(8, "Debe tener al menos 8 caracteres.")],
    confirmar: [
      obligatorio("Repite la contraseña."),
      (v) => (v === formulario.elements.password.value.trim() ? "" : "Las contraseñas no coinciden.")
    ],
    privacidad: [obligatorio("Para crear tu cuenta, acepta el aviso de privacidad.")]
  });
  if (!valido) return;

  boton.disabled = true;
  boton.textContent = "Creando cuenta…";
  try {
    await registrar({
      nombre: formulario.elements.nombre.value.trim(),
      telefono: soloDigitos(formulario.elements.telefono.value),
      email: formulario.elements.email.value.trim(),
      password: formulario.elements.password.value,
      privacidadAceptada: true
    });
    location.href = "cuenta.html";
  } catch (error) {
    errorGeneral.textContent = error.message;
    boton.disabled = false;
    boton.textContent = "Crear cuenta";
  }
});

formulario.addEventListener("input", (evento) => {
  if (evento.target.closest(".campo")) mostrarError(evento.target, "");
});
