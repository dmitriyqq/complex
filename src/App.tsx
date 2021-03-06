import * as React from 'react';

// import Console from "./UI/Console";
// import Header from "./UI/Header";
// import Sidebar from "./UI/SideBar";
// import ViewsWrapper from "./UI/ViewsWrapper";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { ViewConstants } from "./Constants";
// import { IEditorState } from './Redux/Reducers/Editor';
// import { IModelState } from './Redux/Reducers/Model';

// import { LineProjectionPage } from './Pages/LineProjectionPage';
// import { PageSelector } from './UI/PageSelector';
import { Demo } from './Scenes/Demo';
import { CurveView } from './UI/ViewComponents/CurveView';

const AppStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column"
};

// interface IProps {
  // model: IModelState;
  // editor: IEditorState;
// }

interface IState {
  width: number;
  height: number;
}

export class App extends React.Component<{}, IState>{
  constructor(props: {}) {
    super(props);

    this.state = {
      height: window.innerHeight - ViewConstants.HEADER_HEIGHT,
      width: window.innerWidth - ViewConstants.SIDEBAR_WIDTH,
    };

    window.onresize = this.handleResize.bind(this);
  }

  public render() {
    // const model = this.props.model.model;
    // const editor = this.props.editor.editor ? (
      // <Console height={this.state.height} />
    // ) : null;

    return (
      <div style={AppStyle}>
        {/* <Header singleCam={true} camType={'Ortho'} /> */}
        <Router>
          <React.Fragment>
          {/* <PageSelector /> */}
          <Route path="/curve/:text" component={CurveView}/>
          <Route path="/demo/" component={Demo}/>
          {/* <div style={ContentStyle}>
            {editor}
            <ViewsWrapper
              model={model}
              width={this.state.width}
              height={this.state.height}
            />
            <Sidebar />
          </div> */}
          {/* <LineProjectionPage /> */}
          </React.Fragment>
        </Router>

      </div>
    );
  }

  private handleResize() {
    this.setState(() => ({
      height: window.innerHeight - ViewConstants.HEADER_HEIGHT,
      width: window.innerWidth - ViewConstants.SIDEBAR_WIDTH,
    }));
  }
}
