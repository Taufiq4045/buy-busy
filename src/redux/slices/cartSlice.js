import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Thunk to fetch the cart from Firestore
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      const userCartRef = doc(db, 'usersCarts', userId);
      const cartSnap = await getDoc(userCartRef);
      if (cartSnap.exists()) {
        return cartSnap.data().myCart;
      } else {
        await setDoc(userCartRef, { myCart: [] });
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add an item to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, product }, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState().cart;
      const userCartRef = doc(db, 'usersCarts', userId);
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        await updateDoc(userCartRef, {
          myCart: updatedCart,
        });
        return updatedCart;
      } else {
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        await updateDoc(userCartRef, {
          myCart: updatedCart,
        });
        return updatedCart;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to remove an item from the cart
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ userId, itemId }, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState().cart;
      const userCartRef = doc(db, 'usersCarts', userId);

      const updatedCart = cart.filter((item) => item.id !== itemId);
      await updateDoc(userCartRef, {
        myCart: updatedCart,
      });

      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ userId, itemId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState().cart;
      const userCartRef = doc(db, 'usersCarts', userId);

      const updatedCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      await updateDoc(userCartRef, {
        myCart: updatedCart,
      });

      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;

// Selectors
export const selectCart = (state) => state.cart.cart;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
