import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/slices/filterSlice";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";

export const SearchContext = React.createContext(); //контекст

function App() {
  const [searchValue, setSearchValue] = React.useState(""); //инпут
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="wrapper">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>

      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        {/* Обернули в контекст и 
      теперь параметры можно пробросить сразу в нужный компонент, а не по цепочке вложенности */}
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
      </SearchContext.Provider>
    </div>
  );
}

export default App;
