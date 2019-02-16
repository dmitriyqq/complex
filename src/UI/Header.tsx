import * as React from "react";
import { connect } from "react-redux";

import { Action, ViewConstants } from "src/Constants";
import { ProjectionType } from 'src/Lib/TrackCam';
import { downloadObjectAsJson } from "src/Lib/Utils";
import { Change, Toggle } from "src/Redux/Actions";
import { IConfig } from './ViewBoxHeader';

const HeaderStyle: React.CSSProperties = {
  alignItems: "center",
  backgroundColor: "#333",
  border: "1px border gray",
  color: "white",
  display: "flex",
  flexDirection: "row",
  height: ViewConstants.HEADER_HEIGHT,
  width: "100%",
};

const LogoStyle: React.CSSProperties = {
  fontSize: "1.3em",
  margin: "0px 10px 0px 10px"
};

const Margin: React.CSSProperties = {
  margin: "0px 10px 0px 10px"
};

interface IProps {
  config: IConfig;
  gallery: any;
  singleCam: boolean;
  camType: ProjectionType;
  handleSketchNameChange: (name: string) => void;
  handleConsole: () => void;
  handleCamType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleScreenValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSingleCam: () => void;
}

interface IState {
  sketchName: string;
}

class Header extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sketchName: this.props.config.sketchName || 'Sketch name',
    };
  }

  public handleSketchNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ sketchName: e.target.value });
  }

  public wrapperSketchNameChange = () => {
    this.props.handleSketchNameChange(this.state.sketchName);
  }

  public handleExportSketches = () => {
    const name = "sketches" + new Date().toLocaleTimeString();
    downloadObjectAsJson(this.props.gallery, name);
  }

  public render() {
    return (
      <div style={HeaderStyle}>
        <div style={LogoStyle}>Complex</div>
        <button style={Margin} onClick={this.props.handleConsole}>
          Editor
        </button>
        <div style={Margin}>
          <label htmlFor="screensValue">Views:</label>
          <select
            name="screensValue"
            value={this.props.config.views}
            onChange={this.props.handleScreenValue}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
          </select>
        </div>
        <div style={Margin}>
          <label htmlFor="singleCam">SingleCam:</label>
          <input
            type="checkbox"
            name="singleCam"
            checked={this.props.config.singleCam}
            onClick={this.props.handleSingleCam}
          />
        </div>
        <div style={Margin}>
          <label htmlFor="camType">Camera:</label>
          <select
            name="camType"
            value={this.props.config.camType}
            onChange={this.props.handleCamType}
          >
            <option value="Ortho">Ortho</option>
            <option value="Perspective">Perspective</option>
          </select>
        </div>
        <div style={Margin}>
          <input
            type="text"
            placeholder="Sketch Name"
            value={this.state.sketchName}
            onChange={this.handleSketchNameInput}
          />
          <button onClick={this.wrapperSketchNameChange}>Change</button>
        </div>
        <div style={Margin}>
          <button onClick={this.handleExportSketches}>Export Projects</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  config: state.ViewsWrapperConfig,
  gallery: state.Gallery
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleCamType: (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(
        Change(Action.VIEW_WRAPPER_CHANGED, { camType: e.target.value })
      );
    },
    handleConsole: () => {
      dispatch(Toggle(Action.UPDATE_EDITOR, "editor"));
    },
    handleScreenValue: (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(Change(Action.VIEW_WRAPPER_CHANGED, { views: e.target.value }));
    },
    handleSingleCam: () => {
      dispatch(Toggle(Action.VIEW_WRAPPER_CHANGED, "singleCam"));
    },
    handleSketchNameChange: (sketchName: string) => {
      dispatch(Change(Action.VIEW_WRAPPER_CHANGED, { sketchName }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);


