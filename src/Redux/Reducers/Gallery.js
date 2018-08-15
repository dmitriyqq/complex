import {Action} from "Root/Constants"

const DEFAULT_STATE = [
    {
        img: "",
        name: "",
        code: "hello world"
    }
]

export default (state = DEFAULT_STATE, action) => {
    let newStories;
    if(action.type === Action.ADD_STORY){
        newStories = [...state, action.story];
    }else if(action.type === Action.REMOVE_STORY){
        newStories = state.filter(story => story.id != action.id);
    }else if(action.type === Action.UPDATE_STORY){
        newStories = state.map(story => story.id == action.id ? action.story : story);
    }
    else return state;

    localStorage.setItem("stories", JSON.stringify(newStories));
    return newStories;
}