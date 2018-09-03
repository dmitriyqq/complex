import React from "react";
import { connect } from "react-redux";
import { Action } from "Root/Constants";
import TrackCam from "Lib/TrackCam";
import * as THREE from "three";
import ProgramsManager from "../../Model/ProgramsManager";

const ViewBoxStyle = ViewBox => {
  return {
    width: ViewBox.props.width,
    height: ViewBox.props.height
  };
};

class ThreeWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this.props.width, this.props.height);
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.canvasPlaceholder = React.createRef();
  }

  componentDidMount() {
    const mount = this.canvasPlaceholder.current;
    mount.appendChild(this.renderer.domElement);
    this.forceUpdate();
  }

  shouldComponentUpdate(){
    if(this.camera && this.props.camera){
      this.camera.dispose();
    }

    return true;
  }


  updateImage(renderer) {
    this.props.updateImage(renderer.domElement.toDataURL());
  }

  render() {

    const placeHolder = (
      <div style={ViewBoxStyle(this)} ref={this.canvasPlaceholder} />
    );

    const mount = this.canvasPlaceholder.current;
    if (!mount) return placeHolder;

    let camera;
    if (!this.props.camera) {
      camera = new TrackCam(
        this.props.width,
        this.props.height,
        this.props.camType,
        this.props.i
      );
    } else camera = this.props.camera;

    //const scene = new THREE.Scene();
    //scene.background = new THREE.Color(1.0, 1.0, 1.0);

    camera.setup(mount);
    camera.addSubscriber(() => {
      const program = ProgramsManager.getProgram(this.props.i);
      //this.program.update(this.camera.camera);
      program.update(this.renderer);
    });
    camera.update();
    this.camera = camera;

    this.renderer.setSize(this.props.width, this.props.height);
    const program = ProgramsManager.getProgram(this.props.i);
    program.setup(this.renderer, camera.camera);
    program.render();


    this.updateImage(this.renderer);
    return placeHolder;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  updateImage: img =>
    dispatch({
      type: Action.UPDATE_IMAGE,
      image: img
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreeWrapper);
