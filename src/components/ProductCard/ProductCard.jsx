import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { selectUser } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import styles from './style.module.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      await dispatch(addToCart({ userId: user.uid, product }));
      toast.success('Item added to cart successfully!');
    } catch (error) {
      toast.error('Failed to add the item, Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.productCard}>
      <div>
        <img src={product.image} alt={product.title} />
      </div>
      <h3>{product.title}</h3>
      <p>$ {product.price}</p>
      <button onClick={handleAddToCart} disabled={loading}>
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
