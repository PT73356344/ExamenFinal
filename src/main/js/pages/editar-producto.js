const React = require("react");
const { useState, useEffect } = require("react");
const { useParams, Link } = require("react-router-dom");
const client = require("../client");

const PageEditarProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState({});

    useEffect(() => {
        client({
            method: "GET",
            path: "/api/productos/" + id,
            headers: { "Content-Type": "application/json" },
        }).done((response) => {
            setProducto(response.entity);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        client({
            method: "PATCH",
            path: "/api/productos/" + id,
            headers: { "Content-Type": "application/json" },
            entity: producto,
        }).done(() => (window.location = "/"));
    };

    return (
        <>
            <h1>Editar producto: {id}</h1>

            <form onSubmit={handleSubmit}>
                <div className="textbox">
                    <input
                        type="text"
                        name="nombre"
                        value={producto.nombre}
                        onChange={(e) => {
                            setProducto({
                                ...producto,
                                nombre: e.target.value,
                            });
                        }}
                        autocomplete="off"
                        required
                    />
                    <label>Nombre</label>
                </div>
                <br />
                <div className="textbox">
                    <input
                        type="text"
                        name="precio"
                        value={producto.precio}
                        onChange={(e) => {
                            setProducto({
                                ...producto,
                                precio: e.target.value,
                            });
                        }}
                        autocomplete="off"
                        required
                    />
                    <label>Precio</label>
                </div>

                <br />

                <input
                    class="boton"
                    type="submit"
                    value={`Editar producto ${id}`}
                />
            </form>
            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = PageEditarProducto;
