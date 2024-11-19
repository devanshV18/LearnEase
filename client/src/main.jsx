import React from 'react'
import ReactDOM from "react-dom/client"
import './index.css' //mandatory
import {createBrowserRouter, RouterProvider} from "react-router-dom" //l1 routing
import RegistrationPage from "./pages/RegistrationPage.jsx"
import Error from "./components/Error.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import Tutorials from "./pages/Tutorials.jsx"
import UploadNotes from './pages/UploadNotes.jsx'
import MyNotes from "./pages/MyNotes.jsx"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/register',
    element: <RegistrationPage/>,
    errorElement: <Error/>,
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/tutorials',
    element: <Tutorials/>
  },
  {
    path: '/upload-notes',
    element: <UploadNotes/>,
  },
  {
    path: 'my-notes',
    element: <MyNotes/>
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
