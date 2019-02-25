import { Model } from 'src/Model/Model';
import * as THREE from 'three';
import { Plane } from './Plane';
import { Program } from './Program';

export class PlaneProgram extends Program {
    constructor(public model: Model, private plane: Plane) {
        super();
    }

    public render() {
        const {matrixSize, start, step} = this.model.properties;

        super.render();
        this.totalSize = this.cellSize * matrixSize;

        const material = new THREE.MeshLambertMaterial({
            color: new THREE.Color()
        });


        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const {A, B, C, D} = this.plane;

        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                const xr = start.xr + step * i + step / 2;
                const xi = start.xi + step * j + step / 2;
                const yy = (A * xr + C * xi + D) / B;


                let x = (xr - start.xr) / step;
                let y = (yy - start.yr) / step;
                let z = (xi - start.xi) / step;

                x = -this.totalSize / 2 + (x + 1 / 2) * this.cellSize;
                y = -this.totalSize / 2 + (y + 1 / 2) * this.cellSize;
                z = -this.totalSize / 2 + (z + 1 / 2) * this.cellSize;


                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, y, z);
                this.scene.add(mesh);
            }
        }


        this.renderer.render(this.scene, this.camera.camera);
    }
}