const React = require("react");
const { useState, useEffect } = require("react");
const { useParams, Link } = require("react-router-dom");
const client = require("../client");

const PageEditarVendedor = () => {
    const { id } = useParams();
    const [vendedor, setVendedor] = useState({});

    useEffect(() => {
        client({
            method: "GET",
            path: "/api/vendedores/" + id,
            headers: { "Content-Type": "application/json" },
        }).done((response) => {
            setVendedor(response.entity);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        client({
            method: "PATCH",
            path: "/api/vendedores/" + id,
            headers: { "Content-Type": "application/json" },
            entity: vendedor,
        }).done(() => (window.location = "/"));
    };

    return (
        <>
            <h1>Editar Vendedor: {id}</h1>

            <form onSubmit={handleSubmit}>
                <div className="textbox">
                    <input
                        type="text"
                        name="nombre"
                        value={vendedor.nombre}
                        onChange={(e) => {
                            setVendedor({
                                ...vendedor,
                                nombre: e.target.value,
                            });
                        }}
                        autocomplete="off"
                        required
                    />
                    <label>Nombre</label>
                </div>

                <input
                    class="boton"
                    type="submit"
                    value={`Editar Vendedor ${id}`}
                />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = PageEditarVendedor;
