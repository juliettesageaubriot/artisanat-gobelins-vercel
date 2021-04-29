export default class MenuHoveredManager {
  constructor(currentID) {
    this.currentID = currentID;
  }

  SetCurrentIdHovered(name) {
    switch (name) {
      case "vitrail_1":
        this.currentID = 1
        this.textureID = 0
        this.soundID = 0
        break;
      case "vitrail_2":
        this.currentID = 1
        this.textureID = 1
        this.soundID = 0
        break;

      case "collier_1":
        this.currentID = 2
        this.textureID = 2
        this.soundID = 1
        break;
      case "collier_2":
        this.currentID = 2
        this.textureID = 3
        this.soundID = 1
        break;

      case "violoncelle":
        this.currentID = 3
        this.textureID = 4
        this.soundID = 2
        break;

      case "chapeau":
        this.currentID = 4
        this.textureID = 5
        this.soundID = 3
        break;
    }

    return (this.currentID, this.textureID, this.soundID, this.newMaterial, this.currentMaterial);
  }
}