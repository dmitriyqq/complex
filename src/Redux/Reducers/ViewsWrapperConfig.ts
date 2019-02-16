import { Action } from "src/Constants";

const DEFAULT_STATE = {
  camType: "Ortho",
  editor: true,
  singleCam: false,
  sketchName: "sketch",
  views: "4",
};

export default (state = DEFAULT_STATE, action: any) => {
  if (action.type === Action.LOAD_SKETCH) {
    return action.sketch.config;
  } else if (action.type === Action.VIEW_WRAPPER_CHANGED) {
    if (action.applyChanges) {
      return action.applyChanges(state);
    }
  }
  return state;
};
