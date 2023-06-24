import { CartItem } from "../redux/cart/types";


export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => {
        //вычисляем сумму товара
        return obj.price * obj.count + sum; //цену пиццы умножаем на кол-во
    }, 0);
}