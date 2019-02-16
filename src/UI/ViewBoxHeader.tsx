import * as React from 'react';
import { ProjectionType } from 'src/Lib/TrackCam';

const HeaderStyle: React.CSSProperties = {
  left: 0,
  position: "absolute",
  top: 0,
};

export type RenderMethod = "Cubes" | "Polygons";

interface IMapping {
  label: string;
  inverted: boolean;
}

export interface IMappings {
  x: IMapping;
  y: IMapping;
  z: IMapping;
}

export interface IConfig {
  sketchName?: string;
  singleCam: boolean;
  camType: ProjectionType;
  mappings: IMappings;
  renderMethod: RenderMethod;
  views: string;
}

interface IProps{
  config: IConfig;
  onChange: (state: IConfig) => void;
}

export class Header extends React.Component<IProps, IConfig> {
  public state: IConfig;

  constructor(props: IProps) {
    super(props);

    if (this.props.config) {
      this.state = this.props.config;
    }
  }

  public render() {
    const tryColor = (mapping: string) => {
      switch(mapping){
        case 'x': return '#FF0000';
        case 'y': return '#00FF00';
        case 'z': return '#0000FF';
        default : return '#000';
      }
    }

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
              <label htmlFor={mappingName} style={{color: tryColor(mapping)}}>{mapping + ":"}</label>
              <select
                key={i}
                name={mappingName}
                onChange={this.handleMapChange}
                value={this.state.mappings[mapping].label}
              >
                {mapValues.map((mv, j) => (
                  <option key={j} value={mv}>
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

  private handleMapChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.state.mappings[e.target.name].label = e.target.value;
    this.props.onChange(this.state);
  }

  private handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.state.renderMethod =
      this.state.renderMethod === "Cubes" ? "Polygons" : "Cubes";

    this.props.onChange(this.state);
  }

  private handleInvertedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.state.mappings[e.target.name].inverted = !this.state.mappings[e.target.name].inverted;
    this.props.onChange(this.state);
  }
}