import { Program } from 'src/View/ThreePrograms/Program';
import * as THREE from "three";

import { Mappings } from 'src/Lib/Mappings';
import { Model } from 'src/Model/Model';
import { project3d } from "../../Model/Projection3D";

export class PolygonProgram extends Program {
  constructor(public model: Model, public mappings: Mappings) {
    super();
    // super(model, mappings);
  }

  public render() {
    super.render();
    const { matrixSize } = this.model.properties;
    const data = project3d(this.model, this.mappings);

    this.cellSize = 1;
    this.totalSize = this.cellSize * matrixSize;

    const materialsMap = new Map();

    const getMatrerial = (color: any) => {
      const existing = materialsMap.get(color);
      if (existing) {
        return existing;
      } else {
        const material = new THREE.MeshLambertMaterial({
          color: new THREE.Color(color.r / 255, color.g / 255, color.b / 255),
          side: THREE.DoubleSide,
          // wireframe: true
        });
        materialsMap.set(color, material);
        return material;
      }
    };

    const chunks = new Map();
    for (const d of Array.from(data)) {
      const index = "c" + d.curve + "f" + d.formula;

      const chunk = chunks.get(index);
      if (!chunk) {
        chunks.set(index, []);
      }

      chunks.get(index).push(d);
    }

    for (const [, chunk] of Array.from(chunks)) {
      const geometry = new THREE.Geometry();

      let n = 0;
      let m = 0;

      const grid: any[][] = [];
      {
        let i = 0;
        for (const box of chunk) {
          n = Math.max(n, box.i);
          m = Math.min(m, box.j);

          const x = -this.totalSize / 2 + (box.x + 1 / 2) * this.cellSize;
          const y = -this.totalSize / 2 + (box.y + 1 / 2) * this.cellSize;
          const z = -this.totalSize / 2 + (box.z + 1 / 2) * this.cellSize;
          geometry.vertices.push(new THREE.Vector3(x, y, z));
          box.id = i++;

          if (!grid[box.i]) {
            grid[box.i] = [];
          }

          grid[box.i][box.j] = box;
        }
      }

      for (let i = 0; i < grid.length - 1; i++) {
        for (let j = 0; j < grid.length - 1; j++) {
          if (grid[i][j] && grid[i][j + 1] && grid[i + 1][j]) {
            geometry.faces.push(
              new THREE.Face3(
                grid[i][j].id,
                grid[i][j + 1].id,
                grid[i + 1][j].id
              )
            );
          }
          if (grid[i + 1][j + 1] && grid[i][j + 1] && grid[i + 1][j]) {
            geometry.faces.push(
              new THREE.Face3(
                grid[i + 1][j + 1].id,
                grid[i + 1][j].id,
                grid[i][j + 1].id
              )
            );
          }
        }
      }

      geometry.computeFaceNormals();
      geometry.computeVertexNormals();

      let material;
      material = getMatrerial(0);

      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
    }

    this.renderer.render(this.scene, this.camera.camera);
  }
}
