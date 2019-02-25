import * as React from "react";
import { connect } from "react-redux";
import { Action } from "src/Constants";
import { ProjectionType, TrackCam } from "src/Lib/TrackCam";
import { IProgram } from 'src/View/ThreePrograms/IProgram';
import * as THREE from "three";
import { Scene } from 'three';

const ViewBoxStyle = (vBox: ThreeWrapper): React.CSSProperties => {
  return {
    height: vBox.props.height,
    width: vBox.props.width,
  };
};

interface IProps {
  height: number;
  width: number;
  updateImage: (img: string) => void;
  camera?: TrackCam | null;
  camType: ProjectionType;
  program: IProgram;
}

class ThreeWrapper extends React.Component<IProps> {
  private renderer: THREE.WebGLRenderer;
  // private camera: TrackCam;
  private canvasPlaceholder: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: IProps) {
    super(props);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this.props.width, this.props.height);
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  public componentDidMount() {
    if (this.canvasPlaceholder) {
      const mount = this.canvasPlaceholder.current;
      if (!mount) { 
        return; 
      }
      mount.appendChild(this.renderer.domElement);
      this.forceUpdate();
    }
  }

  public updateImage() {
    this.props.updateImage(this.renderer.domElement.toDataURL());
  }

  public render() {

    const placeHolder = (
      <div style={ViewBoxStyle(this)} ref={this.canvasPlaceholder} />
    );

    const mount = this.canvasPlaceholder.current;
    if (!mount) {
      return placeHolder; 
    }

    let camera;
    if (!this.props.camera) {
      camera = new TrackCam(
        this.props.width,
        this.props.height,
        this.props.camType,
      );
    } else {
      camera = this.props.camera;
    }

    // const scene = new THREE.Scene();
    // scene.background = new THREE.Color(1.0, 1.0, 1.0);

    camera.setup(mount);
    const scene = new Scene();
    const program = this.props.program;

    if (program) {
      program.setup(this.renderer, scene, camera);
      program.render();
    }
    camera.addSubscriber(() => {
      // this.program.update(this.camera.camera);
        program.update();
    });
    camera.update();
    // this.camera = camera;

    this.renderer.setSize(this.props.width, this.props.height);


    this.updateImage();
    return placeHolder;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  updateImage: (image: string) =>
    dispatch({
      image,
      type: Action.UPDATE_IMAGE,
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreeWrapper);
