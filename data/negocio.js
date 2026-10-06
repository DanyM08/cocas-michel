// DATOS DEL NEGOCIO: aquí se edita todo.
// - precio: null significa "por cotizar" (se muestra "Cotiza por WhatsApp")
// - galeria.src: ruta de la foto, por ejemplo "img/corte1.jpg"
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
    { src: "img/ExtensionesA1.jpeg", alt: "Extensiones" },
    { src: "img/ExtensionesD1.jpeg", alt: "Extensiones" },
    { src: "img/extencionesA.jpeg", alt: "Extensiones" },
    { src: "img/extencionesD.jpeg", alt: "Extensioness" },
    { src: "videos/Video1.mp4", alt: "Maquillaje" },
    { src: "", alt: "Decolorado" }
  ]
};