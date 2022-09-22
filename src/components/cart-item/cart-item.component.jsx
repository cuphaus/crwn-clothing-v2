import { CartItemContainer, Img, ItemDetails } from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;
    
    return (
        <CartItemContainer>
            <Img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <div className='name'>{name}</div>
                <div className='price'>{quantity} x ${price}</div>
            </ItemDetails>
            
        </CartItemContainer>
    );
};

export default CartItem;