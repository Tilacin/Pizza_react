import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination  from '../components/Pagination/pagination';

let Home = ({ searchValue }) => {
    const [items, setItems] = React.useState([]); //пиццы, состояние
    const [isLoading, setIsLoading] = React.useState(true); //скелетон
    const [categoryId, setCategoryId] = React.useState(0)//категории
    const [currentPage, setCurrentPage] = React.useState(1)//страницы
    const [sortType, setSortType] = React.useState({        //сортировка
        name: 'популярности', sortProperty: 'rating'
    })

    //получаем и отрисовываем пиццы с бэка, что бы бесконечно не отрисовывалось оборачиваем в .useEffect()
    React.useEffect(() => {
        setIsLoading(true);//при смене категории отображается скелетон

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        fetch(`https://6429bc455a40b82da4d97645.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&{search}`,)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr); //отрендерим пиццы
                setIsLoading(false); //загрузка завершилась,скелетон false, отображаем пиццы
            });
        window.scrollTo(0, 0)//при рендере оказываемся всегда в верху страницы
    }, [categoryId, sortType, searchValue, currentPage]);//если меняется категория(categoryId) или сорт(sortType) всегда делать запрос

    const pizzas = items.filter(obj => {//отфильтровываем по названию при поиске в инпуте
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false

    }).map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    return (
        <div className="content">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />{/*прокидываем пропс в категории */}
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {/*пока идёт загрузка - отображаем фейковый массив, элементы скелетон, иначе пиццы*/}
                {isLoading ? skeletons : pizzas}
            </div>
           <Pagination onChangePage={number => setCurrentPage(number)}/>
        </div>
    )
}

export default Home

