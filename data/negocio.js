// DATOS DEL NEGOCIO: aquí se edita todo.
// - precio: null significa "por cotizar" (se muestra "Cotiza por WhatsApp")
// - galeria.src: ruta de la foto, por ejemplo "img/corte1.jpg" (nombres en minúsculas y sin espacios)
// - galeria.tipo: "imagen" o "video"
export const NEGOCIO = {
  whatsapp: "523328298221",
  servicios: [
    { nombre: "Corte de pelo para hombre", precio: 100 },
    { nombre: "Puesta de extensiones", precio: null },
    { nombre: "Decolorante", precio: null },
    { nombre: "Pintado de pelo", precio: null },
    { nombre: "Peinados", precio: null },
    { nombre: "Maquillaje", precio: null }
  ],
  galeria: [
    { tipo: "imagen", src: "img/extensiones-antes-2.jpeg", alt: "Extensiones: antes" },
    { tipo: "imagen", src: "img/extensiones-despues-2.jpeg", alt: "Extensiones: después" },
    { tipo: "imagen", src: "img/extensiones-antes-1.jpeg", alt: "Extensiones: antes" },
    { tipo: "imagen", src: "img/extensiones-despues-1.jpeg", alt: "Extensiones: después" },
    { tipo: "video", src: "videos/extensiones-video-1.mp4", alt: "Video de puesta de extensiones" }
  ]
};