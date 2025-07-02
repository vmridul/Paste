import { useState } from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Paste from "./components/Paste";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Viewpaste from "./components/Viewpaste";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <div className="flex justify-center gap-20 ">
            <Home />
            <Paste />
          </div>
        </div>
      ),
    },
    {
      path: "/pastes",
      element: (
        <div>
          <Navbar />
          <Paste />
        </div>
      ),
    },
    {
      path: "/pastes/:id",
      element: (
        <div>
          <Navbar />
          <Viewpaste />
        </div>
      ),
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
