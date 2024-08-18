import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';

// Thunk for fetching orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { getState }) => {
    const { user } = getState().auth;
    if (user) {
      const userOrdersRef = doc(db, 'userOrders', user.uid);
      const userOrdersSnap = await getDoc(userOrdersRef);
      if (userOrdersSnap.exists()) {
        return userOrdersSnap.data().orders;
      } else {
        return [];
      }
    }
    return [];
  }
);

// Helper function to create or update the order document
const updateOrderDocument = async (userOrdersRef, orderData) => {
  const userOrdersSnap = await getDoc(userOrdersRef);

  if (!userOrdersSnap.exists()) {
    await setDoc(userOrdersRef, { orders: [orderData] });
  } else {
    await updateDoc(userOrdersRef, { orders: arrayUnion(orderData) });
  }
};

// Thunk for placing an order
export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async ({ user, cart, grandTotal }, { rejectWithValue }) => {
    if (!user) {
      return rejectWithValue('User not logged in');
    }

    try {
      const orderId = new Date().getTime().toString();
      const orderDate = new Date().toISOString();

      const orderData = {
        orderId,
        date: orderDate,
        items: cart.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        grandTotal,
      };

      const userOrdersRef = doc(db, 'userOrders', user.uid);
      await updateOrderDocument(userOrdersRef, orderData);

      // Clear the user's cart
      const userCartRef = doc(db, 'usersCarts', user.uid);
      await updateDoc(userCartRef, { myCart: [] });

      return { success: true };
    } catch (error) {
      console.error('Error placing order:', error);
      return rejectWithValue('Failed to place order. Please try again.');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;
export const selectOrdersLoading = (state) => state.orders.loading;
export default ordersSlice.reducer;
