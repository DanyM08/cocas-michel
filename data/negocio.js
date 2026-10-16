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
    { tipo: "imagen", src: "img/extensiones-despues-1.jpeg", alt: "Extensiones: después", categoria: "Extensiones" },
    { tipo: "video", src: "videos/extensiones-video-1.mp4", alt: "Video de puesta de extensiones", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-antes-3.jpg", alt: "Extensiones: antes", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-despues-3.jpg", alt: "Extensiones: después", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-antes-4.jpg", alt: "Extensiones: antes", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/extensiones-despues-4.jpg", alt: "Extensiones: después", categoria: "Extensiones" },
    { tipo: "imagen", src: "img/color-antes-1.jpg", alt: "Color: antes", categoria: "Color" },
    { tipo: "imagen", src: "img/color-despues-1.jpg", alt: "Color: después", categoria: "Color" },
    { tipo: "imagen", src: "img/corte-1.jpg", alt: "Corte en capas con color cobrizo", categoria: "Cortes" },
    { tipo: "imagen", src: "img/pelo-natural-1.jpg", alt: "Pelo natural disponible", categoria: "Pelo" }
  ]
};