const React = require("react");
const ReactDOM = require("react-dom");
const { createBrowserRouter, RouterProvider } = require("react-router-dom");

const PageHome = require("./pages/home");

const PageNuevoVendedor = require("./pages/nuevo-vendedor");
const PageEditarVendedor = require("./pages/editar-vendedor");

const PageNuevoProducto = require("./pages/nuevo-producto");
const PageVerProducto = require("./pages/ver-producto");
const PageEditarProducto = require("./pages/editar-producto");

const PageVerVenta = require("./pages/ver-venta");
const PageNuevaVenta = require("./pages/nueva-venta");

const router = createBrowserRouter([
    { path: "/", element: <PageHome /> },
    { path: "/nuevo-vendedor", element: <PageNuevoVendedor /> },
    { path: "/editar-vendedor/:id", element: <PageEditarVendedor /> },

    { path: "/nuevo-producto", element: <PageNuevoProducto /> },
    { path: "/ver-producto/:id", element: <PageVerProducto /> },
    { path: "/editar-producto/:id", element: <PageEditarProducto /> },

    { path: "/ver-venta/:id", element: <PageVerVenta /> },
    { path: "/nueva-venta", element: <PageNuevaVenta /> },
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById("react")
);
