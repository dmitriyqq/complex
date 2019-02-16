import * as THREE from "three";

import store from "src/Redux/store";

import { Action } from "src/Constants";

export type ProjectionType = 'Ortho' | 'Proj'

export type CameraID = 'global' | number;

interface ICameraConfig {
  cameraT: number;
  cameraA: number;
  cameraR: number;
}

export default class TrackCam {
  public camera: THREE.Camera;
  private cameraT = -Math.PI / 2;
  private cameraA = 2;
  private cameraR = 60;
  private lastMouse = { x: 0, y: 0 };
  private mount: HTMLElement;  
  private rotating: boolean;
  private subscribers: Array<()=>void> = [];

  constructor(width: number, height: number, private type: ProjectionType, config?: ICameraConfig) {
    this.type = type;

    if (this.type === "Ortho") {
      this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 2000);
    } else {
      this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    }

    // const conf = store.getState().Cams[this.id];
    if (config) {
      this.cameraT = config.cameraT;
      this.cameraA = config.cameraA;
      this.cameraR = config.cameraR;
    }
    this.update();
  }

  public setup(mount: HTMLElement) {
    this.mount = mount;

    this.rotating = false;

    this.mount.addEventListener("mouseup", () => {
      this.rotating = false;
        store.dispatch({
            config: {
                cameraA: this.cameraA,
                cameraR: this.cameraR,
                cameraT: this.cameraT,
            },
            type: Action.UPDATE_CAMERA,
        });
    });

    this.mount.addEventListener("mousedown", e => {
      this.rotating = true;
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });

    this.mount.addEventListener("mousemove", e => {
      e.preventDefault();
      const dx = e.clientX - this.lastMouse.x;
      const dy = e.clientY - this.lastMouse.y;

      if (this.rotating) {
        if (Math.abs(dx) > Math.abs(dy)) {
          this.cameraT -= 0.01 * dx;
        } else {
          this.cameraA += 0.01 * dy;
          if (this.cameraA > Math.PI / 2) { 
              this.cameraA = Math.PI / 2;
          }
          else if (this.cameraA < -Math.PI / 2) {
              this.cameraA = -Math.PI / 2;
          }
        }
        this.update();
      }
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });

    this.mount.addEventListener("mousewheel",
      (e: WheelEvent) => {
        this.cameraR += e.deltaY * 0.05;
        this.update();
      },
      { passive: true }
    );
  }

  public update() {
    if (this.type === "Ortho") {
      const camera = this.camera as THREE.OrthographicCamera;
      camera.zoom = 500 / this.cameraR;
      camera.updateProjectionMatrix();
    }

    this.camera.position.set(
      this.cameraR * Math.sin(this.cameraT),
      this.cameraR * Math.sin(this.cameraA),
      this.cameraR * Math.cos(this.cameraT)
    );

    this.camera.lookAt(0, 0, 0);
    
    if (this.subscribers) { 
      for (const sub of this.subscribers) { 
        sub();
      }
    }
  }

  public addSubscriber(subscriber: () => void) {
    if (!this.subscribers) {
        this.subscribers = [];
    }
    this.subscribers.push(subscriber);
  }

  public dispose(){
    this.mount.removeEventListener("mouseup", () => ({}));
    this.mount.removeEventListener("mousemove", () => ({}));
    this.mount.removeEventListener("mousedown", () => ({}));
    this.mount.removeEventListener("mousewheel", () => ({}));
  }
}
