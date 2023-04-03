import React from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";

//import pizzas from "./assets/pizza.json";

import "./scss/app.scss";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import { Skeleton } from "./components/PizzaBlock/Skeleton";

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); //скелетон или пиццы
  
  //получаем и отрисовываем пиццы с бэка, что бы бесконечно не отрисовывалось оборачиваем в .useEffect()
  React.useEffect(() => {
    fetch("https://6429bc455a40b82da4d97645.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => setItems(arr));
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading
                ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) /*{пока идёт загрузка - отображаем скелетон}*/
                : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
