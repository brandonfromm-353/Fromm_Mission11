// this defines a cart item type that will be used in the cart context and other components
export interface CartItem {
    bookID: number;
    title: string;
    price: number;
    quantity: number;
}