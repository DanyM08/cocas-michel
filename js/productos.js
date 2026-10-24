// Página de productos: dibuja el catálogo. Si no hay productos, muestra el aviso "Pronto".
import { iniciarComun } from "./comun.js";
import { listarProductos } from "./api.js";
import { linkWhatsApp, formatoPrecio } from "./utilidades.js";

iniciarComun();

const grid = document.getElementById("productos-grid");
const vacio = document.getElementById("vacio");

function dibujar(productos) {
  if (!productos.length) {
    vacio.hidden = false;
    return;
  }

  productos.forEach((producto) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "producto";

    const precio = producto.precio === null || producto.precio === undefined
      ? "Cotiza por WhatsApp"
      : formatoPrecio(producto.precio);

    // textContent (no innerHTML) para que ningún dato del servidor pueda meter código en la página.
    if (producto.imagen) {
      const img = document.createElement("img");
      img.src = producto.imagen;
      img.alt = producto.nombre;
      img.loading = "lazy";
      img.decoding = "async";
      tarjeta.appendChild(img);
    }

    const cuerpo = document.createElement("div");
    cuerpo.className = "producto-cuerpo";

    const nombre = document.createElement("h2");
    nombre.textContent = producto.nombre;
    cuerpo.appendChild(nombre);

    if (producto.descripcion) {
      const descripcion = document.createElement("p");
      descripcion.textContent = producto.descripcion;
      cuerpo.appendChild(descripcion);
    }

    const pie = document.createElement("div");
    pie.className = "producto-pie";

    const etiqueta = document.createElement("span");
    etiqueta.className = "precio";
    etiqueta.textContent = precio;

    const pedir = document.createElement("a");
    pedir.className = "btn";
    pedir.textContent = "Pedir";
    pedir.href = linkWhatsApp(`Hola, quiero pedir: ${producto.nombre}.`);
    pedir.target = "_blank";
    pedir.rel = "noopener";

    pie.append(etiqueta, pedir);
    cuerpo.appendChild(pie);
    tarjeta.appendChild(cuerpo);
    grid.appendChild(tarjeta);
  });
}

listarProductos()
  .then(dibujar)
  .catch(() => {
    vacio.hidden = false;   // si el servidor falla, la página no queda en blanco
  });
