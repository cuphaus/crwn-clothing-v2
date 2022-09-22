import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext)

    const handleCartIconClick = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartIconContainer onClick={handleCartIconClick}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;