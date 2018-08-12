import React from "react";

import Curves, { Circle, Hyperbola, Parabola, Line } from "Model/Curves";
import CurveItem from "Components/CurveItem";

const CurveBoxHeaderStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
};

class CurveBoxHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: "Окружность"
    };

    this.handleCreateCurve = this.handleCreateCurve.bind(this);
  }

  getCurve() {
    switch (this.state.selectedType) {
      case "Окружность":
        return new Circle();
    }
  }

  handleCreateCurve() {
    const curve = this.getCurve();
    this.props.model.addCurve(curve);
    this.props.onCreateCurve(curve);
  }

  render() {
    return (
      <div>
        <div>Add Curve</div>
        <div style={CurveBoxHeaderStyle}>
          <select name="curveType">
            {Curves.map((curveType, i) => (
              <option key={i} value={curveType.name}>
                {curveType.name}
              </option>
            ))}
          </select>
          <button onClick={this.handleCreateCurve}>Создать</button>
          <button>Очистить</button>
        </div>
      </div>
    );
  }
}

export default class CurveBox extends React.Component {
  constructor(props) {
    super(props);
    let curves = [];
    for (let curve of this.props.model.curves) {
      curves.push(curve);
    }

    this.state = {
      curves
    };

    this.handleCreateCurve = this.handleCreateCurve.bind(this);
  }

  handleCreateCurve(curve) {
    this.setState(prev => {
      prev.curves.push(curve);
      return {};
    });
  }

  render() {
    return (
      <div style={{}}>
        <CurveBoxHeader
          model={this.props.model}
          onCreateCurve={this.handleCreateCurve}
        />
        <div>
          {this.state.curves.map((curve, i) => (
            <CurveItem key={i} curve={curve} />
          ))}
        </div>
      </div>
    );
  }
}
