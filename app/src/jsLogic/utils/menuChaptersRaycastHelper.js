export const SetupMenuChaptersRaycast = (menuGroup, chaptersTestObject) => {

  menuGroup.children.map((objects, i) => {

    if (objects.name === "vitrail") {
      chaptersTestObject.push(objects)
    } else if (objects.name === "collier") {
      chaptersTestObject.push(objects)
    } else if (objects.name === "chapeau") {
      chaptersTestObject.push(objects)
    } else if (objects.name === "contrebasse") {
      chaptersTestObject.push(objects)
    }
  })
}
