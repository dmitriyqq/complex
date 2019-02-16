import { Action } from "src/Constants";
import DEFAULT_SKETCHES from "src/default"
import { Sketch } from 'src/Lib/Sketch';

const DEFAULT_STATE: IGallaryState = DEFAULT_SKETCHES || [];

export type IGallaryState = Sketch[];

export default (state:IGallaryState = DEFAULT_STATE, action: any): IGallaryState => {
  let newSketches;
  const sketch = action.sketch;
  if (action.type === "@@INIT") {
    const sketches = localStorage.getItem("gallery");
    if (sketches) {
      return JSON.parse(sketches).concat(DEFAULT_STATE);
    } else {
      return DEFAULT_STATE;
    }
  } else if (action.type === Action.ADD_SKETCH) {
    if (state.find(s => s.name === sketch.sketchName)) {
      newSketches = state.map(
        s => (s.name === sketch.sketchName ? sketch : s)
      );
    } else {
      newSketches = state.concat([sketch]);
    }
  } else if (action.type === Action.REMOVE_SKETCH) {
    newSketches = state.filter(s => s.name !== action.sketchName);
  } else {
    return state;
  }

  localStorage.setItem("gallery", JSON.stringify(newSketches));
  return newSketches;
};
