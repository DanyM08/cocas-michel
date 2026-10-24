// DATOS DEL NEGOCIO: aquí se edita todo.
// - precio: null significa "por cotizar" (se muestra "Cotiza por WhatsApp")
// - galeria.src: ruta de la foto, por ejemplo "img/corte1.jpg" (nombres en minúsculas y sin espacios)
// - galeria.tipo: "imagen" o "video"
export const NEGOCIO = {
  whatsapp: "523328298221",
  // Redes sociales: si dejas "" el botón no aparece en la página.
  redes: {
    instagram: "https://www.instagram.com/p/C_UFth7M7fJ/",
    tiktok: "",
    facebook: ""
  },
  // Ubicación: "enlace" abre Google Maps (botón "Cómo llegar") y "mapa" es el mapa que se ve en la página.
  ubicacion: {
    direccion: "Av. Plutarco Elías Calles 2331, Colonia Oblatos, 44700 Guadalajara, Jal.",
    enlace: "https://maps.app.goo.gl/XE54WARa9TNhmxrg9",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d329.89771230757907!2d-103.28809604302073!3d20.695334758967146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b13fc0494381%3A0xcee8cc269152436e!2sEstetica%20Coca's%20Michel!5e0!3m2!1ses-419!2smx!4v1792119631947!5m2!1ses-419!2smx"
  },
  // Horarios: si la lista está vacía, no se muestra nada. Ejemplo:
  //   { dia: "Lunes a sábado", horas: "10:00 a 19:00" }
  horarios: [],
  // Productos de la tienda (página productos.html). Si está vacía, se muestra "Pronto". Ejemplo:
  //   { nombre: "Cabello natural 60 cm", precio: 1500, imagen: "img/cabello-natural-1.jpg", descripcion: "Cabello 100% natural, de humano." }
  productos: [],
  servicios: [
    { nombre: "Corte de cabello para hombre", precio: 100 },
    { nombre: "Puesta de extensiones", precio: 5000 },
    { nombre: "Decolorante", precio: 2000 },
    { nombre: "Pintado de cabello", precio: 3000 },
    { nombre: "Peinados", precio: 500 },
    { nombre: "Maquillaje", precio: 1000 }
  ],
  galeria: [
    { tipo: "imagen", src: "img/extensiones-antes-2.jpeg", alt: "Cabello antes de las extensiones", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-despues-2.jpeg", alt: "Extensiones ya puestas", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-antes-1.jpeg", alt: "Cabello antes de las extensiones", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-despues-1.jpeg", alt: "Extensiones ya puestas", categoria: "Extensiones" },
    { tipo: "video", src: "videos/extensiones-video-1.mp4", alt: "Proceso de puesta de extensiones", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-antes-3.jpg", alt: "Cabello antes de las extensiones", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-despues-3.jpg", alt: "Extensiones ya puestas", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-antes-4.jpg", alt: "Cabello antes de las extensiones", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-despues-4.jpg", alt: "Extensiones ya puestas", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-antes-5.jpg", alt: "Cabello antes de las extensiones", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-despues-5.jpg", alt: "Extensiones ya puestas", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-antes-6.jpg", alt: "Cabello antes de las extensiones", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/cabello-natural-1.jpg", alt: "Cabello 100% natural, de humano", categoria: "Cabello" }
  ]
};