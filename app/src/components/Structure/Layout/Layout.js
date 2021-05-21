import React from 'react';
import TheFooter from '@structure/Footer/TheFooter';
import TheHeader from '@structure/Header/TheHeader';
import TheOverlayDesktop from "@components/OverlayDesktop/TheOverlayDesktop"

import layout from "./styles.module.scss"

const TheLayout = ({ children }) => {
  return (
    <>
    <TheOverlayDesktop />
    <div className={`layout-wrapper`}>
      {/* <TheHeader /> */}
      <div className={`${layout.layout_inner} layout_inner`}>
        <div className={layout['page-content']}>
          {children}
        </div>
        {/* <TheFooter /> */}
      </div>
    </div>
    </>
  );
}

export default TheLayout;
