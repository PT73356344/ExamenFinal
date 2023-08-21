const React = require("react");
const client = require("../client");
const { Link } = require("react-router-dom");
const { useState } = require("react");

const PageNuevaVenta = () => {
    const [nroventa, setNroventa] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: "POST",
            path: "/api/ventas",
            entity: { nroventa: nroventa },
            headers: { "Content-Type": "application/json" },
        }).done(() => {
            window.location = "/";
        });
    };

    return (
        <>
            <h1>Nueva Venta</h1>
            <form onSubmit={handleSubmit}>
                <div className="textbox">
                    <input
                        type="text"
                        id="nroventa"
                        name="nroventa"
                        onChange={(e) => setNroventa(e.target.value)}
                        autocomplete="off"
                        required
                    />
                    <label>Venta</label>
                </div>
                <input class="boton" type="submit" value="Nueva Venta" />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = PageNuevaVenta;
