// import React, { useContext, useEffect, useState } from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../../redux/slices/ordersSlice'; // Import the fetchOrders thunk
import {
  selectOrders,
  selectOrdersLoading,
} from '../../../redux/slices/ordersSlice'; // Import the selectors

// import { AuthContext } from '../../../context/AuthContext';
// import { db } from '../../../firebase';
// import { doc, getDoc } from 'firebase/firestore';
import GridLoader from 'react-spinners/GridLoader';
import styles from './Orders.module.css';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);

  // const { user } = useContext(AuthContext);
  // const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch the user's orders from Firestore
  //   const fetchOrders = async () => {
  //     if (user) {
  //       const userOrdersRef = doc(db, 'userOrders', user.uid);
  //       const userOrdersSnap = await getDoc(userOrdersRef);
  //       if (userOrdersSnap.exists()) {
  //         setOrders(userOrdersSnap.data().orders);
  //       } else {
  //         setOrders([]);
  //       }
  //       setLoading(false);
  //     }
  //   };
  //   fetchOrders();
  // }, [user]);

  useEffect(() => {
    // Fetch orders when the component mounts
    dispatch(fetchOrders());
  }, [dispatch]);

  // Calculate the grand total for an individual order
  const calculateGrandTotal = (order) => {
    return order.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <GridLoader size={20} color={'#FF4785'} loading={loading} />
      </div>
    );
  }

  return (
    <div className={styles.orders}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <div className={styles.noOrders}>
          <p>You have no orders</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className={styles.order}>
            <h3>Order ID: {order.orderId}</h3>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Grand Total</td>
                  <td>${calculateGrandTotal(order)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
