import {Action} from "src/Constants"
import TrackCam from 'src/Lib/TrackCam';

const DEFAULT_STATE: ICamsState = []

export type ICamsState = TrackCam[]

export default (state: ICamsState = DEFAULT_STATE, action: any): ICamsState => {
    if(action.type === Action.LOAD_SKETCH){
        return action.sketch.cams;
    }else if(action.type === Action.UPDATE_CAMERA){
        const newState: any = [];
        for(let i = 0; i < 4; i++){
            newState[i] = state[i];
        }
        newState.global = action.config;
        newState[action.id] = action.config;

        return newState;
    } else {
        return state;
    }
}