import * as React from "react";
import { connect } from "react-redux";

import { Dispatch } from 'redux';
import { Action } from "src/Constants";
import { ModelProperties } from 'src/Lib/ModelProperties';

import { Parameter } from 'src/UI/Components/Parameter';

const ProjectionPositionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "center",
};

const CardStyle: React.CSSProperties = {
  backgroundColor: "#333",
  border: "1px solid gray",
  margin: "10px 5px 10px 5px",
  padding: "5px",
};

interface IProps {
    model: ModelProperties;
    handleChange: (label: string, value: number) => void;
}

export class ProjectionPosition extends React.Component<IProps> {
  public render() {
    const {model} = this.props;
    const params = [
      { label: "matrixSize", value: model.matrixSize },
      { label: "size", value: model.size },
      { label: "xr", value: model.center.xr },
      { label: "xi", value: model.center.xi },
      { label: "yr", value: model.center.yr },
      { label: "yi", value: model.center.yi }
    ];

    return (
      <div style={CardStyle}>
        <div style={{ textAlign: "center" }}>Projection Position</div>
        <div style={ProjectionPositionStyle}>
          {params.map((param, i) => (
            <Parameter
              key={i}
              label={param.label}
              default={param.value}
              onChange={this.props.handleChange}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    model: state.Model
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleChange: (label: string, value: number) => {
    dispatch({
      label,
      type: Action.CHANGE_MATRIX_PROPS,
      value,
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectionPosition);
