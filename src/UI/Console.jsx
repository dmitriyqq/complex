import React from "react";

import { ViewConstants, DEFAULT_CODE } from "Root/Constants";
import AceEditor from "react-ace";

import Model from "Model/Model.js";
import * as Curves from "Model/Curves";
import {Parser, Formula} from "Lib/Parser";
import Complex from "Lib/Complex";

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

export default class Console extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: this.props.code || DEFAULT_CODE
    };

    this.handleBuildModel = this.handleBuildModel.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleClearModel = this.handleClearModel.bind(this);
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

  handleBuildModel() {
    this.buildModel(this.state.code);
  }

  handleClearModel(){
    this.buildModel(DEFAULT_CODE, new Model());
  }

  buildModel(code, model){
    try {
      const userFunction = eval(code);
      const newModel = userFunction(Model, Curves, Complex, Parser, Formula);
      this.props.onBuild(model ? model : newModel, code);
    } catch (err) {
      console.log(err);
    }
  }

  handleCodeChange(newCode) {
    this.setState({ code: newCode });
  }



  render() {
    return (
      <div style={{zIndex: 100}}>
        <Controls onBuildModel={this.handleBuildModel} onClearModel={this.handleClearModel}/>
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
