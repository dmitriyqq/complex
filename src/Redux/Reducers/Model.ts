import { Action } from "src/Constants";
import { DEFAULT_CODE } from "src/Constants";

import Complex from "src/Lib/Complex";
import {Formula} from 'src/Lib/Formula';
import { Parser } from "src/Lib/Parser";
import {Circle} from 'src/Model/Curves/Circle';
import Model from "src/Model/Model";
import { IConfig } from 'src/UI/ViewBoxHeader';

const Curves = {Circle};

export interface IModelState {
  code: string;
  model: Model;
  projConfigs: IConfig[];
}

const DEFAULT_STATE = {
  code: DEFAULT_CODE,
  model: new Model(),
  projConfigs: []
};

function buildModel(code: string, params: any) {
  try {
    // tslint:disable-next-line:no-eval
    const userFunction = eval(code);
    const exp = userFunction(Model, Curves, Complex, Parser, Formula, params);
    return exp.model;
  } catch (err) {
    // console.log(err);
  }
}

export default (state: IModelState = DEFAULT_STATE, action: any): IModelState => {
  if (action.type === Action.BUILD_CODE) {
    const params = state.model.exportParams();
    return {
      ...state,
      code: action.code,
      model: buildModel(action.code, params),
    };
  } else if (action.type === Action.CHANGE_MATRIX_PROPS) {
    const label = action.label;
    const value = action.value;
    const model = state.model;

    if (label === "matrixSize") {
      model.matrixSize = parseInt(value, 10);
    } else if (label === "size") {
      model.size = parseInt(value, 10);
    } else {
      model.center[label] = parseInt(value, 10);
    }

    const newModel = new Model(model.exportParams(), model.getCurves());
    delete state.model;
    return {
      ...state,
      model: newModel
    };
  } else if (action.type === Action.CLEAR_MODEL) {
    return {
      code: DEFAULT_CODE,
      model: new Model(),
      projConfigs: []
    };
  } else if (action.type === Action.PROJECTION_CONFIG_UPDATE) {
    const projConfigs = [];
    for (let i = 0; i < state.projConfigs.length; i++) {
      projConfigs[i] = state.projConfigs[i];
    }
    projConfigs[action.id] = action.config;
    return { ...state, projConfigs };
  } else if (action.type === Action.LOAD_SKETCH) {
    // console.log(action);
    return {
      code: action.sketch.code,
      model: buildModel(action.sketch.code, action.sketch.params),
      projConfigs: action.sketch.projConfigs,
    };
  }
  return state;
};
