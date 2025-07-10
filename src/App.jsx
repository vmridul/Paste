import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
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
          <Paste />
        </div>
      ),
    },
    {
      path: "/pastes/:id",
      element: (
        <div>
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
