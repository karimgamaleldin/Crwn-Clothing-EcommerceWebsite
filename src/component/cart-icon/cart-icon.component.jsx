import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/card.context';

const CartIcon = () => {
    const { isCartOpen , setIsCartOpen} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <div className='cart-icon-container'>
            <ShoppingIcon className = 'shopping-icon' onClick = {toggleIsCartOpen}>
                <span className='item-count'>
                    0 
                </span>
            </ShoppingIcon>
        </div>
    );

}

export default CartIcon;