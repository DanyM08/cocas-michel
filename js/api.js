// Capa de comunicación con el servidor.
// Todas las páginas hablan con el servidor SOLO a través de este archivo.
//
// Mientras USAR_MOCK sea true, los datos se guardan en el navegador (localStorage) y todo funciona
// sin backend, solo para PROBAR. No es seguro ni compartido entre dispositivos.
// Cuando el backend exista: USAR_MOCK = false y BASE_URL con su dirección.
// Las rutas, lo que se envía y lo que se espera de vuelta están en docs/API.md.
import { NEGOCIO } from "../data/negocio.js";

const CONFIG = {
  USAR_MOCK: true,
  BASE_URL: "/api"
};

/* ---------- Modo real: habla con el backend ---------- */

async function peticion(ruta, { metodo = "GET", cuerpo } = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`${CONFIG.BASE_URL}${ruta}`, {
      method: metodo,
      headers: cuerpo ? { "Content-Type": "application/json" } : {},
      credentials: "include",   // envía la cookie de sesión
      body: cuerpo ? JSON.stringify(cuerpo) : undefined
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. Revisa tu internet e intenta de nuevo.");
  }
  const datos = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) throw new Error(datos.error || "Ocurrió un error. Intenta de nuevo.");
  return datos;
}

/* ---------- Modo de prueba: todo en localStorage ---------- */

function leer(clave, porDefecto) {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? porDefecto;
  } catch {
    return porDefecto;
  }
}

function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    throw new Error("Tu navegador no permite guardar datos. Desactiva el modo privado e intenta de nuevo.");
  }
}

async function cifrar(texto) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const sinClave = ({ hash, ...usuario }) => usuario;

function usuarioActual() {
  const id = leer("cm_sesion", null);
  return leer("cm_usuarios", []).find((u) => u.id === id) || null;
}

const mock = {
  async registrar({ nombre, telefono, email, password }) {
    const usuarios = leer("cm_usuarios", []);
    const correo = email.toLowerCase();
    if (usuarios.some((u) => u.email === correo)) throw new Error("Ya existe una cuenta con ese correo.");

    const usuario = { id: crypto.randomUUID(), nombre, telefono, email: correo, hash: await cifrar(password) };
    guardar("cm_usuarios", [...usuarios, usuario]);
    guardar("cm_sesion", usuario.id);
    return sinClave(usuario);
  },

  async iniciarSesion(email, password) {
    const hash = await cifrar(password);
    const usuario = leer("cm_usuarios", []).find((u) => u.email === email.toLowerCase() && u.hash === hash);
    if (!usuario) throw new Error("Correo o contraseña incorrectos.");
    guardar("cm_sesion", usuario.id);
    return sinClave(usuario);
  },

  async cerrarSesion() {
    try { localStorage.removeItem("cm_sesion"); } catch { /* sin almacenamiento: nada que borrar */ }
  },

  async obtenerSesion() {
    const usuario = usuarioActual();
    return usuario ? sinClave(usuario) : null;
  },

  // Se puede agendar sin cuenta; si hay sesión, la cita queda ligada al usuario.
  async crearCita(datos) {
    const cita = {
      id: crypto.randomUUID(),
      usuarioId: usuarioActual()?.id ?? null,
      ...datos,
      estado: "pendiente",
      creada: new Date().toISOString()
    };
    guardar("cm_citas", [...leer("cm_citas", []), cita]);
    return cita;
  },

  async misCitas() {
    const usuario = usuarioActual();
    if (!usuario) throw new Error("Inicia sesión para ver tus citas.");
    return leer("cm_citas", [])
      .filter((c) => c.usuarioId === usuario.id)
      .sort((a, b) => `${b.fecha} ${b.hora}`.localeCompare(`${a.fecha} ${a.hora}`));
  },

  async cancelarCita(id) {
    const usuario = usuarioActual();
    const citas = leer("cm_citas", []);
    const cita = citas.find((c) => c.id === id && c.usuarioId === usuario?.id);
    if (!cita) throw new Error("No se encontró la cita.");
    cita.estado = "cancelada";
    guardar("cm_citas", citas);
    return cita;
  },

  async listarProductos() {
    return NEGOCIO.productos;
  }
};

/* ---------- Funciones que usan las páginas ---------- */

const usar = CONFIG.USAR_MOCK;

export const registrar = (datos) =>
  usar ? mock.registrar(datos) : peticion("/auth/registro", { metodo: "POST", cuerpo: datos }).then((r) => r.usuario);

export const iniciarSesion = (email, password) =>
  usar ? mock.iniciarSesion(email, password) : peticion("/auth/login", { metodo: "POST", cuerpo: { email, password } }).then((r) => r.usuario);

export const cerrarSesion = () =>
  usar ? mock.cerrarSesion() : peticion("/auth/logout", { metodo: "POST" });

// Devuelve el usuario con sesión iniciada, o null si no hay.
export const obtenerSesion = () =>
  usar ? mock.obtenerSesion() : peticion("/auth/me").then((r) => r.usuario).catch(() => null);

export const crearCita = (datos) =>
  usar ? mock.crearCita(datos) : peticion("/citas", { metodo: "POST", cuerpo: datos }).then((r) => r.cita);

export const misCitas = () =>
  usar ? mock.misCitas() : peticion("/citas/mias").then((r) => r.citas);

export const cancelarCita = (id) =>
  usar ? mock.cancelarCita(id) : peticion(`/citas/${encodeURIComponent(id)}`, { metodo: "DELETE" }).then((r) => r.cita);

export const listarProductos = () =>
  usar ? mock.listarProductos() : peticion("/productos").then((r) => r.productos);
