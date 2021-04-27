export const SetupMenuChaptersRaycast = (menuGroup, chaptersTestObject) => {

  menuGroup.children.map((objects, i) => {

    if (objects.name === "vitrail") {
      let vitrailElements = objects.children;
      for (let vitrailElement of vitrailElements) {
        chaptersTestObject.push(vitrailElement)
      }
    } else if (objects.name === "collier") {
      let collierElements = objects.children;
      for (let collierElement of collierElements) {
        chaptersTestObject.push(collierElement)
      }
    } else if (objects.name === "chapeau") {
      chaptersTestObject.push(objects)
    } else if (objects.name === "violoncelle") {
      chaptersTestObject.push(objects)
    }
  })

}
