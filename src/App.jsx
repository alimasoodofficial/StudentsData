import React from 'react'
import API from './components/API'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import UpdatePost from './components/UpdatePost';
import CreatePost from './components/CreatePost';


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
    {
      path: "/createpost",
      element:<CreatePost />
      ,
    },
  ]);
  return  <RouterProvider router={router} />

}
