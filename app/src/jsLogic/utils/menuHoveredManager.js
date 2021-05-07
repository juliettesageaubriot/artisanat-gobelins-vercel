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
        break;

      case "collier":
        this.currentID = 2
        this.textureID = 2
        this.soundID = 1
        break;

      case "contrebasse":
        this.currentID = 3
        this.textureID = 3
        this.soundID = 2
        break;

      case "chapeau":
        this.currentID = 4
        this.textureID = 4
        this.soundID = 3
        break;
    }

    return (this.currentID, this.textureID, this.soundID, this.newMaterial, this.currentMaterial);
  }
}