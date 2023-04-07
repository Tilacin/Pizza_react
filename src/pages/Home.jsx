import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";


let Home = () => {
    const [items, setItems] = React.useState([]); //пиццы, состояние
    const [isLoading, setIsLoading] = React.useState(true); //скелетон
    const [categoryId, setCategoryId] = React.useState(0)//категории
    const [sortType, setSortType] = React.useState({        //сортировка
        name: 'популярности', sortProperty: 'rating'
    })

    //получаем и отрисовываем пиццы с бэка, что бы бесконечно не отрисовывалось оборачиваем в .useEffect()
    React.useEffect(() => {
        setIsLoading(true);//при смене категории отображается скелетон

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        fetch(`https://6429bc455a40b82da4d97645.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr); //отрендерим пиццы
                setIsLoading(false); //загрузка завершилась,скелетон false, отображаем пиццы
            });
        window.scrollTo(0, 0)//при рендере оказываемся всегда в верху страницы
    }, [categoryId, sortType]);//если меняется категория(categoryId) или сорт(sortType) всегда делать запрос

    return (
        <div className="content">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />{/*прокидываем пропс в категории */}
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {/*пока идёт загрузка - отображаем фейковый массив, элементы скелетон, иначе пиццы*/}
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
        </div>
    )
}

export default Home

