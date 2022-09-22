import { RowItem, Quantity } from './checkout-item.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { css } from 'styled-components';

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
        <RowItem key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <span>{item.name}</span>
            <Quantity>
                <span className='decrement' id={item.id} onClick={decrementCartItem}>&#8249;</span>
                <span className='count'>{item.quantity}</span>
                <span className='increment' id={item.id} onClick={incrementCartItem}>&#8250;</span>
            </Quantity>
            <div className='price'>{item.price}</div>
            <div className='remove' id={item.id} onClick={removeCartItem}>&#10005;</div>
        </RowItem>
    );
};

export default CheckoutItem;