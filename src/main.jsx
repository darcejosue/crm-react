import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from './components/Layout'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>
  },
  {
    path: '/contact',
    element: <h1>Contact</h1> 
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
