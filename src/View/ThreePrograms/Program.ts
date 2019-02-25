import * as THREE from "three";

import { Mesh } from 'three';
import { IProgram } from './IProgram';

import fontProvider from 'src/FontProvider';

import { TrackCam } from 'src/Lib/TrackCam';


const DEFAULT_NAMES = {
  x: 'x',
  y: 'y',
  z: 'z',
}

export interface IAxiesNames {
  x: string;
  y: string;
  z: string;
}

export class Program implements IProgram {
  public ready: boolean = false;

  protected cellSize: number;
  protected totalSize: number;

  protected renderer: THREE.Renderer;
  protected camera: TrackCam;
  protected scene: THREE.Scene;

  private gridMaterial: THREE.LineBasicMaterial;
  private xAxiesMaterial: THREE.LineBasicMaterial;
  private yAxiesMaterial: THREE.LineBasicMaterial;
  private zAxiesMaterial: THREE.LineBasicMaterial;

  private light: THREE.Light;
  private glight: THREE.Light;

  private xMesh: THREE.Mesh;
  private yMesh: THREE.Mesh;
  private zMesh: THREE.Mesh;

  constructor(private names: IAxiesNames = DEFAULT_NAMES, private needGrid: boolean = true, private needAxies: boolean = true, private needText = true) {

    const linewidth = 2;

    this.gridMaterial = new THREE.LineBasicMaterial({
      color: 0xaaaaaa,
      opacity: 0.1,
      transparent: true,
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

  public setupLight() {
    this.light = new THREE.DirectionalLight(0xffffff, 0.6);
    this.glight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);

    this.light.position.set(0, 0, 1).normalize();
    this.light.castShadow = true;
    this.scene.add(this.light);
    this.scene.add(this.glight);
  }

  public render() {

    this.clearScene();
    this.setupLight();

    if (this.needGrid) {
      this.addGrid();
    }

    this.update();
  }

  public setup(renderer: THREE.Renderer, scene: THREE.Scene, camera: TrackCam): void {
    this.renderer = renderer;

    this.scene = scene;
    this.scene.background = new THREE.Color(1.0, 1.0, 1.0);

    this.camera = camera;
    this.setupLight();
    this.ready = true;
  }


  public clearScene() {
    THREE.Cache.clear();
    if (!this.scene) {
      return;
    }
    // TODO fix memory leak
    if (this.scene && this.scene.children) {
      const scene = this.scene;
      for (let i = scene.children.length - 1; i >= 0; i--) {
        const obj: any = scene.children[i];

        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (obj.material) {
          obj.material.dispose();
        }
        if (obj.texture) {
          obj.texture.dispose();
        }
        scene.remove(obj);
        // delete scene.children[i];
      }
    }
    // delete this.scene
  }

  public setCameraPostion(cameraT: number, cameraA: number): any {
    this.camera.setPosition(cameraA, cameraT);
    this.update();
  }

  public update() {
    if (this.light) {
      this.light.position.copy(this.camera.camera.position);
    }

    if (this.renderer) {
      this.renderer.render(this.scene, this.camera.camera);
    }

    if (this.needText) {
      this.updateTextPosition();
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
    const coneGeometry = new THREE.ConeGeometry(0.8, 10, 16);

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
    const halfSize = totalSize / 2;

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
      if (this.needGrid) {
        planeGrid(mp);
        const lines = new THREE.LineSegments(gridGeometry, this.gridMaterial);
        this.scene.add(lines);
      }
    }

    if (this.needAxies) {
      addLine(-halfSize, 0, halfSize, 0, mapLineY, xAxiesGeometry);
      addLine(0, -halfSize, 0, halfSize, mapLineZ, yAxiesGeometry);
      addLine(0, -halfSize, 0, halfSize, mapLineY, zAxiesGeometry);

      addCone(halfSize, 0, 0, this.xAxiesMaterial, (mesh: THREE.Mesh) => mesh.rotateZ(-Math.PI / 2));
      addCone(0, halfSize, 0, this.yAxiesMaterial, (mesh: THREE.Mesh) => mesh);
      addCone(0, 0, halfSize, this.zAxiesMaterial, (mesh: THREE.Mesh) => mesh.rotateX(Math.PI / 2));


      this.scene.add(new THREE.LineSegments(xAxiesGeometry, this.xAxiesMaterial));
      this.scene.add(new THREE.LineSegments(yAxiesGeometry, this.yAxiesMaterial));
      this.scene.add(new THREE.LineSegments(zAxiesGeometry, this.zAxiesMaterial));
    }

    if (this.needText) {
      const font = fontProvider.getFont();
      // tslint:disable-next-line:no-console
      const textParams = {
        curveSegments: 12,
        font,
        height: 0.3,
        size: 5,
      };

      if (font) {
        const xTextGeometry = new THREE.TextGeometry(this.names.x, textParams);
        const yTextGeometry = new THREE.TextGeometry(this.names.y, textParams);
        const zTextGeometry = new THREE.TextGeometry(this.names.z, textParams);

        const xMesh = new Mesh(xTextGeometry, this.xAxiesMaterial);
        xMesh.position.set(halfSize, 3, 0);
        this.scene.add(xMesh);

        const yMesh = new Mesh(yTextGeometry, this.yAxiesMaterial);
        yMesh.position.set(3, halfSize, 0);
        this.scene.add(yMesh);

        const zMesh = new Mesh(zTextGeometry, this.zAxiesMaterial);
        zMesh.position.set(0, 3, halfSize);
        this.scene.add(zMesh);

        this.xMesh = xMesh;
        this.yMesh = yMesh;
        this.zMesh = zMesh;

        this.updateTextPosition();
      }
    }
  }

  private updateTextPosition() {
    if (this.xMesh && this.yMesh && this.zMesh) {
      this.xMesh.quaternion.copy(this.camera.camera.quaternion);
      this.yMesh.quaternion.copy(this.camera.camera.quaternion);
      this.zMesh.quaternion.copy(this.camera.camera.quaternion);
    }
  }
}
