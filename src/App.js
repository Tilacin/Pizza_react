import React from "react";


import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";



function App() {
  return (
    <div className="wrapper">
        <Header />
        <div className="container">
          {/* Делаем роутинг */}
          <Routes>
            {/* По гл. пути рендерим <Home/> */}
            <Route path="/" element={<Home />} />{" "}
            <Route path="/cart" element={<Cart />} />{" "}
            {/* если по пути ни чего не подошло, то рендерим  <NotFound /> */}
            <Route path="*" element={<NotFound />} />{" "}
          </Routes>
        </div>
    
    </div>
  );
}

export default App;
