import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';

import layout from "./styles.module.scss"

const Layout = ({ children }) => {
  return (
    <div className={`layout-wrapper`}>
      {/* <Loader /> */}
      {/* <Header /> */}
      <div className={`${layout.layout_inner} layout_inner`}>
        <div className={layout['page-content']}>
          {children}
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Layout;
