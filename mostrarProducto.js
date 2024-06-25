import { listaProductos, crearProducto, eliminarProducto } from "./conectaAPI.js";

const form = document.querySelector("[data-form]");
const lista = document.querySelector("[data-lista]");

// Función para construir una tarjeta de producto
function construyeCard(nombre, imagen, precio, id) {
    const producto = document.createElement("li");
    producto.className = "producto__item";

    producto.innerHTML = `
        <div class="imagen-producto">
            <img src="${imagen}" alt="${nombre}">
        </div>
        <div class="descripcion-producto">
            <h3>${nombre}</h3>
            <p>Precio: $${precio}</p>
        </div>
        <button class="eliminar-producto" data-id="${id}">Eliminar Producto</button>`;

    return producto;
}

// Función para mostrar la lista de productos
async function mostrarProductos() {
    try {
        const productos = await listaProductos();
        lista.innerHTML = ""; // Limpiar lista antes de agregar nuevos productos

        productos.forEach(producto => {
            lista.appendChild(construyeCard(producto.nombre, producto.imagen, producto.precio, producto.id));
        });
    } catch (error) {
        lista.innerHTML = `<h2 class="mensaje__titulo">No fue posible cargar la lista de productos</h2>`;
        console.error("Error al cargar productos:", error);
    }
}

// Función para limpiar inputs
function limpiarFormulario() {
    form.reset();
}

// Manejo del evento de envío del formulario para agregar productos
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nombre = document.querySelector("[data-name]").value;
    const precio = document.querySelector("[data-price]").value;
    const imagen = document.querySelector("[data-image]").value;

    try {
        const nuevoProducto = await crearProducto(nombre, imagen, precio);
        console.log("Producto creado:", nuevoProducto);

        // Limpiar el formulario
        limpiarFormulario();

        // Actualizar la lista de productos después de agregar uno nuevo
        mostrarProductos();
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }
});

// Manejo del evento de clic en el botón "Eliminar Producto"
lista.addEventListener("click", async (event) => {
    if (event.target.classList.contains("eliminar-producto")) {
        const id = event.target.dataset.id;

        try {
            await eliminarProducto(id);
            console.log("Producto eliminado:", id);

            // Actualizar la lista de productos después de eliminar uno
            mostrarProductos();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }
});

// Mostrar la lista de productos al cargar la página
mostrarProductos();

