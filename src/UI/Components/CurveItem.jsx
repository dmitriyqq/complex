import React from "react";

import Func from "Components/Func";
import Param from "Components/Param";

export default class CurveItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.curve.getParams());
  }

  render() {
    return (
      <div>
        <div className="curveHeader">
          <div> Цвета проекций</div>
          <div className="curveProjA curveProj">A</div>
          <div className="curveProjB curveProj">B</div>
        </div>
        <div className="curveSection">Функции:</div>
        <div className="curveEquations" />
        {this.props.curve.y.map((func, i) => <Func key={i} text={func.text} />)}
        <div className="curveSection">Параметры:</div>
        {this.fetchParams()}
        <div className="curveParams" />
        <br />
      </div>
    );
  }

  fetchParams() {
    const params = this.props.curve.getParamNames();
    return params.map((param, i) => (
      <Param
        key={i}
        value={this.props.curve.getParam(param) || 0}
        param={param}
        onChange={this.handleParamChange.bind(this)}
      />
    ));
  }

  handleFunctionChange() {}

  handleParamChange(param, value) {
    this.props.curve.setParam(param, value);
  }
}
