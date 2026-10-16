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
    { tipo: "imagen", src: "img/cabello-natural-1.jpg", alt: "Cabello natural para extensiones", categoria: "Extensiones" }
  ]
};