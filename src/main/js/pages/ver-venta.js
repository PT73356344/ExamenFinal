const React = require("react");
const client = require("../client");
const { Link, useParams } = require("react-router-dom");
const { useState, useEffect } = require("react");

const PageVerVenta = () => {
    let { id } = useParams();
    const [venta, setVenta] = useState({});
    const [ventasdetalles, setVentasdetalles] = useState([]);

    const [productos, setProductos] = useState([]);
    const [idProducto, setIdProducto] = useState("");
    const [cantidad, setCantidad] = useState("");

    const handleSubmit = (evento) => {
        evento.preventDefault();

        const parsedCantidad = parseInt(cantidad, 10);
        const selectedProductId = idProducto;
        const selectedProduct = productos.find(
            (producto) => producto.value[0] === selectedProductId
        );

        const importe = selectedProduct.precio * parsedCantidad;

        client({
            method: "POST",
            path: "/api/ventasdetalles",
            entity: {
                venta: "http://localhost:8080/api/ventas/" + id,
                producto: "http://localhost:8080/api/productos/" + idProducto,
                cantidad: parsedCantidad,
                importe: importe,
            },
            headers: { "Content-Type": "application/json" },
        }).done(() => {
            window.location = "/";
        });
    };

    useEffect(() => {
        url_venta = "/api/ventas/" + id;

        client({
            method: "GET",
            path: url_venta + "/ventadatos",
        }).done((response) => setVenta(response.entity));

        client({
            method: "GET",
            path: url_venta + "/ventaDetalle",
        }).done((response) => setVentasdetalles(response.entity));

        client({
            method: "GET",
            path: "/api/productos",
        }).done((response) => {
            let productos2 = [];
            response.entity._embedded.productos.map((producto) => {
                productos2.push({
                    value: producto._links.self.href.split("/").slice(-1),
                    label: producto.nombre,
                    precio: producto.precio,
                });
            });
            setProductos(productos2);
        });
    }, []);

    return (
        <>
            <h1>Venta</h1>
            <table border="1">
                <tbody>
                    <tr>
                        <th>Nro de Venta:</th>
                        <td>{venta.ID}</td>
                    </tr>
                </tbody>
            </table>

            <fieldset>
                <legend>Productos</legend>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <table align="center" cellPadding="5">
                        <tbody>
                            <tr>
                                <th>Nombre:</th>
                                <td>
                                    <select
                                        name="producto"
                                        id="producto"
                                        onChange={(e) => {
                                            setIdProducto(e.target.value);
                                        }}
                                    >
                                        <option value="">Seleccione:</option>
                                        {productos.map((producto) => {
                                            return (
                                                <option
                                                    key={producto.value}
                                                    value={producto.value}
                                                >
                                                    {producto.label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Cantidad:</th>
                                <td>
                                    <input
                                        id="cantidad"
                                        type="number"
                                        name="cantidad"
                                        required
                                        autoComplete="off"
                                        maxLength="10"
                                        size="20"
                                        onChange={(e) => {
                                            setCantidad(e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input
                                        type="submit"
                                        name="btnaceptar"
                                        value="Añadir"
                                        class="botonsito"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </fieldset>

            <hr />
            
            <fieldset>
                <legend>Items</legend>
                <table border="1">
                    <thead>
                        <tr>
                            <th>PRODUCTO</th>
                            <th>PRECIO</th>
                            <th>CANTIDAD</th>
                            <th>IMPORTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasdetalles.map((ventadetalle) => {
                            return (
                                <tr key={ventadetalle.ID}>
                                    <td>{ventadetalle.PRODUCTO}</td>
                                    <td>{ventadetalle.PRECIO}</td>
                                    <td>{ventadetalle.CANTIDAD}</td>
                                    <td>{ventadetalle.IMPORTE}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </fieldset>
            
            <br />

            <fieldset>
                <legend>Total a Pagar</legend>
                <table border="1">
                    <tbody>
                        <tr>
                            <th>Importe:</th>
                            <td>{venta.IMPORTE}</td>
                        </tr>
                        <tr>
                            <th>IGV:</th>
                            <td>{venta.IGV}</td>
                        </tr>
                        <tr>
                            <th>Total:</th>
                            <td>{venta.TOTAL}</td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>

            <hr />

            <Link to="/">Volver</Link>
        </>
    );
};

module.exports = PageVerVenta;
