import React from "react";

import { ViewConstants } from "Root/Constants";

const HeaderStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#333",
  width: "100%",
  color: "white",
  height: ViewConstants.HEADER_HEIGHT
};

const LogoStyle = {
  fontSize: "1.3em",
  margin: "0px 10px 0px 10px"
};

const Margin = {
  margin: "0px 10px 0px 10px"
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: true,
      views: "4",
      singleCam: false,
    }

    if(this.props.config){
      this.state = this.props.config;
    }

    this.handleConsole = this.handleConsole.bind(this);
    this.handleScreenValue = this.handleScreenValue.bind(this);
    this.handleSingleCam = this.handleSingleCam.bind(this);
    this.handleCamType = this.handleCamType.bind(this);
  }

  render() {
    return (
      <div style={HeaderStyle}>
        <div style={LogoStyle}>Complex</div>
        <button style={Margin} onClick={this.handleConsole}>Editor</button>
        <div style={Margin}>
          <label htmlFor="screensValue">Views:</label>
          <select name="screensValue" value={this.state.views} onChange={this.handleScreenValue}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
          </select>
        </div>
        <div style={Margin}>
          <label htmlFor="singleCam">SingleCam:</label>
          <input type="checkbox" name="singleCam" checked={this.state.singleCam} onClick={this.handleSingleCam}/>
        </div>
        <button style={Margin} onClick={this.handleCamType}>{this.state.camType}</button>
      </div>
    );
  }

  handleConsole(){
    this.state.editor = !this.state.editor;
    if (this.props.onChange)
      this.props.onChange(this.state)
  }

  handleScreenValue(e){
    this.state.views = e.target.value;
    if (this.props.onChange)
      this.props.onChange(this.state)
  }

  handleSingleCam(){
    this.state.singleCam = !this.state.singleCam;
    if (this.props.onChange)
      this.props.onChange(this.state)
  }

  handleCamType(){
    this.state.camType = this.state.camType === "Perspective" ? "Ortho" : "Perspective";

    if (this.props.onChange)
      this.props.onChange(this.state)
  }


}
