import React from "react";

import CubicProgram from "ThreePrograms/CubicProgram";
import PolygonProgram from "ThreePrograms/PolygonProgram";
import ThreeWrapper from "Components/ThreeWrapper";

const ViewBoxStyle = ViewBox => {
  return {
    position: "absolute",
    top: ViewBox.props.config.top,
    left: ViewBox.props.config.left,
    width: ViewBox.props.config.width,
    height: ViewBox.props.config.height,
    zIndex: 0,
    border: "1px solid grey"
  };
};

const HeaderStyle = {
  position: "absolute",
  top: 0,
  left: 0
};

class Header extends React.Component {
  constructor(props) {
    super(props);

    // this.state =
    if (this.props.config) {
      this.state = this.props.config;
    }

    this.handleMapChange = this.handleMapChange.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleInvertedChange = this.handleInvertedChange.bind(this);
  }

  handleMapChange(e) {
    this.state.mappings[e.target.name].label = e.target.value;
    this.props.onChange(this.state);
  }

  handleModeChange() {
    this.state.renderMethod =
      this.state.renderMethod == "Cubes" ? "Polygons" : "Cubes";
    this.props.onChange(this.state);
  }

  handleInvertedChange(e) {
    console.log(e.target.name)
    this.state.mappings[e.target.name].inverted = !this.state.mappings[
      e.target.name
    ].inverted;
    this.props.onChange(this.state);
  }

  render() {
    const mappings = ["x", "y", "z"];
    const mapValues = ["xr", "xi", "yr", "yi"];

    return (
      <div style={HeaderStyle}>
        <select
          name="renderMethod"
          value={this.state.renderMethod}
          onChange={this.handleModeChange}
        >
          <option value="Cubes"> Кубы </option>
          <option value="Polygons"> Полигоны </option>
        </select>
        {mappings.map((mapping, i) => {
          const mappingName = mapping;
          return (
            <div key={i}>
              <label htmlFor={mappingName}>{mapping + ":"}</label>
              <select
                key={i}
                name={mappingName}
                onChange={this.handleMapChange}
                value={this.state.mappings[mapping].label}
              >
                {mapValues.map((mv, i) => (
                  <option key={i} value={mv}>
                    {mv}
                  </option>
                ))}
              </select>
              <input
                type="checkbox"
                name={mappingName}
                onChange={this.handleInvertedChange}
                value={this.state.mappings[mapping].inverted}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default class ViewBox extends React.Component {
  constructor(props) {
    console.log("constructing view box");
    super(props);
    this.state = {
      config: {
        renderMethod: "Cubes",
        mappings: {
          x: {
            label: "xr",
            inverted: false
          },
          y: {
            label: "yr",
            inverted: false
          },
          z: {
            label: "xi",
            inverted: false
          }
        }
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    if (this.state.config.renderMethod == "Cubes") {
      this.program = new CubicProgram(this.props.model, this.state.config.mappings);
    } else {
      this.program = new PolygonProgram(this.props.model, this.state.config.mappings);
    }

    return (
      <div style={ViewBoxStyle(this)}>
        <Header onChange={this.handleChange} config={this.state.config} />
        <ThreeWrapper
          camType={this.props.camType}
          camera={this.props.camera}
          program={this.program}
          config={this.state.config}
          width={this.props.config.width}
          height={this.props.config.height}
        />
      </div>
    );
  }

  handleChange(config) {
    console.log(config);
    this.setState(() => ({ config }));
  }
}
