import React from "react";
import TrackCam from "Lib/TrackCam";
import * as THREE from "three";

const ViewBoxStyle = ViewBox => {
  return {
    width: ViewBox.props.width,
    height: ViewBox.props.height
  };
};

export default class ThreeWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();

    this.canvasPlaceholder = React.createRef();

    this.scene.background = new THREE.Color(0.7, 0.7, 0.7);
  }

  componentDidMount(){
    let mount = this.canvasPlaceholder.current;
    this.camera.setup(mount);
    mount.appendChild(this.renderer.domElement);
  }

  componentDidUpdate() {
    let mount = this.canvasPlaceholder.current;
    this.camera.setup(mount);
  }

  render() {
    console.log("rendering ");

    if(!this.props.camera){
      this.camera = new TrackCam(this.props.width, this.props.height, this.props.camType);
    }else this.camera = this.props.camera;

    console.log(this.camera);

    this.camera.addSubscriber(() => {
      this.renderer.render(this.scene, this.camera.camera);
    });

    this.renderer.setSize(this.props.width, this.props.height);
    this.props.program.setup(this.renderer, this.scene, this.camera.camera);
    this.props.program.render();
    this.camera.update(this.renderer, this.scene);

    console.log(this.camera.camera.aspect);
    return <div style={ViewBoxStyle(this)} ref={this.canvasPlaceholder} />;
  }
}
