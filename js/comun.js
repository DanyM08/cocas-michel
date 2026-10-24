// Lo que necesitan TODAS las páginas: encabezado, pie, menú y botones de WhatsApp.
import { linkWhatsApp } from "./utilidades.js";
import { montarLayout } from "./layout.js";
import { iniciarMenu } from "./menu.js";

export function iniciarComun() {
  montarLayout();
  iniciarMenu();

  // Botones de WhatsApp: toman su mensaje del atributo data-whatsapp.
  document.querySelectorAll("[data-whatsapp]").forEach((boton) => {
    boton.href = linkWhatsApp(boton.dataset.whatsapp);
    boton.target = "_blank";
    boton.rel = "noopener";
  });
}
