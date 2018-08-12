import React from "react";

class Parameter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default || 0
    };
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.onChange(this.props.label, e.target.value);
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>{this.props.label + ":"}</div>
        <input
          style={{ marginLeft: "5px", width: "50px" }}
          type="text"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

const ProjectionPositionStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexWrap: "wrap",
  maxHeight: "80px"
};

export default class ProjectionPosition extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(label, value) {
    if (label == "matrixSize") {
      this.props.model.matrixSize = value;
    } else if (label == "size") {
      this.props.model.size = value;
    } else {
      this.props.model.center[label] = value;
    }
    this.props.model.rebuild();
  }

  render() {
    const params = [
      { label: "matrixSize", value: this.props.model.matrixSize },
      { label: "size", value: this.props.model.size },
      { label: "xr", value: this.props.model.center.xr },
      { label: "xi", value: this.props.model.center.xi },
      { label: "yr", value: this.props.model.center.yr },
      { label: "yi", value: this.props.model.center.yi }
    ];

    return (
      <div>
        <div>Projection Position</div>
        <div style={ProjectionPositionStyle}>
          {params.map((param, i) => (
            <Parameter
              key={i}
              label={param.label}
              default={param.value}
              onChange={this.handleChange.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}
