import React from 'react';
import styles from './styles.module.scss'

const TheLoader = () => {
  return (
    <div id="assetLoader" className={`loader-three actived`}>
      <div className="container">

        <img src="/assets/images/ui/loader/loader_vitrail.png" className="loader_pulse loader_img loader_vitrail" alt="image du vitrail pour le loader" />
        <img src="/assets/images/ui/loader/loader_chapeau.png" className="loader_pulse loader_img loader_chapeau" alt="image du chapeau pour le loader" />
        <img src="/assets/images/ui/loader/loader_collier.png" className="loader_pulse loader_img loader_collier" alt="image du collier pour le loader" />
        <img src="/assets/images/ui/loader/loader_contrebasse.png" className="loader_pulse loader_img loader_contrebasse" alt="image de la contrebasse pour le loader" />
        <img src="/assets/images/ui/loader/loader_logo.png" className="loader_img loader_logo" alt="image du logo, Regards d'Artisans" />

      </div>
    </div>
  );
}

export default TheLoader;
