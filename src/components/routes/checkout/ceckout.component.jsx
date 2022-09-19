import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../../contexts/cart.context';
import { useEffect } from 'react';
import CheckoutItem from '../../checkout-item/checkout-item.component';

const Checkout = () => {
    const { 
        setIsCartOpen, 
        cartItems,
        cartTotal
    } = useContext(CartContext);

    useEffect(() => {
        setIsCartOpen(false);
    }, [])

    

    return (
        <div className='checkout-page'>
            <div className='checkout-list'>
                <div className='header row-item'>
                    {['Product', 'Description', 'Quantity', 'Price', 'Remove'].map( (x, idx) => (
                        <div key={idx} className='heading-label'>{x}</div>
                    ))}
                </div>
                {cartItems.map( item => (
                    <CheckoutItem item={item} key={item.id} />
                ))}
            </div>
            <div className='total'>
                TOTAL: ${cartTotal}
            </div>
        </div>
    );
};

export default Checkout;