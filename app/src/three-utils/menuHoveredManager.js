export default class MenuHoveredManager {
  constructor(currentID) {
    this.currentID = currentID;
  }

  SetCurrentIdHovered(name) {

    switch (name) {
      case "vitrail_1":
        this.currentID = 1
        break;
      case "vitrail_2":
        this.currentID = 1
        break;

      case "collier_1":
        this.currentID = 2
        break;
      case "collier_2":
        this.currentID = 2
        break;

      case "violoncelle":
        this.currentID = 3
        break;

      case "chapeau":
        this.currentID = 4
        break;

      default:
        this.currentID = 0
    }

    return this.currentID;
  }
}