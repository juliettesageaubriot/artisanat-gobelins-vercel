export default class MenuHoveredManager {
  constructor(currentID) {
    this.currentID = currentID;
  }

  SetCurrentIdHovered(name) {
    switch (name) {
      case "vitrail":
        this.currentID = 1
        this.textureID = 0
        this.soundID = 0
        this.url = "/single-ateliers"
        break;

      case "collier":
        this.currentID = 2
        this.textureID = 2
        this.soundID = 1
        this.url = "",
        this.x = 4.7,
        this.y = 1
        this.z = 3
        break;

      case "contrebasse":
        this.currentID = 3
        this.textureID = 3
        this.soundID = 2
        this.url = "",
        this.x = 3.77,
        this.y = 0.7
        this.z = 2.2
        break;

      case "chapeau":
        this.currentID = 4
        this.textureID = 4
        this.soundID = 3
        this.url = "",
        this.x = 2.75,
        this.y = 1.1
        this.z = 1
        break;
    }

    return (this.currentID, this.textureID, this.soundID, this.url, this.x, this.y, this.z, this.newMaterial, this.currentMaterial);
  }
}