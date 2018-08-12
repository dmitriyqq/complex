import React from "react";

export default class CurveItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.curve);
  }

  render() {
    return (
      <div style={{}}>
        <div>
          {this.props.curve.y.map((formula, i) => (
            <div key={i}>{"y = " + formula.text}</div>
          ))}
        </div>
        <div />
      </div>
    );
  }
}
