import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import toolsData from '@assets/data/tools.json';

const TheToolChoiceButton = ({ array }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isCurrentIdSlider, setIsCurrentIdSlider] = useState(1);
    const [currentImg, setCurrentImg] = useState(null);

    const handleContentClick = () => {
        setIsOpen(!isOpen)
    }

    const handleToolsClick = (event) => {
        array.filter((elm) => {
            if (elm.id === parseInt(event.target.id)) {
                setIsCurrentIdSlider(parseInt(event.target.id))
                toolsData.changeSlider = true
            }
        })
    }

    useEffect(() => {
        setCurrentImg(document.querySelector("#cursor-img").getAttribute("src"));
    }, [])

    const handleHoverIn = () => {
        setCurrentImg(document.querySelector("#cursor-img").getAttribute("src"));
        document.querySelector("#cursor-img").setAttribute("src", "")
    };
    const handleHoverOut = () => {
        document.querySelector("#cursor-img").setAttribute("src", currentImg);
    }

    useEffect(() => {
        if (toolsData.changeSlider === false) {
            setIsCurrentIdSlider(parseInt(toolsData.idActifGlobal))
        }
    });

    return (
        <div className={`${styles["tool-choice_container"]} tool-choice_container`} id="toolsModal">
            <div className={`${styles["tool-choice__inner"]} tool-choice__inner`}>

                <ul className={styles.head} id="tools-children">
                    {array.map((elm, i) => {
                        return (
                            <li key={i} onClick={(event) => handleToolsClick(event)}>
                                <button
                                    id={elm.id}
                                    data-color={(toolsData.changeSlider === true && isCurrentIdSlider === elm.id) || (toolsData.changeSlider === false && toolsData.idActifGlobal === elm.id) && true}
                                    onMouseEnter={handleHoverIn} 
                                    onMouseLeave={handleHoverOut}
                                >
                                    <img id={elm.id} src={elm.img} />
                                </button>
                            </li>
                        )
                    })}
                </ul>

                {array.map((elm, i) => {
                    // console.log('array', array);
                    return (
                        <div key={i}>

                            {toolsData.changeSlider === false && toolsData.idActifGlobal === elm.id ?
                                <>
                                    <div className={`${styles.content}`}>
                                        <div>
                                            <h2>
                                                {elm.present ? "Tu utilises" : ""}
                                                {elm.past ? "Tu as utilisé" : ""}
                                                {elm.future ? "Tu vas utiliser" : ""}
                                                <br />
                                                <span>{elm.title}</span>
                                            </h2>
                                            <div className={`${styles['content-display']} ${true === isOpen && styles.open}`}>
                                                <p>{elm.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                null
                            }
                            {toolsData.changeSlider === true && isCurrentIdSlider === elm.id ?
                                <>
                                    <div className={`${styles.content}`}>
                                        <div>
                                            <h2>
                                                {elm.present ? "Tu utilises" : ""}
                                                {elm.past ? "Tu as utilisé" : ""}
                                                {elm.future ? "Tu vas utiliser" : ""}
                                                <br />
                                                <span>{elm.title}</span>
                                            </h2>
                                            <div className={`${styles['content-display']} ${true === isOpen && styles.open}`}>
                                                <p>{elm.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                    )

                })}

                <button onClick={handleContentClick} className={styles['open-button']}>
                    <span>Je veux en savoir plus !</span>
                    <i className={`fal fa-chevron-down ${true === isOpen && styles.rotate}`}></i>
                </button>

            </div>
        </div >
    );
}

export default TheToolChoiceButton;