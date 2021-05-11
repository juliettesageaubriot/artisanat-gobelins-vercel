export const SetupMenuChaptersRaycast = (menuGroup, objectsCurrentRaycast) => {

  menuGroup.children.map((objects, i) => {
    if (objects.name === "vitrail") {
      objectsCurrentRaycast.push(objects);
    } else if (objects.name === "collier") {
      objectsCurrentRaycast.push(objects)
    } else if (objects.name === "chapeau") {
      objectsCurrentRaycast.push(objects)
    } else if (objects.name === "contrebasse") {
      objectsCurrentRaycast.push(objects)
    }
  })
}
