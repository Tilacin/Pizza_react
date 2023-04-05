import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";


let Home = () => {
    const [items, setItems] = React.useState([]); //пиццы, состояние
    const [isLoading, setIsLoading] = React.useState(true); //скелетон

    //получаем и отрисовываем пиццы с бэка, что бы бесконечно не отрисовывалось оборачиваем в .useEffect()
    React.useEffect(() => {
        fetch("https://6429bc455a40b82da4d97645.mockapi.io/items")
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr); //отрендерим пиццы
                setIsLoading(false); //загрузка завершилась,скелетон false, отображаем пиццы
            });
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {/*пока идёт загрузка - отображаем фейковый массив, элементы скелетон, иначе пиццы*/}
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
        </>
    )
}

export default Home

