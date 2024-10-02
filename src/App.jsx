import React from 'react'
import API from './components/API'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import UpdatePost from './components/UpdatePost';


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<API />
      ,
    },
    {
      path: "/updatepost",
      element:<UpdatePost />
      ,
    },
  ]);
  return  <RouterProvider router={router} />

}
