import React from "react";

// window.app - main controller of application

export default class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: [],
      curveType: "circle"
    };
  }

  render() {
    return <h1>Top Menu</h1>;
  }
}
