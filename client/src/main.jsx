import React, { useEffect } from 'react'
import ReactDOM from "react-dom/client"
import './index.css' //mandatory
import {createBrowserRouter, RouterProvider} from "react-router-dom" //l1 routing
import RegistrationPage from "./pages/RegistrationPage.jsx"
import Error from "./components/Error.jsx"
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
import { fetchUser } from './store/slices/UserSlice.js'
import { useDispatch, useSelector } from 'react-redux'


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
  },
  {
    path: '/contact-us',
    element: <Contact/>
  },
  {
    path: '/about-us',
    element: <About/>
  }
]) //l2 routing

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUser()); // Check authentication state on app load
  }, [dispatch]);

  if (loading) {
    return <div className="loading-screen">Loading...</div>; // Add a better loading screen as needed
  }

  return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
          {/* l3 routing, creating a route provider and passing the context of the route to the main */}
      
            <RouterProvider router={router}/> 
         

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
  </React.StrictMode>,
)
