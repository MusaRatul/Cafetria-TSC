import React, { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Main from './layout/Main'
import Home from './Home/Home'
import Login from './login-register/Login'
import Cart from './Cart/Cart'
import Register from './login-register/Register';
import { MyContextProvider } from './MyContext';
import User from './user/user';
import Admin from './Admin/Admin';
import Foods from '../src/Foods/Foods';
import ResetPass from './forget-reset-password/ResetPass';
import ForgotPass from './forget-reset-password/ForgotPass';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "Login",
        element: <Login></Login>,
        
      },
      {
        path: "Register",
        element: <Register></Register>
      },
      {
        path: "cart",
        element: <Cart></Cart>
      },
      {
        path: "Foods",
        element: <Foods></Foods>
      },
      {
        path:"Admin",
        element: <Admin></Admin>
      },
      {
        path:"password-reset",
        element:<ResetPass></ResetPass>
      },
      {
        path:"/forgotpassword/:id/:token",
        element:<ForgotPass></ForgotPass>
      }
    ]
  }
])
const App = () => {
   
  return (
    <MyContextProvider >
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </MyContextProvider>
  )
}

export default App
