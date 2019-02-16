import * as React from "react";
import { Sketch } from 'src/Lib/Sketch';

const GalleryItemStyle: React.CSSProperties = {
  backgroundColor: "#333",
  border: "1px solid gray",
  height: "110px",
  margin: "5px 0px 5px 0px",
  opacity: 1.0,
  padding: "5px",
};

const ImageStyle: React.CSSProperties = {
  height: "100px",
  margin: "0px 20px 0px 0px",
  width: "auto",
};

const CodeStyle: React.CSSProperties = {
  fontSize: "12px",
  maxHeight: "50px",
  maxWidth: "300px",
  overflow: "hidden",
};

interface IProps{
  sketch: Sketch;
  onDelete: (sketchName: string) => void;
  onSelect: (sketch: Sketch) => void;
}


export default class GalleryItem extends React.Component<IProps> {
  public render() {
    const sketch = this.props.sketch;
    return (
      <div style={GalleryItemStyle}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img style={ImageStyle} src={sketch.image} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <div>{sketch.name}</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <button onClick={this.handleDelete}> Delete </button>
                <button onClick={this.handleSelect}> Load </button>
              </div>
            </div>

            <pre style={CodeStyle}>{sketch.code}</pre>
          </div>
        </div>
      </div>
    );
  }

  private handleDelete() {
    this.props.onDelete(this.props.sketch.name);
  }

  private handleSelect() {
    this.props.onSelect(this.props.sketch);
  }
}
