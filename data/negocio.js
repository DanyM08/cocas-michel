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
    { src: "", alt: "Trabajo de corte" },
    { src: "", alt: "Trabajo de color" },
    { src: "", alt: "Extensiones" },
    { src: "", alt: "Peinado" },
    { src: "", alt: "Maquillaje" },
    { src: "", alt: "Decolorado" }
  ]
};