import {Action} from "Root/Constants"

const DEFAULT_STATE = {
    editor: true,
    views: [
        {}
    ]
  };

export default (state = DEFAULT_STATE, action) => {
    if(action.applyChanges){
        return action.applyChanges(state);
    }else 
        return state;
}