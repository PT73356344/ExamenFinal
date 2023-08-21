const React = require("react");
const client = require("../client");
const { Link } = require("react-router-dom");

class PageHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vendedores: [],
            productos: [],
            ventas: [],
        };
    }
    componentDidMount() {
        client({ method: "GET", path: "/api/vendedores" }).done((response) => {
            this.setState({ vendedores: response.entity._embedded.vendedores });
        });
        client({ method: "GET", path: "/api/productos" }).done((response) => {
            this.setState({ productos: response.entity._embedded.productos });
        });
        client({ method: "GET", path: "/api/ventas" }).done((response) => {
            this.setState({ ventas: response.entity._embedded.ventas });
        });
    }
    render() {
        return (
            <>
                <h1>EVC4</h1>

                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ width: "calc(100% / 3)" }}>
                        <Titulo entidad="Vendedores" emoji="👨‍💼" />
                        <VendedorList vendedores={this.state.vendedores} />
                        <Link to="/nuevo-vendedor">Nuevo Vendedor</Link>
                    </div>
                    <div style={{ width: "calc(100% / 3)" }}>
                        <Titulo entidad="Productos" emoji="🛍️" />
                        <ProductoList productos={this.state.productos} />
                        <Link to="/nuevo-producto">Nuevo Producto</Link>
                    </div>
                    <div style={{ width: "calc(100% / 3)" }}>
                        <Titulo entidad="Ventas" emoji="🏷️" />
                        <VentaList ventas={this.state.ventas} />
                        <Link to="/nueva-venta">Nueva Venta</Link>
                    </div>
                </div>
            </>
        );
    }
}

const Titulo = (props) => {
    return (
        <>
            <hr />
            <h2>
                {props.emoji} - {props.entidad}
            </h2>
            <span>Listado de {props.entidad.toLowerCase()}:</span>
            <hr />
        </>
    );
};

class VendedorList extends React.Component {
    render() {
        const vendedores = this.props.vendedores.map((vendedor) => (
            <Vendedor key={vendedor._links.self.href} vendedor={vendedor} />
        ));
        return (
            <table border="1">
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                    {vendedores}
                </tbody>
            </table>
        );
    }
}

class ProductoList extends React.Component {
    render() {
        const productos = this.props.productos.map((producto) => (
            <Producto key={producto._links.self.href} producto={producto} />
        ));
        return (
            <table border="1">
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                    {productos}
                </tbody>
            </table>
        );
    }
}

class VentaList extends React.Component {
    render() {
        let numeroVenta = 1;

        const ventas = this.props.ventas.map((venta) => (
            <Venta key={venta._links.self.href} venta={venta} />
        ));
        return (
            <table border="1">
                <tbody>
                    <tr>
                        <th>Nro de Venta</th>
                        <th>Acciones</th>
                    </tr>
                    {ventas}
                </tbody>
            </table>
        );
    }
}

class Vendedor extends React.Component {
    render() {
        const id = this.props.vendedor._links.self.href.split("/").slice(-1);
        return (
            <tr>
                <td>{this.props.vendedor.nombre}</td>
                <td>
                    <Link to={`/editar-vendedor/${id}`}>Actualizar</Link>
                </td>
            </tr>
        );
    }
}

class Producto extends React.Component {
    render() {
        const id = this.props.producto._links.self.href.split("/").slice(-1);
        return (
            <tr>
                <td>{this.props.producto.nombre}</td>
                <td>
                    <Link to={`/ver-producto/${id}`}>Detalle</Link> |
                    <Link to={`/editar-producto/${id}`}>Editar</Link>
                </td>
            </tr>
        );
    }
}

class Venta extends React.Component {
    render() {
        const id = this.props.venta._links.self.href.split("/").slice(-1);
        return (
            <tr>
                <td style={{ textAlign: "center" }}>
                    {this.props.venta.nroventa}
                </td>
                <td>
                    <Link to={`/ver-venta/${id}`}>Ver Venta</Link>
                </td>
            </tr>
        );
    }
}

module.exports = PageHome;
