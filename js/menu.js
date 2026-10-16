// Menú desplegable: se abre con el botón de 3 rayas y se cierra de varias formas.
export function iniciarMenu() {
  const boton = document.getElementById("menu-boton");
  const menu = document.getElementById("menu");

  function mostrar(abrir) {
    menu.classList.toggle("abierto", abrir);
    boton.setAttribute("aria-expanded", abrir);
    boton.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
  }

  boton.addEventListener("click", () => mostrar(!menu.classList.contains("abierto")));

  // Al tocar una opción del menú, se cierra.
  menu.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) mostrar(false);
  });

  // También con Escape o tocando fuera del header.
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") mostrar(false);
  });
  document.addEventListener("click", (evento) => {
    if (!evento.target.closest("header")) mostrar(false);
  });
}
