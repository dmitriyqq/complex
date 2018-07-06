import React from "react";

// window.app - main controller of application
// this is
import CurveItem from "Components/CurveItem";
import ProjectionPosition from "Components/ProjectionPosition";

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curves: [],
      curveType: "circle"
    };
  }

  render() {
    console.log(window.app);
    console.log(this.state);
    return (
      <div>
        <ProjectionPosition />
        <button className="rebuildModel" onClick={window.app.rebuild.bind(app)}>
          Перестроить модель
        </button>

        <legend>Кривые</legend>
        <div className="curvesHeader">
          <select
            className="curveType"
            value={this.state.curveType}
            onChange={this.handleCurveTypeChange.bind(this)}
          >
            <option value="circle">Окружность</option>
            <option value="parabola">Парабола</option>
            <option value="hyperbola">Гипербола</option>
            <option value="line">Прямая</option>
          </select>
          <button
            className="createCurve"
            onClick={this.handleCreateCurve.bind(this)}
          >
            Создать
          </button>
          <button
            className="cleanCurves"
            onClick={this.handleCleanCurves.bind(this)}
          >
            Очистить
          </button>
        </div>

        <div className="curvesBox">
          {this.state.curves.map((curve, i) => (
            <CurveItem key={i} curve={curve} />
          ))}
        </div>
      </div>
    );
  }

  handleCreateCurve() {
    const getCurve = () => {
      switch (this.state.curveType) {
        case "circle":
          return new Circle();
        case "parabola":
          return new Parabola();
        case "hyperbola":
          return new Hyperbola();
        case "line":
          return new Line();
      }
    };

    this.setState(prev => {
      const curve = getCurve();
      window.app.model.addCurve(curve);
      window.app.rebuild();
      prev.curves.push(curve);
      return {
        curves: prev.curves
      };
    });
  }

  handleCleanCurves() {
    window.app.cleanCurves();
    window.app.rebuild();
    this.setState({
      curves: []
    });
  }

  handleCurveTypeChange(event) {
    this.setState({ curveType: event.target.value });
  }
}
