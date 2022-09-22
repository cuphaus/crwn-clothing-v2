import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartIcon from "../../cart-icon/cart-icon.component";
import CardDropdown from "../../cart-dropdown/cart-dropdown.component";
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from '../navigation/navigation.styles';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo" />
            </LogoContainer>
            <NavLinksContainer>
              <NavLink to='/shop'>
                  SHOP
              </NavLink>
              { currentUser ? 
                  <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                  : 
                  <NavLink to='/auth'>
                      SIGN IN
                  </NavLink>
              }
              <CartIcon />
            </NavLinksContainer>
          { isCartOpen && <CardDropdown /> }
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;