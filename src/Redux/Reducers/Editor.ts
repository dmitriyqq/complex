import { Action } from "src/Constants";

export interface IEditorState {
    editor: boolean;
    gallery: boolean;
}

const DEFAULT_STATE = {
    editor: true,
    gallery: true,
};

export default (state: IEditorState = DEFAULT_STATE, action: any): IEditorState => {
    if(action.type === Action.UPDATE_EDITOR){
        if(action.applyChanges){
            return action.applyChanges(state);
        }
    }

    return state;
};
