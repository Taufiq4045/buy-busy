import React from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/slices/authSlice';

// import { auth } from '../../firebase';
import styles from './style.module.css';
import {
  FaHome,
  FaShoppingCart,
  FaClipboardList,
  FaSignInAlt,
} from 'react-icons/fa';

const Navbar = () => {
  // const { user, setUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    // try {
    //   await auth.signOut();
    //   setUser(null);
    // } catch (error) {
    //   console.error('Error signing out', error);
    // }
    try {
      await dispatch(logout());
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">BuyBusy</Link>
      </div>
      <div className={styles.navLinks}>
        <Link to="/">
          <FaHome /> Home
        </Link>
        {user ? (
          <>
            <Link to="/cart">
              <FaShoppingCart /> Cart
            </Link>
            <Link to="/orders">
              <FaClipboardList /> My Orders
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <FaSignInAlt /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
