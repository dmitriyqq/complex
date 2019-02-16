import Model from 'src/Model/Model';
import * as THREE from 'three';
import { Plane } from './Plane';
import { Program } from './Program';

export class PlaneProgram extends Program {
    constructor(public model: Model, private plane: Plane) {
        super();
    }

    public render() {
        // const data = project3d(this.model, this.mappings);
        // console.log("total data for geometry = " + this.data.size);
        super.render();
        this.totalSize = this.cellSize * this.model.matrixSize;


        const material = new THREE.MeshLambertMaterial({
            color: new THREE.Color()
        });

        // console.log("generating geometry");
        // console.log(this.data.size);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const p = this.plane;
        const model = this.model;

        for (let i = 0; i < model.matrixSize; i++) {
            for (let j = 0; j < model.matrixSize; j++) {
                const xr = model.start.xr + model.step * i + model.step / 2;
                const xi = model.start.xi + model.step * j + model.step / 2;
                const yy = (p.A * xr + p.C * xi + p.D) / p.B;


                let x = (xr - model.start.xr) / model.step;
                let y = (yy - model.start.yr) / model.step;
                let z = (xi - model.start.xi) / model.step;

                x = -this.totalSize / 2 + (x + 1 / 2) * this.cellSize;
                y = -this.totalSize / 2 + (y + 1 / 2) * this.cellSize;
                z = -this.totalSize / 2 + (z + 1 / 2) * this.cellSize;


                const mesh = new THREE.Mesh(geometry, material);
                //   this.meshes.push(mesh)
                mesh.position.set(x, y, z);
                this.scene.add(mesh);
            }
        }


        this.renderer.render(this.scene, this.camera);
    }
}