import * as React from "react";
import { connect } from "react-redux";

import { Model } from 'src/Model/Model';
import CurveItem from "src/UI/Components/CurveItem";

const CardStyle: React.CSSProperties = {
  backgroundColor: "#333",
  border: "1px solid gray",
  margin: "10px 5px 10px 5px",
  padding: "5px",
}

interface IProps {
  model: {
    model: Model;
  };
}

class CurveBox extends React.Component<IProps> {
  public render() {
    const array = Array.from(this.props.model.model.curves);
    return (
      <div style={CardStyle}>
        <div>
          {array.map((curve, i) => (
            <CurveItem key={i} curve={curve} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    model: state.Model
  }
};

export default connect(
  mapStateToProps
)(CurveBox);
