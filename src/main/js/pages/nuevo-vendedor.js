const React = require("react");
const client = require("../client");
const { Link } = require("react-router-dom");
const { useState } = require("react");

const PageNuevoVendedor = () => {
    const [nombre, setNombre] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: "POST",
            path: "/api/vendedores",
            entity: { nombre: nombre },
            headers: { "Content-Type": "application/json" },
        }).done(() => {
            window.location = "/";
        });
    };

    return (
        <>
            <h1>Nuevo Vendedor</h1>
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
                    <label>Nombre</label>
                </div>
                <input class="boton" type="submit" value="Nuevo Vendedor" />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = PageNuevoVendedor;
