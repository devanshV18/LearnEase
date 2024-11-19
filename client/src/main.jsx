import React from 'react'
import ReactDOM from "react-dom/client"
import {createBrowserRouter, RouterProvider} from "react-router-dom" //l1 routing
import RegistrationPage from "./pages/RegistrationPage.jsx"
import './index.css' //mandatory
import Error from "./components/Error.jsx"
import Login from "./pages/Login.jsx"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'



const router = createBrowserRouter([
  {
    path: '/',
    element: <RegistrationPage/>,
    errorElement: <Error/>,
  },
  {
    path: '/login',
    element: <Login/>
  }
  
]) //l2 routing

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* l3 routing, creating a route provider and passing the context of the route to the main */}
    <RouterProvider router={router}/> 

    <ToastContainer
      position="top-right"
      autoClose={4000} 
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>,
)
