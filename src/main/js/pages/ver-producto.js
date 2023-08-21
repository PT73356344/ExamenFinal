const React = require("react");
const client = require("../client");
const { Link, useParams } = require("react-router-dom");
const { useState } = require("react");

const PageVerProducto = (props) => {
    // const id = props.match.params.id;
    const { id } = useParams();
    const [producto, setProducto] = useState({});

    client({
        method: "GET",
        path: "/api/productos/" + id,
    }).done((response) => {
        setProducto(response.entity);
        // console.log(response.entity);
    });

    return (
        <>
            <h1>Ver Producto</h1>
            <table>
                <tr>
                    <th>Nombre</th>
                    <td>{producto.nombre}</td>
                </tr>
                <tr>
                    <th>Precio</th>
                    <td>{producto.precio}</td>
                </tr>
            </table>
            <Link to="/">Volver</Link> |{" "}
            <Link to={`/editar-producto/${id}`}>Editar</Link>
        </>
    );
};

module.exports = PageVerProducto;
