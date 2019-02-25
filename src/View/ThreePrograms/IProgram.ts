import { TrackCam } from 'src/Lib/TrackCam';
import * as THREE from 'three';

export interface IProgram {
    setup(renderer: THREE.Renderer, scene: THREE.Scene, camera: TrackCam): void;
    render (): void;
    update (): void;
}