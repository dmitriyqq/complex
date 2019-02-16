import { createStore } from "redux";

import reducer from "src/Redux/Reducers";

const w = window as any;

const store = createStore(
  reducer,
  w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
