import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({item}) => {
    const { 
        cartItems, 
        addItemToCart, 
        removeItemFromCart,
    } = useContext(CartContext);

    const decrementCartItem = (event) => {
        const item = cartItems.find(x => x.id == event.target.id);
        if(item){
            removeItemFromCart(item);
        }
    };
    
    const incrementCartItem = (event) => {
        const item = cartItems.find(x => x.id == event.target.id);
        if(item){
            addItemToCart(item);
        }
    };
    
    const removeCartItem = (event) => {
        const item = cartItems.find(x => x.id == event.target.id);
        if(item){
            removeItemFromCart(item, true);
        }
    };

    return (
        <div key={item.id} className='row-item'>
            <img src={item.imageUrl} alt={item.name} />
            <span>{item.name}</span>
            <div className='quantity'>
                <span className='decrement' id={item.id} onClick={decrementCartItem}>&#8249;</span>
                <span className='count'>{item.quantity}</span>
                <span className='increment' id={item.id} onClick={incrementCartItem}>&#8250;</span>
            </div>
            <div className='price'>{item.price}</div>
            <div className='remove' id={item.id} onClick={removeCartItem}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;