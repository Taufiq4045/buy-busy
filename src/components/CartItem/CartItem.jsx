import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCartItemQuantity,
  removeCartItem,
  selectCart,
} from '../../redux/slices/cartSlice';
import { selectUser } from '../../redux/slices/authSlice';
import styles from './style.module.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);

  const removeFromCart = () => {
    dispatch(removeCartItem({ userId: user?.uid, itemId: item.id }));
  };

  const increaseQuantity = () => {
    dispatch(
      updateCartItemQuantity({
        userId: user?.uid,
        itemId: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(
        updateCartItemQuantity({
          userId: user?.uid,
          itemId: item.id,
          quantity: item.quantity - 1,
        })
      );
    } else {
      removeFromCart();
    }
  };

  const inCart = cart.find((cartItem) => cartItem.id === item.id);

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.title} />
      </div>
      <h3>{item.title}</h3>
      <div className={styles.priceAndQuantity}>
        <p>$ {item.price}</p>
        <div className={styles.quantityControl}>
          <button onClick={decreaseQuantity}>-</button>
          <span>{inCart.quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>
      </div>
      <button onClick={removeFromCart}>Remove from Cart</button>
    </div>
  );
};

export default CartItem;
