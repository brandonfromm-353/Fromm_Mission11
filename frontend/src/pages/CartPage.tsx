import { CartItem } from '../types/CartItem';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();

    return (
        // the main container for the cart page
        <div className="container mt-5 mb-5">

            <div className="card p-4 shadow-sm">
                <h2 className="mb-4 text-center">Your Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-center text-muted">Your cart is empty</p>
                ) : (
                    // display items in the cart
                    <ul className="list-group">
                        {cart.map((item: CartItem) => (
                            <li key={item.title} className="list-group-item d-flex justify-content-between align-items-center p-3 shadow-sm mb-2 rounded">
                                <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                        <h5 className="mb-1">{item.title}</h5>
                                        <p className="text-muted mb-1">${item.price.toFixed(2)}</p>
                                        <p className="text-muted mb-1">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.bookID)} 
                                    className="btn btn-danger d-flex align-items-center">
                                    <FaTrashAlt className="me-1" /> Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>


            {/* total price */}
            <div className="mt-4">
                <h3>
                    <strong>Total: </strong>
                    <span>
                        ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                    </span>
                </h3>
            </div>

            {/* buttons for checkout and continue shopping */}
            <div className="mt-4 d-flex justify-content-center gap-3">
                <button className="btn btn-success d-flex align-items-center">
                    Checkout
                </button>
                <button 
                    onClick={() => navigate('/')} 
                    className="btn btn-outline-primary d-flex align-items-center">
                    Continue Shopping
                </button>
            </div>

        </div>
    );
}

export default CartPage;
