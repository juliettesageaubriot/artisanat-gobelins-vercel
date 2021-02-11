import React from 'react';

import styles from './styles.module.scss'

const Loader = () => {
  return (
    <div className={`${styles.loader} loader`}>
      <h1>loading....</h1>
    </div>
  );
}

export default Loader;
