import { Action } from "src/Constants";

const DEFAULT_STATE: string = "image";

export default (state: string = DEFAULT_STATE, action: any): string => {
    if(action.type === Action.UPDATE_IMAGE){
        return action.image;
    }

    return state;
};
