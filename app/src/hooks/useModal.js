import { useState, useEffect } from "react";
import Howler from 'react-howler';


const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  }
  
  return {
    isShowing,
    toggle
  };
};

export default useModal;