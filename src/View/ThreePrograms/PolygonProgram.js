import * as THREE from "three";

import Projection3D from "Model/Projection3D";
import CubicProgram from "ThreePrograms/CubicProgram";

export default class PolygonPrograms extends CubicProgram {
  constructor(model, mappings) {
    super(model, mappings);
  }

  render() {
    console.log("projecting ");
    this.projection = new Projection3D(this.model, 1, this.mappings);
    console.log("total model data = " + this.model.data.size);
    this.data = this.projection.projData;
    console.log("total data for geometry = " + this.data.size);

    this.cellSize = 1;
    this.totalSize = this.cellSize * this.model.matrixSize;

    // remove all objects
    console.log("scene = " + this.scene);
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    console.log("program setup");

    const materialsMap = new Map();
    let defaultMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(1, 1, 1),
      side: THREE.DoubleSide
      //wireframe: true
    });
    const getMatrerial = color => {
      let existing = materialsMap.get(color);

      if (existing) {
        return existing;
      } else {
        let material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color.r / 255, color.g / 255, color.b / 255)
        });
        materialsMap.set(color, material);
        return material;
      }
    };
    let chunks = new Map();
    console.log(this.data);
    for (let data of this.data) {
      const index = "c" + data.curve + "f" + data.formula;
      let chunk = chunks.get(index);
      if (!chunk) {
        chunks.set(index, []);
      }
      chunks.get(index).push(data);
    }
    console.log(chunks);

    for (let [chunk_label, chunk] of chunks) {
      let geometry = new THREE.Geometry();
      let maxX = -10000,
        minX = 10000;
      let i = 0;
      for (let box of chunk) {
        const x = -this.totalSize / 2 + box.x * this.cellSize;
        const y = -this.totalSize / 2 + box.y * this.cellSize;
        const z = -this.totalSize / 2 + box.z * this.cellSize;
        geometry.vertices.push(new THREE.Vector3(x, y, z));
        box.id = i++;
        maxX = Math.max(maxX, box.x);
        minX = Math.min(minX, box.x);
      }

      let grid = [];
      for (let x = minX; x < maxX; x++) {
        if (!grid[x]) grid[x] = [];
      }
      for (let box of chunk) {
        if (!grid[box.x]) {
          grid[box.x] = [];
        }
        if (grid[box.x][box.z]) console.log("extra");
        grid[box.x][box.z] = box;
      }

      let used = new Set();
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

      console.log(grid);
      geometry.computeFaceNormals();
      geometry.computeVertexNormals();
      let mesh = new THREE.Mesh(geometry, defaultMaterial);
      this.addGrid();
      this.scene.add(mesh);
    }

    this.light = new THREE.DirectionalLight(0xff00ff, 0.7);
    this.glight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.3);
    this.light.position.set(0, 0, 1).normalize();
    this.light.castShadow = true;
    this.scene.add(this.light);
    this.scene.add(this.glight);

    this.renderer.render(this.scene, this.camera);
  }

  setup(renderer, scene, camera) {
    console.log("setup");
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
  }
}
