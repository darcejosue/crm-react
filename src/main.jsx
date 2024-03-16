import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout";
import {
  NuevoCliente,
  action as nuevoClienteAction,
} from "./pages/NuevoCliente";
import { Index, loader as clientesLoader } from "./pages/Index";
import {
  EditarCliente,
  loader as editarClientesLoader,
  action as editarClientesAction
} from "./pages/EditarCliente";
import { action as eliminarClienteAction } from "./components/Cliente";

import ErrorPage from "./components/ErrorPage";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente/>,
        loader: editarClientesLoader,
        errorElement: <ErrorPage/>,
        action: editarClientesAction
      },
      {
        path: "/clientes/:clienteId/eliminar",
        action: eliminarClienteAction,
        errorElement: <ErrorPage/>,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
