import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../../contexts/cart.context';
import { useEffect } from 'react';

const Checkout = () => {
    const { 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        removeItemFromCart,
        cartTotal
    } = useContext(CartContext);

    useEffect(() => {
        setIsCartOpen(false);
    }, [])

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
        <div className='checkout-page'>
            <div className='checkout-list'>
                <div className='header row-item'>
                    {['Product', 'Description', 'Quantity', 'Price', 'Remove'].map( (x, idx) => (
                        <div key={idx} className='heading-label'>{x}</div>
                    ))}
                </div>
                {cartItems.map( item => (
                    <div key={item.id} className='row-item'>
                        <img src={item.imageUrl} alt={item.name} />
                        <span>{item.name}</span>
                        <div className='quantity'>
                            <span className='decrement' id={item.id} onClick={decrementCartItem}>&lt;</span>
                            <span className='count'>{item.quantity}</span>
                            <span className='increment' id={item.id} onClick={incrementCartItem}>&gt;</span>
                        </div>
                        <div className='price'>{item.price}</div>
                        <div className='remove' id={item.id} onClick={removeCartItem}>x</div>
                    </div>
                ))}
            </div>
            <div className='total'>
                TOTAL: ${cartTotal}
            </div>
        </div>
    );
};

export default Checkout;