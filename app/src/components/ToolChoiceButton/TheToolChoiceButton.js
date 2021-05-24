import { useEffect, useState } from 'react';
import styles from './styles.module.scss'

const TheToolChoiceButton = ({ array }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isCurrentId, setIsCurrentId] = useState(1)

    const handleContentClick = () => {
        setIsOpen(!isOpen)
    }

    const handleToolsClick = (event) => {
        array.filter((elm) => {
            if (elm.id === parseInt(event.target.id)) {
                setIsCurrentId(parseInt(event.target.id))
            }
        })
    }

    return (
        <div className={`${styles["tool-choice_container"]} tool-choice_container`} id="toolsModal">
            <div className={`${styles["tool-choice__inner"]} tool-choice__inner`}>

                <ul className={styles.head} id="tools-children">
                    {array.map((elm, i) => {
                        return (
                            <li key={i} onClick={(event) => handleToolsClick(event)}>
                                <button
                                    id={elm.id}
                                    // className={`${isCurrentId === elm.id ? 'scale' : ""}`}
                                    data-scale={isCurrentId === elm.id && true}
                                >

                                    <img id={elm.id} src={elm.img} />
                                    {/* {isCurrentId === elm.id &&
                                    } */}
                                </button>
                            </li>
                        )
                    })}
                </ul>

                {array.map((elm, i) => {
                    return (
                        <div key={i}>
                            {isCurrentId === elm.id &&
                                <div className={`${styles.content}`}>
                                    <div>
                                        <h2>
                                            {elm.present ? "Tu utilises" : ""}
                                            {elm.past ? "Tu as utilisé" : ""}
                                            {elm.future ? "Tu vas utiliser" : ""}
                                            <br/>
                                            <span>{elm.title}</span>
                                        </h2>
                                        <div className={`${styles['content-display']} ${true === isOpen && styles.open}`}>
                                            <p>{elm.content}</p>
                                        </div>
                                    </div>

                                </div>
                            }
                        </div>
                    )
                })}

                <button onClick={handleContentClick} className={styles['open-button']}>
                    <span>Je veux en savoir plus !</span>
                    <i className={`fal fa-chevron-down ${true === isOpen && styles.rotate}`}></i>
                </button>

            </div>
        </div>
    );
}

export default TheToolChoiceButton;