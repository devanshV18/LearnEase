import React from 'react'
import ReactDOM from "react-dom/client"
import './index.css'
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom"
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
import { useEffect } from 'react'

// Create protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

// Auth wrapper component
const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
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
    element: (
      <ProtectedRoute>
        <Tutorials/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/upload-notes',
    element: (
      <ProtectedRoute>
        <UploadNotes/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-notes',
    element: (
      <ProtectedRoute>
        <MyNotes/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/contact-us',
    element: (
      <ProtectedRoute>
        <Contact/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/about-us',
    element: (
      <ProtectedRoute>
        <About/>
      </ProtectedRoute>
    ),
  }
])

const Root = () => {
  return (
    <Provider store={store}>
      <AuthWrapper>
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
      </AuthWrapper>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)