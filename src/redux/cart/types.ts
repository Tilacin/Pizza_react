export type CartItem = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
  }
  
  export interface CartSliceStatate {
    totalPrice: number;
    items: CartItem[]
  }