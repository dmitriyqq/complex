import * as THREE from 'three';

export interface IProgram {
    setup(renderer: THREE.Renderer, scene: THREE.Scene, camera: THREE.Camera): void;
    render (): void;
    update (): void;
}