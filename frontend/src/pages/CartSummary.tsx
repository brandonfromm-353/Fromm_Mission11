import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

// This component displays a summary of the cart, including the total price and quantity of items in the cart.
const CartSummary = () => {
    const navigate = useNavigate();
    const {cart} = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    // creates the look of the cart summary component
    return (
        <div 
            style={{
                position: 'fixed',
                top: '10px',
                right: '20px',
                background: '#f8f9fa',
                padding: '10px 15px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px rgba(0, 0, 0, 0.2)',
                fontSize: '16px',
            }}
            onClick={() => navigate('/cart')}
            //has a cart icon with the price and quantity of items in the cart
        >🛒 <strong>${totalAmount.toFixed(2)} ({totalQuantity})</strong></div>
    );
};

export default CartSummary;