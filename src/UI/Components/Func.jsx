import React from "react";

export default class Func extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        y =
        <input
          className="curveEquationInput"
          type="text"
          value={this.props.text}
          disabled
        />
      </div>
    );
  }
}
