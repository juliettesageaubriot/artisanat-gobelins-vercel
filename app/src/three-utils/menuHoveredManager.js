export default class MenuHoveredManager {
  constructor(currentID) {
    this.currentID = currentID;
  }

  SetCurrentIdHovered(name) {
    switch (name) {
      case "vitrail_1":
        this.currentID = 1
        this.newMaterial = '/assets/textures/menu/newMaterials/vitrail_plomb_baseColor.png'
        this.currentMaterial = '/assets/textures/menu/currentMaterials/vitrail_plomb_baseColor.png'
        break;
      case "vitrail_2":
        this.currentID = 1
        this.newMaterial = '/assets/textures/menu/newMaterials/vitrail_verre_baseColor.png'
        this.currentMaterial = '/assets/textures/menu/currentMaterials/vitrail_verre_baseColor.png'
        break;

      case "collier_1":
        this.currentID = 2
        this.newMaterial = '/assets/textures/menu/newMaterials/collier_baseColor.png'
        this.currentMaterial = '/assets/textures/menu/currentMaterials/collier_baseColor.png'
        break;
      case "collier_2":
        this.currentID = 2
        this.newMaterial = '/assets/textures/menu/newMaterials/buste_baseColor.png'
        this.currentMaterial = '/assets/textures/menu/currentMaterials/buste_baseColor.png'
        break;

      case "violoncelle":
        this.currentID = 3
        this.newMaterial = '/assets/textures/menu/newMaterials/contreBasse_baseColor.png'
        this.currentMaterial = '/assets/textures/menu/currentMaterials/contreBasse_baseColor.png'
        break;

      case "chapeau":
        this.currentID = 4
        this.newMaterial = '/assets/textures/menu/newMaterials/chapeau_baseColor.png'
        this.currentMaterial = '/assets/textures/menu/currentMaterials/chapeau_baseColor.png'
        break;
    }

    return (this.currentID, this.newMaterial, this.currentMaterial);
  }
}