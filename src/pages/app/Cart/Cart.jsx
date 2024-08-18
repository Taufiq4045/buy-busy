import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../../redux/slices/cartSlice';
import { placeOrder } from '../../../redux/slices/ordersSlice';
import { selectUser } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../../components/CartItem/CartItem';
import GridLoader from 'react-spinners/GridLoader';
import { toast } from 'react-toastify';
import styles from './Cart.module.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  // Calculate the grand total of items in the cart
  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user.uid));
    }
  }, [dispatch, user]);

  // Handle placing an order
  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please login to visit this page.');
      navigate('/login');
      return;
    }
    // Check if cart is empty
    if (cart.length === 0) {
      toast.error(
        'Your cart is empty. Add items to your cart before placing an order.'
      );
      // Delay navigation by 1.5 seconds
      setTimeout(() => {
        navigate('/');
      }, 1500);
      return;
    }

    try {
      const resultAction = await dispatch(
        placeOrder({ user, cart, grandTotal })
      );
      if (placeOrder.fulfilled.match(resultAction)) {
        toast.success('Order placed successfully!');
        navigate('/');
      } else {
        toast.error('Failed to place the order. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to place the order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <GridLoader size={50} color={'#123abc'} loading={loading} />
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartSummary}>
        <h2>Summary</h2>
        <p>Grand Total: ${grandTotal.toFixed(2)}</p>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
      <div className={styles.cartData}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
