import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../../redux/slices/productSlice';

import ProductCard from '../../../components/ProductCard/ProductCard';
import GridLoader from 'react-spinners/GridLoader';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState(10000);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategory((prev) => [...prev, value]);
    } else {
      setCategory((prev) => prev.filter((cat) => cat !== value));
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (category.length === 0 || category.includes(product.category)) &&
      product.price <= price &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />
        <div className={styles.filterSection}>
          <h3>Filter</h3>
          <div className={styles.filter}>
            <label>Price: ${price}</label>
            <input
              type="range"
              min="100"
              max="100000"
              step="10"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className={styles.filter}>
            <h3>Category</h3>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Men's Clothing"
                  onChange={handleCategoryChange}
                />
                Men's Clothing
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Women's Clothing"
                  onChange={handleCategoryChange}
                />
                Women's Clothing
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Jewelry"
                  onChange={handleCategoryChange}
                />
                Jewelry
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Electronics"
                  onChange={handleCategoryChange}
                />
                Electronics
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <GridLoader size={20} color={'#FF4785'} loading={loading} />
          </div>
        ) : (
          <div className={styles.products}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
