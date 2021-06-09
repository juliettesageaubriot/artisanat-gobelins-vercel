import React from 'react';
import TheFooter from '@structure/Footer/TheFooter';
import TheHeader from '@structure/Header/TheHeader';
import TheOverlayDesktop from "@components/OverlayDesktop/TheOverlayDesktop"
import TheVolume from '@components/VolumeSettings/TheVolume'
import layout from "./styles.module.scss"

import { useRouter } from 'next/router'

const TheLayout = ({ children }) => {
  const router = useRouter()
  
  return (
    <>
      <TheOverlayDesktop />
      <div className={`layout-wrapper`}>
        {/* <TheHeader /> */}
        <div className={`${layout.layout_inner} layout_inner`}>
          <div className={layout['page-content']}>
            {children}
          </div>
          <TheVolume absolute={true} color={`${router.pathname === "/fin-episode" ? "blanc" : "noir"}`} />
          {/* <TheFooter /> */}
        </div>
      </div>
    </>
  );
}

export default TheLayout;
