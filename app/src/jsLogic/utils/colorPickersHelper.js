import * as THREE from 'three';

export const SetupColorPicker = (vitrailGroup, objectToTest, vitrailObjects, crayonnes, samples) => {
  const textureLoader = new THREE.TextureLoader()

  const textures = Promise.all([
    textureLoader.load('/assets/textures/colorPicker/crayonnes/crayonnés_carré_extérieur.jpg'), 
    textureLoader.load('/assets/textures/colorPicker/crayonnes/crayonnés_rectangle.jpg'), 
    textureLoader.load('/assets/textures/colorPicker/crayonnes/crayonnés_carré_arrondis.jpg'),
    textureLoader.load('/assets/textures/colorPicker/crayonnes/crayonnés_carré_central.jpg')
  ], (resolve, reject) => {

    resolve(textures);

  }).then(result => {
    console.log(result)
    
    vitrailGroup.children.map((objects, i) => {
      if(objects.name.toLowerCase().includes("verre")) {
        //échantillons de verre
        objectToTest.push(objects);
        samples.push(objects.name);

      } else if(objects.name.toLowerCase().includes("vitrail")) {
        //vitrail posé
        objectToTest.push(objects);
        vitrailObjects.push(objects.name);

      } else if(objects.name.toLowerCase().includes("couleur")) {
        crayonnes.push(objects);
        
        //Ajout des textures en alphaMap pour les crayonnés
        objects.material.transparent = true;
        if(objects.name.toLowerCase().includes("carre")) {
          objects.material.alphaMap = result[0];
        } else if(objects.name.toLowerCase().includes("rectangle")) {
          objects.material.alphaMap = result[1];
        } else if(objects.name.toLowerCase().includes("cercle")) {
          objects.material.alphaMap = result[2];
        } else if(objects.name.toLowerCase().includes("etoile")) {
          objects.material.alphaMap = result[3];
        }
      }
    })
  });

}