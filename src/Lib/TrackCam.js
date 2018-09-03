import * as THREE from "three";

import store from "Redux/store";

import { Action } from "Root/Constants";

export default class TrackCam {
  constructor(width, height, type, id) {
    this.cameraT = -Math.PI / 2;
    this.cameraA = 2;
    this.cameraR = 60; // DISTANCE
    this.lastMouse = { x: 0, y: 0 };

    this.id = id;
    this.width = width;
    this.height = height;
    this.type = type;

    if (this.type == "Ortho") {
      this.camera = new THREE.OrthographicCamera(
        width / -2,
        width / 2,
        height / 2,
        height / -2,
        1,
        2000
      );
    } else {
      this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    }

    this.renderers = [];
    let conf = store.getState().Cams[this.id];
    if (conf) {
      this.cameraT = conf.cameraT;
      this.cameraA = conf.cameraA;
      this.cameraR = conf.cameraR;
    }
    this.update();
  }

  setup(mount) {
    this.mount = mount;

    this.rotating = false;

    this.mount.addEventListener("mouseup", () => {
      this.rotating = false;
        store.dispatch({
          type: Action.UPDATE_CAMERA,
          id: this.id,
          config: {
            cameraT: this.cameraT,
            cameraA: this.cameraA,
            cameraR: this.cameraR
          }
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
      // console.log(dx, dy);
      if (this.rotating) {
        if (Math.abs(dx) > Math.abs(dy)) {
          this.cameraT -= 0.01 * dx;
        } else {
          this.cameraA += 0.01 * dy;
          if (this.cameraA > Math.PI / 2) this.cameraA = Math.PI / 2;
          else if (this.cameraA < -Math.PI / 2) this.cameraA = -Math.PI / 2;
        }
        this.update();
      }
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });

    this.mount.addEventListener(
      "mousewheel",
      e => {
        this.cameraR += e.deltaY * 0.05;
        this.update();
      },
      { passive: true }
    );
  }

  update() {
    if(this.type == "Ortho"){
      this.camera.zoom = 500 / this.cameraR;
      this.camera.updateProjectionMatrix();
    }

    this.camera.position.set(
      this.cameraR * Math.sin(this.cameraT),
      this.cameraR * Math.sin(this.cameraA),
      this.cameraR * Math.cos(this.cameraT)
    );

    this.camera.lookAt(0, 0, 0);

    if (this.subscribers) for (let sub of this.subscribers) sub();
  }

  addSubscriber(subscriber) {
    if (!this.subscribers) this.subscribers = [];
    this.subscribers.push(subscriber);
  }

  dispose(){
    console.log('disposing camera');
    this.mount.removeEventListener("mouseup", () => {console.log("cleared")});
    this.mount.removeEventListener("mousemove", () => {console.log("cleared")});
    this.mount.removeEventListener("mousedown", () => {console.log("cleared")});
    this.mount.removeEventListener("mousewheel", () => {console.log("cleared")});
  }
}
