
import registerServiceWorker from './registerServiceWorker';

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "src/App";
import store from "src/Redux/store"

import 'src/index.css'

const renderApp = (Component: any) => {
  render(
    <Provider store={store}>{Component}</Provider>,
    document.querySelector("#root")
  );
};

renderApp(<App />);

registerServiceWorker();
