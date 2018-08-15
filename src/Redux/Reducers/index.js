import { combineReducers } from "redux";

import ViewsWrapperConfig from "Reducers/ViewsWrapperConfig";

import Gallery from "Reducers/Gallery.js";

import Model from "Reducers/Model.js";

export default combineReducers({ ViewsWrapperConfig, Gallery, Model });
