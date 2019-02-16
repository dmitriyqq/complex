import { combineReducers } from "redux";

import ViewsWrapperConfig from "src/Redux/Reducers/ViewsWrapperConfig";

import Cams from "src/Redux/Reducers/Cams";
import Editor from "src/Redux/Reducers/Editor";
import Gallery from "src/Redux/Reducers/Gallery";
import Image from "src/Redux/Reducers/Image";
import Model from "src/Redux/Reducers/Model";

export default combineReducers({
  Cams,
  Editor,
  Gallery,
  Image,
  Model,
  ViewsWrapperConfig,
});
