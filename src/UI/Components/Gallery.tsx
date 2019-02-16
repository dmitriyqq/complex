import * as React from "react";
import { connect } from "react-redux";

import { Action } from "src/Constants";
import { Sketch } from 'src/Lib/Sketch';
import GalleryItem from "src/UI/Components/GalleryItem";

interface IProps {
  style: React.CSSProperties;
  handleDelete: (sketchName: string) => void;
  handleSelect: (sketch: Sketch) => void;
  sketches: Sketch[];
}

class Gallery extends React.Component<IProps> {
  public render() {
    return (
      <div style={this.props.style}>
        {this.props.sketches.map((sketch, i) => (
          <GalleryItem
            sketch={sketch}
            key={i}
            onDelete={this.props.handleDelete}
            onSelect={this.props.handleSelect}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sketches: state.Gallery
});

const mapDispatchToProps = (dispatch: any) => ({
  handleDelete: (sketchName: string) => {
    dispatch({
      sketchName,
      type: Action.REMOVE_SKETCH,
    });
  },
  handleSelect: (sketch: Sketch) => {
    dispatch({
      sketch,
      type: Action.LOAD_SKETCH,
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
