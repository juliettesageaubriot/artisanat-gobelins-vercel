import React from 'react';
import styles from './styles.module.scss'

const TheLoader = () => {
  return (
    <div id="assetLoader" className={`loader-three actived`}>

      <div className="container">

        <img src="/assets/images/logo/logo_regards_dartisans.png" className="logo-loader" alt="logo Regards d'Artisans"/>

        <div className="container-loader">
          <span className="percent-loader"></span>
          <img src="/assets/images/ui/loader/loader.png" className='hand' alt="image d'une main avec un crayon qui suit la bar de chargement"/>
        </div>
      </div>

    </div>
  );
}

export default TheLoader;
