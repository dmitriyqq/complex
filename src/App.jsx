import React from "react";

import Header from "UI/Header";
import ViewsWrapper from "UI/ViewsWrapper";
import Sidebar from "UI/SideBar";
import Console from "UI/Console";

import { ViewConstants, DEFAULT_CODE } from "Root/Constants";
import Model from "Model/Model";

const AppStyle = {
  display: "flex",
  flexDirection: "column"
};

const ContentStyle = {
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#FFF",
  color: "black"
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const DEFAULT_CONFIG = {
      editor: true,
      views: "1",
      singleCam: false,
      camType: "Perspective"
    }

    this.state = {
      width: window.innerWidth - ViewConstants.SIDEBAR_WIDTH,
      height: window.innerHeight - ViewConstants.HEADER_HEIGHT,
      model: new Model(),
      appConfig: DEFAULT_CONFIG,
      currentCode: DEFAULT_CODE
    };

    window.onresize = this.handleResize.bind(this);
    this.handleUserBuildModel = this.handleUserBuildModel.bind(this);
    this.handleHeaderChange = this.handleHeaderChange.bind(this);
  }

  handleResize() {
    this.setState(() => ({
      width: window.innerWidth - ViewConstants.SIDEBAR_WIDTH,
      height: window.innerHeight - ViewConstants.HEADER_HEIGHT
    }));
  }

  handleUserBuildModel(model, currentCode) {
    this.setState(() => ({ model, currentCode }));
  }

  handleHeaderChange(appConfig) {
    this.setState(() => ({ appConfig }));
  }

  handleViewsChange(viewsConfig){
    this.setState(() => ({ viewsConfig }));
  }

  render() {
    const editor = this.state.appConfig.editor ? (
      <Console
        height={this.state.height}
        model={this.state.model}
        code={this.state.currentCode}
        onBuild={this.handleUserBuildModel}
      />
    ) : null;

    return (
      <div style={AppStyle}>
        <Header config={this.state.appConfig} onChange={this.handleHeaderChange} />
        <div style={ContentStyle}>
          {editor}
          <ViewsWrapper
            model={this.state.model}
            width={this.state.width}
            height={this.state.height}
            numViews={this.state.appConfig.views}
            config={this.state.appConfig}
            views={this.state.viewsConfig}
            onChange={this.handleViewsChange}
          />
          <Sidebar model={this.state.model} />
        </div>
      </div>
    );
  }
}
