//react
import React, { useEffect, useRef, useState } from 'react';
import TheLoader from '@/components/Structure/Loader/TheLoader';
import MenuModal from '@components/MenuModal/MenuModal'
import TheVolume from '@components/VolumeSettings/TheVolume'
import TheAudioSnippet from '@components/AudioSnippet/TheAudioSnippet';

import dataMenu from '@assets/data/content-menu.json'
//styles
import styles from "./styles.module.scss"

//components
import ThreeSceneMenu from '@/three-utils/SetUpThree/threeSceneMenu';

const ChoixEpisodeAtelierPage = () => {
  const ref = useRef(null)

  // Sound states
  const [isShouldPlayOnStart, setIsShouldPlayOnStart] = useState(false)

  const [url, setUrl] = useState()
  const [isPlaying, setIsPlaying] = useState(false)

  const state = {
    handleUrl: (urlElement) => { setUrl(urlElement) },
    stopSound: (event) => { setIsPlaying(event) },
  }

  useEffect(() => {
    const canvas = ref.current
    const threeScene = new ThreeSceneMenu(canvas, state);
  }, [])

  return (
    <section>
      <TheLoader />
      <TheVolume absolute={true} />

      {!!url && <TheAudioSnippet sound_url={url} play={true} shouldPlayOnStart={false} loop={false} /> }
      <TheAudioSnippet sound_url="/assets/audios/menu/menu.mp3" play={true} shouldPlayOnStart={true} loop={true} />
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
