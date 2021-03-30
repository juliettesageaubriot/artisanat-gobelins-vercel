export const SetupColorPicker = (parent, objectToTest, vitrailObjects) => {

  //Add ColorPicker
  let colorPickers = parent.children[0].children;
  for (let colorPicker of colorPickers) {
    objectToTest.push(colorPicker);
    // vitrailObjects.push(colorPicker.name);
  }

  //Add Vitrail cube
  let vitrailCubes = parent.children[2].children;
  for (let vitrailCube of vitrailCubes) {
    objectToTest.push(vitrailCube);
    vitrailObjects.push(vitrailCube.name);
  }

  //Add Vitrail rectangles
  let vitrailRectangles = parent.children[1].children;
  for (let vitrailRectangle of vitrailRectangles) {
    objectToTest.push(vitrailRectangle);
    vitrailObjects.push(vitrailRectangle.name);
  }

  //Add Vitrail Losange
  let vitrailLosange = parent.children[3];
  objectToTest.push(vitrailLosange);
  vitrailObjects.push(vitrailLosange.name);
  
}