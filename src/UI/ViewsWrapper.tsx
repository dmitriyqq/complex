import * as React from "react";
import { connect } from "react-redux";

import Model from 'src/Model/Model';
import ViewBox from "src/UI/ViewBox";
import { ViewConstants } from "../Constants";
import TrackCam from "../Lib/TrackCam";

const ViewsWrapperStyle = (vBox: ViewsWrapper) => {
  return {
    height: vBox.props.height,
    width: vBox.props.width,
  };
};

interface IProps {
  width: number;
  height: number;
  config: any;
  model: Model;
}

class ViewsWrapper extends React.Component<IProps> {
  public camera: TrackCam;
  private globCamera: React.RefObject<HTMLDivElement> = React.createRef();

  public render() {
    const res = this.getConfigs(this.props.config.views);

    if (this.props.config.singleCam) {
      this.camera = new TrackCam(
        res.width,
        res.height,
        this.props.config.camType,
      );

      if (this.globCamera) {
        const mount = this.globCamera.current;
        this.camera.setup(mount as any);
      }
    }

    return (
      <div style={ViewsWrapperStyle(this)} ref={this.globCamera}>
        {res.configs.map((config, i) => (
          <ViewBox
            camera={this.props.config.singleCam ? this.camera : null}
            key={i}
            i={i}
            config={config}
            // programConfig={this.props.programsConfig[i]}
            // model={this.props.model}
            camType={this.props.config.camType}
          />
        ))}
      </div>
    );
  }

  private getConfigs(numViews: any) {
    if (numViews === "1") {
      const width = this.props.width;
      const height = this.props.height;

      const top = ViewConstants.HEADER_HEIGHT;
      return {
        configs: [
          {
            height: this.props.height,
            left: 0,
            model: this.props.model,
            top,
            width: this.props.width,
          }
        ],
        height,
        width,
      };
    } else if (numViews === "2") {
      const top = ViewConstants.HEADER_HEIGHT;
      const width = this.props.width / 2;
      const height = this.props.height;
      return {
        configs: [
          {
            height,
            left: 0,
            model: this.props.model,
            top,
            width,
          },
          {
            height,
            left: this.props.width / 2,
            model: this.props.model,
            top,
            width,
          }
        ],
        height,
        width,
      };
    } else {
      const topTop = ViewConstants.HEADER_HEIGHT;
      const botTop = ViewConstants.HEADER_HEIGHT + this.props.height / 2;

      const width = this.props.width / 2;
      const height = this.props.height / 2;

      return {
        configs: [
          {
            height,
            left: 0,
            model: this.props.model,
            top: topTop,
            width,
          },
          {
            height,
            left: this.props.width / 2,
            model: this.props.model,
            top: topTop,
            width,
          },
          {
            height,
            left: 0,
            model: this.props.model,
            top: botTop,
            width,
          },
          {
            height,
            left: this.props.width / 2,
            model: this.props.model,
            top: botTop,
            width,
          }
        ],
        height,
        width,
      };
    }
  }

  
}

const mapStateToProps = (state: any) => {
  return {
    config: state.ViewsWrapperConfig
  }
};

export default connect(
  mapStateToProps
)(ViewsWrapper);
