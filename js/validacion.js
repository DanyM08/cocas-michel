// Validación de formularios: revisa los campos y muestra el error debajo de cada uno.

export const esEmail = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);

// Teléfono de 10 dígitos (acepta espacios, guiones o paréntesis al escribirlo).
export const soloDigitos = (valor) => valor.replace(/\D/g, "");
export const esTelefono = (valor) => soloDigitos(valor).length === 10;

// reglas = { idDelCampo: [ (valor) => "mensaje de error" o "" , ... ] }
// Devuelve true si todo está bien. Si no, marca los campos con error y enfoca el primero.
export function validarFormulario(formulario, reglas) {
  let primerError = null;

  Object.entries(reglas).forEach(([id, comprobaciones]) => {
    const campo = formulario.elements[id];
    // En una casilla (checkbox) el "valor" es si está marcada o no.
    const valor = campo.type === "checkbox" ? (campo.checked ? "si" : "") : campo.value.trim();
    const mensaje = comprobaciones.map((revisar) => revisar(valor)).find(Boolean) || "";
    mostrarError(campo, mensaje);
    if (mensaje && !primerError) primerError = campo;
  });

  primerError?.focus();
  return !primerError;
}

export function mostrarError(campo, mensaje) {
  const aviso = campo.closest(".campo").querySelector(".error");
  aviso.textContent = mensaje;
  campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
}

// Reglas reutilizables
export const obligatorio = (mensaje) => (valor) => (valor ? "" : mensaje);
export const minimo = (largo, mensaje) => (valor) => (valor.length >= largo ? "" : mensaje);
