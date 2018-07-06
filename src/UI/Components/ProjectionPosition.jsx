import React from "react";

// window.app - main controller of application

export default class ProjectionPosition extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.fetchStateFromApp();
    this.handleChange = this.handleChange.bind(this);
  }

  fetchStateFromApp() {
    return {
      matrixSize: window.app.model.matrixSize,
      xr_center: window.app.model.xr_center,
      xi_center: window.app.model.xi_center,
      yr_center: window.app.model.yr_center,
      yi_center: window.app.model.yi_center,
      xr_size: window.app.model.xr_size,
      xi_size: window.app.model.xi_size,
      yr_size: window.app.model.yr_size,
      yi_size: window.app.model.yi_size
    };
  }

  handleChange(event) {
    const key = event.target.name;
    window.app.model.initBox({
      [key]: parseInt(event.target.value)
    });

    let state = this.fetchStateFromApp();
    state[key] = event.target.value;

    this.setState(state);
    window.app.rebuild();
  }

  render() {
    console.log(this.state.xi_size);
    return (
      <div>
        <div>
          <div className="matrixSizeName">Размер матрицы:</div>
          <input
            type="number"
            name="matrixSize"
            value={this.state.matrixSize}
            onChange={this.handleChange}
          />
        </div>
        <div className="projBox">
          <div className="projBlock">
            <div>Центр</div>
            <div>
              xr:{" "}
              <input
                className="projInput"
                type="text"
                name="xr_center"
                value={this.state.xr_center}
                onChange={this.handleChange}
              />
            </div>
            <div>
              xi:{" "}
              <input
                className="projInput"
                type="text"
                name="xi_center"
                value={this.state.xi_center}
                onChange={this.handleChange}
              />
            </div>
            <div>
              yr:{" "}
              <input
                className="projInput"
                type="text"
                name="yr_center"
                value={this.state.yr_center}
                onChange={this.handleChange}
              />
            </div>
            <div>
              yi:{" "}
              <input
                className="projInput"
                type="text"
                name="yi_center"
                value={this.state.yi_center}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="projBlock">
            <div>Размер</div>
            <div>
              xr:
              <input
                className="projInput"
                type="text"
                name="xr_size"
                value={this.state.xr_size}
                onChange={this.handleChange}
              />
            </div>
            <div>
              xi:
              <input
                className="projInput"
                type="text"
                name="xi_size"
                value={this.state.xi_size}
                onChange={this.handleChange}
              />
            </div>
            <div>
              yr:
              <input
                className="projInput"
                type="text"
                name="yr_size"
                value={this.state.yr_size}
                onChange={this.handleChange}
              />
            </div>
            <div>
              yi:
              <input
                className="projInput"
                type="text"
                name="yi_size"
                value={this.state.yi_size}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
