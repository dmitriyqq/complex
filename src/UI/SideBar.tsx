import * as React from "react";

import { ViewConstants } from "../Constants";
import CurveBox from "./Components/CurveBox";
import ProjectionPosition from "./Components/ProjectionPosition";

const SidebarStyle: React.CSSProperties = {
  backgroundColor: "#555",
  color: "white",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: ViewConstants.SIDEBAR_WIDTH
};

export default class Sidebar extends React.Component {

  public render() {
    return (
      <div style={SidebarStyle}>
        <ProjectionPosition />
        <CurveBox />
      </div>
    );
  }
}
