export async function listaProductos() {
    const conexion = await fetch("https://fake-api-ashen-phi.vercel.app/productos", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });

    if (!conexion.ok) {
        throw new Error("No se pudo obtener la lista de productos");
    }

    const productos = await conexion.json();
    return productos;
}

export async function crearProducto(nombre, imagen, precio) {
    const conexion = await fetch("https://fake-api-ashen-phi.vercel.app/productos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            imagen: imagen,
            precio: precio
        })
    });

    if (!conexion.ok) {
        throw new Error("No fue posible enviar el producto");
    }

    const productoCreado = await conexion.json();
    return productoCreado;
}

export async function eliminarProducto(id) {
    const conexion = await fetch(`https://fake-api-ashen-phi.vercel.app/productos${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!conexion.ok) {
        throw new Error("No fue posible eliminar el producto");
    }

    const resultado = await conexion.json();
    return resultado;
}
