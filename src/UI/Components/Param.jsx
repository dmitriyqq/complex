import React from "react";

export default class Param extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      real_value: this.props.value.re | 0,
      im_value: this.props.value.im | 0
    };
  }

  render() {
    return (
      <div className="param">
        <div>{this.props.param + " = "}</div>
        <input
          className="paramInput"
          type="text"
          name="re"
          value={this.state.real_value}
          onChange={this.handleChange.bind(this)}
        />
        <input
          className="paramInput"
          type="text"
          name="im"
          value={this.state.im_value}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }

  handleChange(event) {
    const value = event.target.value;
    console.log(event.target.name);
    if (event.target.name == "re") {
      this.setState(prev => ({
        real_value: value
      }));

      // lift up new value
      this.props.onChange(this.props.param, {
        re: value,
        im: this.state.im_value
      });
    } else if (event.target.name == "im") {
      this.setState(prev => ({
        im_value: value
      }));

      // lift up new value
      this.props.onChange(this.props.param, {
        re: this.state.real_value,
        im: value
      });
    }
  }
}
