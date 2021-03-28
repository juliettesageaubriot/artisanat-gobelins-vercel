import React from 'react';

import styles from './styles.module.scss'
// import {loader, icon} from ''

const TheLoader = () => {
  return (
    <div className={`${styles.loader}`}>
      <h1>loading....</h1>
    </div>
  );
}

export default TheLoader;