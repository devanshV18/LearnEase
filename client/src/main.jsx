import React from 'react'
import ReactDOM from "react-dom/client"
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import RegistrationPage from "./pages/RegistrationPage.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Tutorials from "./pages/Tutorials.jsx"
import UploadNotes from './pages/UploadNotes.jsx'
import MyNotes from "./pages/MyNotes.jsx"
import Contact from "./pages/Contact.jsx"
import About from './pages/About.jsx'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {Provider} from "react-redux"
import { store } from './store/store.js'




const router = createBrowserRouter([
  {
    path: '/',
    element: <Home /> 
  },
  {
    path: '/register',
    element: <RegistrationPage/>,
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/tutorials',
    element: <Tutorials/>
  },
  {
    path: '/upload-notes',
    element: <UploadNotes/>
  },
  {
    path: '/my-notes',
    element: <MyNotes/>
  },
  {
    path: '/contact-us',
    element: <Contact/>
  },
  {
    path: '/about-us',
    element: <About/>
  }
])

const Root = () => {
  return (
    <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)