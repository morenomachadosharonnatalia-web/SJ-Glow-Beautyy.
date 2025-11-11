function irInstagram() {
  window.location = "https://www.instagram.com/";
}

function irYoutube() {
  window.location = "https://www.youtube.com/";
}

document.addEventListener("DOMContentLoaded", function () {
  const botonesAgregar = document.querySelectorAll(".producto button");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  const vaciarBtn = document.getElementById("vaciar");
  const confirmarBtn = document.getElementById("confirmarCompra");
  const mensajeCompra = document.getElementById("mensajeCompra");

  let carrito = [];

  // 🔹 Agregar productos
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const producto = boton.parentElement;
      const nombre = producto.querySelector("h3").textContent;
      const precioTexto = producto.querySelector("p:nth-of-type(2)").textContent;
      const precio = parseInt(precioTexto.replace("$", "").replace(".", ""));

      carrito.push({ nombre, precio });
      actualizarCarrito();
    });
  });

  // 🔹 Actualizar lista y total
  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
      total += item.precio;

      const div = document.createElement("div");
      div.classList.add("item-carrito");
      div.innerHTML = `
        <span>${item.nombre} - $${item.precio.toLocaleString()}</span>
        <button data-index="${index}">Eliminar</button>
      `;
      listaCarrito.appendChild(div);
    });

    totalElemento.textContent = `Total: $${total.toLocaleString()}`;
  }

  // 🔹 Eliminar un producto
  listaCarrito.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.getAttribute("data-index");
      carrito.splice(index, 1);
      actualizarCarrito();
    }
  });

  // 🔹 Vaciar carrito
  vaciarBtn.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
    mensajeCompra.textContent = "";
  });

  // 🔹 Confirmar compra
  confirmarBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      mensajeCompra.textContent = "🛒 Tu carrito está vacío.";
      mensajeCompra.style.color = "red";
      return;
    }

    let total = carrito.reduce((sum, item) => sum + item.precio, 0);
    mensajeCompra.textContent = `💖 ¡Gracias por tu compra! Total: $${total.toLocaleString()}`;
    mensajeCompra.style.color = "#7a007a";

    carrito = [];
    actualizarCarrito();
  });
});
