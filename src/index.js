import SideBar from "Components/SideBar.jsx";
import React from "react";

import { render } from "react-dom";

window.initUI = () => {
  console.log(document.getElementById("SideBar"));
  render(<SideBar />, document.getElementById("SideBar"));
};
