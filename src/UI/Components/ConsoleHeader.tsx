import * as React from "react";

import { ViewConstants } from "src/Constants";


interface IProps {
  onBuildModel: () => void;
  onSaveModel: () => void;
  onClearModel: () => void;
  onToggleGallery: () => void;
}

export default class Controls extends React.Component<IProps> {
  public render() {
    return (
      <div style={this.getStyle()}>
        <button style={this.getItemStyle()} onClick={this.props.onBuildModel}>
          Построить
        </button>
        <button style={this.getItemStyle()} onClick={this.props.onSaveModel}>
          Сохранить
        </button>
        <button style={this.getItemStyle()} onClick={this.props.onClearModel}>
          Очистить
        </button>
        <button style={this.getItemStyle()} onClick={this.props.onToggleGallery}>
          Галерея
        </button>
      </div>
    );
  }
 
  private getStyle(): React.CSSProperties {
      return {
        display: "flex",
        flexDirection: "row",
        height: ViewConstants.CONSOLE_CONTROLS,
        position: "absolute",
        top: ViewConstants.HEADER_HEIGHT,
        width: ViewConstants.CONSOLE_WIDTH + 20,
      };
    }
  
  private getItemStyle(): React.CSSProperties {
    return { flexGrow: 1, height: ViewConstants.CONSOLE_CONTROLS };
  }
}

