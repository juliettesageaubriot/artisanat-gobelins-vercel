//react
import React, { useEffect, useRef } from 'react';
import TheLoader from '@/components/Structure/Loader/TheLoader';
import MenuModal from '@components/MenuModal/MenuModal'

import dataMenu from '@assets/data/content-menu.json'
//styles
import styles from "./styles.module.scss"

//components
import ThreeSceneMenu from '@/three-utils/SetUpThree/threeSceneMenu';

const ChoixEpisodeAtelierPage = () => {
  const ref = useRef(null)


  useEffect(() => {
    const canvas = ref.current
    const threeScene = new ThreeSceneMenu(canvas);
  }, [])

  return (
    <section>
      <TheLoader />
      {
        dataMenu.map((elm, i) => {
          return (
            <MenuModal
              key={i}
              id={elm.id}
              title={elm.title}
              caption={elm.caption}
              duration={elm.duration}
              date={elm.date}
              left={elm.left}
              top={elm.top}
              disponibility={elm.disponibility}
              url={elm.url}
            />
          )
        })
      }
      <div ref={ref} />
    </section>
  )
}

export default ChoixEpisodeAtelierPage
