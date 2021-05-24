//vendors
// import localforage from "localforage";
import toolsData from '@assets/data/tools.json';

export default class ToolsManager {
  constructor() {
  }

  setTools(visible) {
    const toolsElm = document.getElementById('toolsModal')
    if (visible === true) {
      toolsElm.classList.add('visible')
    } else if (visible === false) {
      toolsElm.classList.remove('visible')
    }
  }

  currentTools(arrayTool, currentToolID) {
    // console.log(toolsData);
    const toolsList = document.getElementById('tools-children')
    const toolTitle = document.querySelector('.toolTitle')

    let toolsArray
    let toolsArrayCurrent

    switch (arrayTool) {
      case 0:
        toolsArray = toolsData.toolsArray0
        toolsArrayCurrent = toolsData.toolsArray0[currentToolID - 1]
        break;
      case 1:
        toolsArray = toolsData.toolsArray1
        toolsArrayCurrent = toolsData.toolsArray1[currentToolID - 1]
        break;
      case 2:
        toolsArray = toolsData.toolsArray2
        toolsArrayCurrent = toolsData.toolsArray2[currentToolID - 1]
        break;
    }
    // console.log(toolsData);

    toolsArray.map((elm) => {
      if (elm.id === currentToolID) {
        // console.log('current', elm);
        toolsList.childNodes[elm.id - 1].children[0].classList.add('actived')
        elm.past = false
        elm.present = true
        elm.future = false
      } else {
        // console.log('others', elm);
        toolsList.childNodes[elm.id - 1].children[0].classList.remove('actived')
      }

      if (elm.id > currentToolID) {
        //future
        elm.past = false
        elm.present = false
        elm.future = true
      } else if (elm.id < currentToolID) {
        //past
        elm.past = true
        elm.present = false
        elm.future = false
      }

    })
  }
}