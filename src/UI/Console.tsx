import * as React from "react";
import { connect } from "react-redux";

import AceEditor from "react-ace";
import { Action, ViewConstants } from "src/Constants";
import Controls from "./Components/ConsoleHeader";

import { Toggle } from "src/Redux/Actions";
import Gallery from "src/UI/Components/Gallery";


import "brace/mode/javascript";
import "brace/theme/monokai";
import { Dispatch } from 'redux';
import Model from 'src/Model/Model';

interface IProps {
  height: number;
  model: Model;
  editor: any;
  handleBuildModel: (code: string) => void;
  handleClearModel: () => void;
  handleSaveModel: (exportModel: any) => void;
  handleToggleGallery: () => void;
}

interface IState {
  code: string;
}

class Console extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      code: this.props.model.code
    };

  }

  public shouldComponentUpdate(nextProps: IProps) {
    // this.props.editor === nextProps.editor
    if (this.props.model === nextProps.model) {
      return false;
    }
    return true;
  }

  public getStyle = (): React.CSSProperties => ({
    backgroundColor: "#555",
    color: "white",
    height: this.props.height - ViewConstants.CONSOLE_CONTROLS,
    left: "0px",
    opacity: 0.75,
    overflowY: 'auto',
    padding: "10px 10px 10px 10px",
    position: "absolute",
    top: ViewConstants.HEADER_HEIGHT + ViewConstants.CONSOLE_CONTROLS,
    width: ViewConstants.CONSOLE_WIDTH,
  })

  public wrapperSaveModel = () => {
  //   const model = {
  //     sketchName: this.props.config.sketchName,
  //     config: this.props.config,
  //     cams: this.props.cams,
  //     code: this.props.model.code,
  //     projConfigs: this.props.model.projConfigs,
  //     params: this.props.model.model.exportParams(),
  //     image: this.props.image,
  //   };
  //   console.log(model);
  //   this.props.handleSaveModel(model);
  }

  public render() {
    let bar;
    if (this.props.editor.gallery) {
      bar = <Gallery style={this.getStyle()} />;
    } else {
      bar = (
        <AceEditor
          style={this.getStyle()}
          fontSize={13}
          mode="javascript"
          theme="monokai"
          value={this.state.code}
          onChange={this.handleCodeChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      );
    }

    return (
      <div style={{ zIndex: 100 }}>
        <Controls
          onBuildModel={this.wrapperBuildModel}
          onClearModel={this.props.handleClearModel}
          onSaveModel={this.wrapperSaveModel}
          onToggleGallery={this.props.handleToggleGallery}
        />
        {bar}
      </div>
    );
  }

  private handleCodeChange = (newCode: string) => {
    this.setState({ code: newCode });
  }

  private wrapperBuildModel = () => {
    this.props.handleBuildModel(this.state.code);
  }
}

const mapStateToProps = (state: any) => {
  // console.log(state);
  return {
    cams: state.Cams,
    config: state.ViewsWrapperConfig,
    editor: state.Editor,
    image: state.Image,
    model: state.Model,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleBuildModel: (code:string) => {
    dispatch({
      code,
      type: Action.BUILD_CODE,
    });
  },
  handleClearModel: () => {
    dispatch({
      type: Action.CLEAR_CODE
    });
  },

  handleSaveModel: (exportModel: any) => {
    dispatch({
      sketch: exportModel,
      type: Action.ADD_SKETCH
    });
  },

  handleToggleGallery: () => {
    dispatch(Toggle(Action.UPDATE_EDITOR, "gallery"));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Console);
