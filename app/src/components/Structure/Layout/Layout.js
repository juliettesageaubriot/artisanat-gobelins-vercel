import React from 'react';
import TheFooter from '../Footer/TheFooter';
import TheHeader from '../Header/TheHeader';
import TheLoader from '../Loader/TheLoader';

import layout from "./styles.module.scss"

const Layout = ({ children }) => {
  return (
    <div className={`layout-wrapper`}>
      {/* <Loader /> */}
      {/* <TheHeader /> */}
      <div className={`${layout.layout_inner} layout_inner`}>
        <div className={layout['page-content']}>
          {children}
        </div>
        {/* <TheFooter /> */}
      </div>
    </div>
  );
}

export default Layout;
