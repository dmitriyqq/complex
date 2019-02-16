import * as THREE from "three";

import { IProgram } from './IProgram';

export class Program implements IProgram {
  protected cellSize: number;
  protected totalSize: number;

  protected renderer: THREE.Renderer;
  protected camera: THREE.Camera;
  protected scene: THREE.Scene;

  private needGrid: boolean = true;
  // private needAxies: boolean = true;

  private gridMaterial: THREE.LineBasicMaterial;
  private xAxiesMaterial: THREE.LineBasicMaterial;
  private yAxiesMaterial: THREE.LineBasicMaterial;
  private zAxiesMaterial: THREE.LineBasicMaterial;

  private xAxiesGeometry: THREE.Geometry;
  private yAxiesGeometry: THREE.Geometry;
  private zAxiesGeometry: THREE.Geometry;
  private gridGeometry: THREE.Geometry;
  // private coneGeometry: THREE.Geometry;

  private light: THREE.Light;
  private glight: THREE.Light;

  constructor() {

    const linewidth = 2;

    this.gridMaterial = new THREE.LineBasicMaterial({
      color: 0xaaaaaa,
    });
    this.xAxiesMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth
    });
    this.yAxiesMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff00,
      linewidth
    });
    this.zAxiesMaterial = new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth
    });

    this.cellSize = 1;
  }

  public setupLight(){
    this.light = new THREE.DirectionalLight(0xffffff, 0.6);
    this.glight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);

    this.light.position.set(0, 0, 1).normalize();
    this.light.castShadow = true;
    this.scene.add(this.light);
    this.scene.add(this.glight);
  }

  public render() {
    
    // console.log("projecting ");
    // const data = project3d(this.model, this.mappings);
    // console.log("total data for geometry = " + this.data.size);

    // this.totalSize = this.cellSize * this.model.matrixSize;

    // remove all objects
    while (this.scene && this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    // console.log("generating geometry");
    // console.log(this.data.size);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);

    // for (const box of Array.from(data)) {
    //   const x = -this.totalSize / 2 + (box.x + 1 / 2) * this.cellSize;
    //   const y = -this.totalSize / 2 + (box.y + 1 / 2) * this.cellSize;
    //   const z = -this.totalSize / 2 + (box.z + 1 / 2) * this.cellSize;

    //   const mat = getMatrerial(box.color);
    //   // console.log(mat);
    //   const mesh = new THREE.Mesh(geometry, mat);
    //   this.meshes.push(mesh)
    //   mesh.position.set(x, y, z);
    //   this.scene.add(mesh);
    // }
    this.update();
    this.setupLight();
    this.addGrid();
  }

  public setup(renderer: THREE.Renderer, scene: THREE.Scene, camera: THREE.Camera): void {
    // console.log("setup");
    this.renderer = renderer;

    this.scene = scene;
    this.scene.background = new THREE.Color(1.0, 1.0, 1.0);

    this.camera = camera;
    this.setupLight();
  }


  public clearScene(){
    try{
      this.xAxiesGeometry.dispose();
      this.yAxiesGeometry.dispose();
      this.zAxiesGeometry.dispose();
      this.gridGeometry.dispose();

    } catch (err){
      // console.log(err);
    }

    if(!this.scene) {
      return;
    }
    // TODO fix memory leak
    if(this.scene && this.scene.children){
      const scene = this.scene;
      for ( let i = scene.children.length - 1; i >= 0 ; i-- ) {
        const obj: any = scene.children[i];

        if(obj.geometry){
          obj.geometry.dispose();
        }
        if(obj.material){
          obj.material.dispose();
        }
        if(obj.texture){
          obj.texture.dispose();
        }
        scene.remove(obj);
        // delete scene.children[i];
      }
    }
    // delete this.scene
  }

  public update() {
    if(this.light) {
      this.light.position.copy(this.camera.position);
    }

    if(this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  public addGrid() {
    // const mapLineX = (x, y) => new THREE.Vector3(0, x, y);
    const mapLineY = (x: number, y: number) => new THREE.Vector3(x, 0, y);
    const mapLineZ = (x: number, y: number) => new THREE.Vector3(x, y, 0);

    const gridGeometry = new THREE.Geometry();
    const xAxiesGeometry = new THREE.Geometry();
    const yAxiesGeometry = new THREE.Geometry();
    const zAxiesGeometry = new THREE.Geometry();
    const coneGeometry = new THREE.ConeGeometry( 0.8, 10, 16 );

    const addLine = (x1: number, y1: number, x2: number, y2: number, mapLine: any, geometry: any) => {
      geometry.vertices.push(mapLine(x1, y1), mapLine(x2, y2));
    };

    const addCone = (x: number, y: number, z: number, mat: any, rotate: any) => {
      const mesh = new THREE.Mesh(coneGeometry, mat);
      rotate(mesh)
      mesh.position.set(x, y, z);
      this.scene.add(mesh);
    };

    const totalSize = 100;

    const planeGrid = (mapLine: any) => {
      for (let i = 0; i < totalSize; i++) {
        for (let j = 0; j < totalSize; j++) {
          const x = -totalSize / 2 + i * this.cellSize;
          const y = -totalSize / 2 + j * this.cellSize;
          addLine(x, y, x + this.cellSize, y, mapLine, gridGeometry);
          addLine(
            x + this.cellSize,
            y,
            x + this.cellSize,
            y + this.cellSize,
            mapLine,
            gridGeometry
          );
          addLine(
            x + this.cellSize,
            y + this.cellSize,
            x,
            y + this.cellSize,
            mapLine,
            gridGeometry
          );
          addLine(x, y + this.cellSize, x, y, mapLine, gridGeometry);
        }
      }
    };

    const mappings = [mapLineY];
    for (const mp of mappings) {
      if (this.needGrid){
        planeGrid(mp);
      }
    }

    addLine(-100, 0, 100, 0, mapLineY, xAxiesGeometry);
    addLine(0, -100, 0, 100, mapLineZ, yAxiesGeometry);
    addLine(0, -100, 0, 100, mapLineY, zAxiesGeometry);

    addCone(50, 0, 0, this.xAxiesMaterial, (mesh: THREE.Mesh) => mesh.rotateZ(-Math.PI/2));
    addCone(0, 50-2, 0, this.yAxiesMaterial, (mesh: THREE.Mesh) => mesh);
    addCone(0, 0, 50, this.zAxiesMaterial, (mesh: THREE.Mesh) => mesh.rotateX(Math.PI/2));

    const lines = new THREE.LineSegments(gridGeometry, this.gridMaterial);
    this.scene.add(lines);
    this.scene.add(new THREE.LineSegments(xAxiesGeometry, this.xAxiesMaterial));
    this.scene.add(new THREE.LineSegments(yAxiesGeometry, this.yAxiesMaterial));
    this.scene.add(new THREE.LineSegments(zAxiesGeometry, this.zAxiesMaterial));

    this.xAxiesGeometry = xAxiesGeometry;
    this.yAxiesGeometry = yAxiesGeometry;
    this.zAxiesGeometry = zAxiesGeometry;
    this.gridGeometry = gridGeometry;
    // this.coneGeometry = coneGeometry;
  }
}
