// DATOS DEL NEGOCIO: aquí se edita todo.
// - precio: null significa "por cotizar" (se muestra "Cotiza por WhatsApp")
// - galeria.src: ruta de la foto, por ejemplo "img/corte1.jpg" (nombres en minúsculas y sin espacios)
// - galeria.tipo: "imagen" o "video"
export const NEGOCIO = {
  whatsapp: "523328298221",
  servicios: [
    { nombre: "Corte de pelo para hombre", precio: 100 },
    { nombre: "Puesta de extensiones", precio: 5000 },
    { nombre: "Decolorante", precio: 2000 },
    { nombre: "Pintado de pelo", precio: 3000 },
    { nombre: "Peinados", precio: 500 },
    { nombre: "Maquillaje", precio: 1000 }
  ],
  galeria: [
    { tipo: "imagen", src: "img/extensiones-antes-2.jpeg", alt: "Extensiones: antes" , categoria: "Extensiones"},
    { tipo: "imagen", src: "img/extensiones-despues-2.jpeg", alt: "Extensiones: después" , categoria: "Extensiones"},
    { tipo: "imagen", src: "img/extensiones-antes-1.jpeg", alt: "Extensiones: antes" , categoria: "Extensiones"},
    { tipo: "imagen", src: "img/extensiones-despues-1.jpeg", alt: "Extensiones: después" , categoria: "Corte de hombre"},
    { tipo: "video", src: "videos/extensiones-video-1.mp4", alt: "Video de puesta de extensiones" , categoria: "Corte de mujer"}
  ]
};