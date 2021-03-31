import React, { useState } from 'react';
import TheFooter from '@structure/Footer/TheFooter';
import TheHeader from '@structure/Header/TheHeader';
import TheLoader from '@structure/Loader/TheLoader';

import { useEffect } from 'react';

import layout from "./styles.module.scss"
import MyProvider from '@helpers/myProvider';

// const audioContext = new AudioContext();
    
// const buffer = audioContext.createBuffer(
//   1,
//   audioContext.sampleRate * 1,
//   audioContext.sampleRate
// );

// const globalGain = audioContext.createGain();
// globalGain.gain.setValueAtTime(0.5, 0);

// const AudioContextReact = React.createContext({
//   audioContext,
//   buffer,
//   globalGain,
//   changeGain: (volume) => { globalGain.gain.setTargetAtTime(volume, audioContext.currentTime)}
// });
export const ThemeContext = React.createContext({
  theme: "JE SUIS UN THEME",
  toggleTheme: () => {console.log("toggle function")},
});

const TheLayout = ({ children }) => {
  return (
    <MyProvider>
      <div className={`layout-wrapper`}>
        {/* <TheLoader /> */}
        {/* <TheHeader /> */}
        <div className={`${layout.layout_inner} layout_inner`}>
          <div className={layout['page-content']}>
            {children}
          </div>
          {/* <TheFooter /> */}
        </div>
      </div>
    </MyProvider>
  );
}

export default TheLayout;
