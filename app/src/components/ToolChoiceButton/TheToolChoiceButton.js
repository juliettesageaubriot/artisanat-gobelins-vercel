import { useEffect, useState } from 'react';
import styles from './styles.module.scss'

const TheToolChoiceButton = ({ array }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isCurrentId, setIsCurrentId] = useState(0)

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
        <div className={styles["tool-choice_container"]}>
            <div className={styles["tool-choice__inner"]}>

                <ul className={styles.head}>
                    {array.map((elm, i) => {
                        return (
                            <li key={i} onClick={(event) => handleToolsClick(event)}>
                                <button>
                                    {isCurrentId === elm.id ?
                                        <img id={elm.id} src={elm.activeImg} />
                                        :
                                        <img id={elm.id} src={elm.noActiveImg} />
                                    }
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
                                            Tu utilises <br />
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