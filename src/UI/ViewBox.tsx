import * as React from "react";
import { connect } from "react-redux";

import ThreeWrapper from "src/UI/Components/ThreeWrapper";

import { Action } from "src/Constants"
import TrackCam, { ProjectionType } from 'src/Lib/TrackCam';
import ProgramsManager from 'src/Model/ProgramsManager';
import { IModelState } from 'src/Redux/Reducers/Model';
import { Header, IConfig } from './ViewBoxHeader';

const ViewBoxStyle = (vBox: React.Component<IProps>): React.CSSProperties => ({
  border: "1px solid grey",
  height: vBox.props.config.height,
  left: vBox.props.config.left,
  position: "absolute",
  top: vBox.props.config.top,
  width: vBox.props.config.width,
  zIndex: 0,
});

interface IViewBoxConfig {
  height: number;
  width: number;
  left: number;
  top: number;
}

interface IProps {
  i: number;
  config: IViewBoxConfig;
  model: IModelState;
  camera?: TrackCam | null;
  camType: ProjectionType;
  updateConfig: (id: number, config: IConfig) => void;
}

class ViewBox extends React.Component<IProps> {
  public render() {
    const defaultConfig: IConfig = {
      camType: 'Ortho',
      mappings: {
        x: {
          inverted: false,
          label: "xr",
        },
        y: {
          inverted: false,
          label: "yr",
        },
        z: {
          inverted: false,
          label: "xi",
        }
      },
      renderMethod: "Cubes",
      singleCam: true,
      views: "1",
    };

    const config = this.props.model.projConfigs[this.props.i] || defaultConfig;
    const model = this.props.model.model;
    const program = ProgramsManager.updateProgram(this.props.i, config, model);

    return (
      <div style={ViewBoxStyle(this)}>
        <Header onChange={this.wrapConfigChange} config={config} />
        <ThreeWrapper
          camera={this.props.camera}
          camType={this.props.camType}
          width={this.props.config.width}
          height={this.props.config.height}
          program={program}
        />
      </div>
    );
  }

  private wrapConfigChange = (config: IConfig) => {
    this.props.updateConfig(this.props.i, config)
  }
}

const mapStateToProps = (state: any) => {
  return {
    model: state.Model
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  updateConfig: (id: number, config: IConfig) => {
    dispatch({
      config,
      id,
      type: Action.PROJECTION_CONFIG_UPDATE,
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewBox);