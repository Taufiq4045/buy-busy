import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Page404.module.css';

const Page404 = () => {
  return (
    <div className={styles.page404}>
      <h2>Page Not Found</h2>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Page404;
