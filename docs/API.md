# Contrato de la API (frontend ↔ backend)

Lo que el frontend **ya espera** del servidor. Está implementado en `js/api.js`, que hoy funciona en modo
de prueba (`USAR_MOCK = true`, datos en el navegador). Para conectar el backend real:

1. En `js/api.js` poner `USAR_MOCK = false`.
2. Poner en `BASE_URL` la dirección del backend (por defecto `/api`, es decir, el mismo dominio).
3. Que el backend responda como se describe aquí. No hay que tocar ninguna página.

## Reglas generales

- Todo es JSON (`Content-Type: application/json`), en UTF-8.
- Los errores responden con el código HTTP que corresponda y un cuerpo `{ "error": "Mensaje para el usuario, en español" }`.
  El frontend muestra ese mensaje tal cual, así que debe ser claro y no revelar detalles internos.
- La sesión va en una **cookie `HttpOnly`, `Secure`, `SameSite=Lax`**. El frontend envía `credentials: "include"`.
  Si el frontend y el backend están en dominios distintos, el backend debe permitir CORS con
  `Access-Control-Allow-Credentials: true` y el origen exacto del sitio (nunca `*`).
- Las contraseñas llegan en texto plano **solo por HTTPS** y el backend las guarda con un hash lento
  (bcrypt o argon2), nunca en claro.
- **Todo se valida otra vez en el servidor.** Las validaciones del frontend son solo comodidad.
- Un usuario solo puede ver y cancelar **sus** citas.

## Objetos

```jsonc
// Usuario (nunca incluye contraseña ni hash)
{ "id": "…", "nombre": "Ana Pérez", "telefono": "3312345678", "email": "ana@correo.com" }

// Cita
{
  "id": "…",
  "servicio": "Puesta de extensiones",   // nombre del servicio
  "nombre": "Ana Pérez",
  "telefono": "3312345678",              // 10 dígitos, solo números
  "fecha": "2026-11-05",                 // AAAA-MM-DD
  "hora": "16:30",                       // HH:MM (24 h)
  "notas": "",                           // opcional, máximo 300 caracteres
  "estado": "pendiente",                 // "pendiente" | "confirmada" | "cancelada"
  "creada": "2026-10-24T18:00:00.000Z"
}

// Producto
{ "id": "…", "nombre": "Cabello natural 60 cm", "precio": 1500, "imagen": "img/…", "descripcion": "…" }
// "precio": null  →  el frontend muestra "Cotiza por WhatsApp"
```

## Rutas

| Método y ruta | Quién | Cuerpo que envía el frontend | Respuesta correcta |
|---|---|---|---|
| `POST /api/auth/registro` | público | `{ nombre, telefono, email, password, privacidadAceptada }` | `201` `{ "usuario": Usuario }` y **inicia sesión** (pone la cookie) |
| `POST /api/auth/login` | público | `{ email, password }` | `200` `{ "usuario": Usuario }` y pone la cookie |
| `POST /api/auth/logout` | con sesión | — | `200` `{}` y borra la cookie |
| `GET /api/auth/me` | con sesión | — | `200` `{ "usuario": Usuario }`; sin sesión `401` |
| `POST /api/citas` | público (con o sin sesión) | `{ nombre, telefono, servicio, fecha, hora, notas, privacidadAceptada, condicionesAceptadas }` | `201` `{ "cita": Cita }`. Si hay sesión, la cita queda ligada al usuario |
| `GET /api/citas/mias` | con sesión | — | `200` `{ "citas": [Cita] }`, de la más reciente a la más antigua |
| `DELETE /api/citas/:id` | con sesión | — | `200` `{ "cita": Cita }` con `estado: "cancelada"` (no se borra el registro) |
| `GET /api/productos` | público | — | `200` `{ "productos": [Producto] }` |

### Errores que el frontend espera

| Caso | Código | Ejemplo de `error` |
|---|---|---|
| Datos inválidos | `400` | `"El teléfono debe tener 10 dígitos."` |
| Correo ya registrado | `409` | `"Ya existe una cuenta con ese correo."` |
| Correo o contraseña mal | `401` | `"Correo o contraseña incorrectos."` (el mismo mensaje en ambos casos) |
| Sin sesión | `401` | `"Inicia sesión para continuar."` |
| Cita de otro usuario / no existe | `404` | `"No se encontró la cita."` |

## Pendiente de decidir con el backend

- **Datos que hoy viven en `data/negocio.js`** (servicios, precios, horarios, productos): ahora se editan
  en ese archivo. Si se mueven a base de datos, se crean `GET /api/servicios`, etc., y `api.js` las llama.
- **Confirmación de citas** por parte del salón (cambiar `pendiente` → `confirmada`): requiere un rol de
  administrador y su propia pantalla. El frontend actual solo muestra el estado.
- **Recuperar contraseña** y **verificación de correo**: no existen todavía en el frontend.
- **Aviso de privacidad**: ya está publicado en `privacidad.html` (versión del 24 de octubre de 2026) y el
  registro y las citas exigen aceptarlo. El frontend envía `privacidadAceptada: true`; el backend debe
  **rechazar** (`400`) si falta o es `false`, y **guardar la fecha y la versión del aviso** aceptado como
  constancia. Si cambia el aviso (por ejemplo, para enviar promociones), hay que actualizar la página, subir
  la versión y pedir un consentimiento nuevo y separado para ese uso. Conviene que lo revise un profesional.
- **Condiciones del servicio**: están en `condiciones.html` (versión del 24 de octubre de 2026). Al agendar, el
  frontend envía `condicionesAceptadas: true`; el backend debe rechazar si falta y guardar fecha y versión
  aceptadas, igual que con el aviso de privacidad.
- **Derechos ARCO**: el aviso dice que se atienden por correo (Jorgecastellanos244@gmail.com). El backend debe
  poder **consultar, corregir y eliminar** los datos de un usuario cuando se solicite.
- **Límite de intentos** en login/registro y protección contra bots: del lado del servidor.
