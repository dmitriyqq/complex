import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducer from "Redux/Reducers";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import App from "Root/App";

const renderApp = Component => {
  render(
    <Provider store={store}>{Component}</Provider>,
    document.querySelector("#root")
  );
};

renderApp(<App />);
