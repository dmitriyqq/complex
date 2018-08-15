import React from "react";
import { connect } from "react-redux";

import { ViewConstants, Action } from "Root/Constants";
import AceEditor from "react-ace";


import "brace/mode/javascript";
import "brace/theme/monokai";

class Controls extends React.Component {
  constructor(props) {
    super(props);
  }

  getStyle() {
    return {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      top: ViewConstants.HEADER_HEIGHT,
      width: ViewConstants.CONSOLE_WIDTH + 20,
      height: ViewConstants.CONSOLE_CONTROLS
    };
  }

  getItemStyle() {
    return { flexGrow: "1", height: ViewConstants.CONSOLE_CONTROLS };
  }

  render() {
    return (
      <div style={this.getStyle()}>
        <button style={this.getItemStyle()} onClick={this.props.onBuildModel}>
          Построить
        </button>
        <button style={this.getItemStyle()} onClick={this.props.onBuildModel}>
          Сохранить
        </button>
        <button style={this.getItemStyle()} onClick={this.props.onClearModel}>
          Очистить
        </button>
        <button style={this.getItemStyle()} onClick={this.props.onBuildModel}>
          Галерея
        </button>
      </div>
    );
  }
}

class Console extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: this.props.model.code
    };

    this.wrapper = this.wrapper.bind(this); 
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  getStyle() {
    return {
      position: "absolute",
      backgroundColor: "#555",
      left: "0px",
      top: ViewConstants.HEADER_HEIGHT + ViewConstants.CONSOLE_CONTROLS,
      color: "white",
      height: this.props.height - ViewConstants.CONSOLE_CONTROLS,
      width: ViewConstants.CONSOLE_WIDTH,
      opacity: "0.5",
      padding: "10px 10px 10px 10px"
    };
  }

  handleCodeChange(newCode) {
    this.setState({ code: newCode });
  }

  wrapper(){
    this.props.handleBuildModel(this.state.code);
  }

  render() {
    return (
      <div style={{ zIndex: 100 }}>
        <Controls
          onBuildModel={this.wrapper}
          onClearModel={this.props.handleClearModel}
        />
        <AceEditor
          style={this.getStyle()}
          mode="javascript"
          theme="monokai"
          value={this.state.code}
          onChange={this.handleCodeChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    config: state.ViewsWrapperConfig,
    model: state.Model 
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleBuildModel: code => {
      dispatch({
        type: Action.BUILD_CODE, code
      })
    },
    handleClearModel: () => {
      dispatch({
        type: Action.CLEAR_CODE
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Console);
