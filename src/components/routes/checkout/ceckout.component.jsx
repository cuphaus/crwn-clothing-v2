import { CheckoutList, Total, Header } from './checkout.styles.jsx';
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
        <>
            <CheckoutList>
                <Header>
                    {['Product', 'Description', 'Quantity', 'Price', 'Remove'].map( (x, idx) => (
                        <div key={idx} className='heading-label'>{x}</div>
                    ))}
                </Header>
                {cartItems.map( item => (
                    <CheckoutItem item={item} key={item.id} />
                ))}
            </CheckoutList>
            <Total>
                TOTAL: ${cartTotal}
            </Total>
        </>
    );
};

export default Checkout;