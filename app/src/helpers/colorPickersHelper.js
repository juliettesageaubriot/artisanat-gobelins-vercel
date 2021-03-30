export const SetupColorPicker = (parent, objectToTest, vitrailObjects) => {

  parent.children.map((objects, i) => {

    if (objects.name === "cubes") {
      let vitrailCubes = objects.children;
      for (let vitrailCube of vitrailCubes) {
        objectToTest.push(vitrailCube);
        vitrailObjects.push(vitrailCube.name);
      }
    } else if (objects.name === "rectangles") {
      let vitrailRectangles = objects.children;
      for (let vitrailRectangle of vitrailRectangles) {
        objectToTest.push(vitrailRectangle);
        vitrailObjects.push(vitrailRectangle.name);
      }
    } else if (objects.name === "losange") {
      let vitrailLosange = objects;
      objectToTest.push(vitrailLosange);
      vitrailObjects.push(vitrailLosange.name);

    } else if (objects.name === "colorPicker") {
      let colorPickers = objects.children;
      for (let colorPicker of colorPickers) {
        objectToTest.push(colorPicker);
      }
    }
  })

}