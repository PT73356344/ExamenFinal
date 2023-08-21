const React = require("react");
const client = require("../client");
const { Link } = require("react-router-dom");
const { useState } = require("react");

const PageNuevoProducto = () => {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: "POST",
            path: "/api/productos",
            entity: {
                nombre: nombre,
                precio: precio,
            },
            headers: { "Content-Type": "application/json" },
        }).done(() => {
            window.location = "/";
        });
    };

    return (
        <>
            <h1>Nuevo Producto</h1>
            <form onSubmit={handleSubmit}>
                <div className="textbox">
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        autocomplete="off"
                        required
                    />
                    <label htmlFor="nombre">Nombre</label>
                </div>
                <br />
                <div className="textbox">
                    <input
                        type="text"
                        id="precio"
                        name="precio"
                        onChange={(e) => setPrecio(e.target.value)}
                        autocomplete="off"
                        required
                    />
                    <label htmlFor="precio">Precio</label>
                </div>

                <br />
                <br />
                <input class="boton" type="submit" value="Nuevo Producto" />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = PageNuevoProducto;
