import * as THREE from "three";

import Model from 'src/Model/Model';
import { project3d } from 'src/Model/Projection3D';
import { IMappings } from 'src/UI/ViewBoxHeader';
import { Program } from './Program';

export default class CubicProgram extends Program {
  private meshes: any[] = [];

  constructor(public model: Model, public mappings: IMappings) {
    super();
  }

  public render() {
    super.render();
    // console.log("projecting ");
    const data = project3d(this.model, this.mappings);
    // console.log("total data for geometry = " + this.data.size);

    this.totalSize = this.cellSize * this.model.matrixSize;

    const materialsMap = new Map();

    const getMatrerial = (color: any) => {
      const existing = materialsMap.get(color);

      if (existing) {
        return existing;
      } else {
        const material = new THREE.MeshLambertMaterial({
          color: new THREE.Color(color.r / 255, color.g / 255, color.b / 255)
        });
        materialsMap.set(color, material);
        return material;
      }
    };

    // console.log("generating geometry");
    // console.log(this.data.size);

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    for (const box of Array.from(data)) {
      const x = -this.totalSize / 2 + (box.x + 1 / 2) * this.cellSize;
      const y = -this.totalSize / 2 + (box.y + 1 / 2) * this.cellSize;
      const z = -this.totalSize / 2 + (box.z + 1 / 2) * this.cellSize;

      const mat = getMatrerial(box.color);
      // console.log(mat);
      const mesh = new THREE.Mesh(geometry, mat);
      this.meshes.push(mesh)
      mesh.position.set(x, y, z);
      this.scene.add(mesh);
    }

    // this.setupLight();
    // this.addGrid();
    this.renderer.render(this.scene, this.camera);
  }
}
