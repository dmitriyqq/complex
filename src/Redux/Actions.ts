export const Toggle = (actionType: any, propName: any) => ({
  applyChanges: (state: any) => {
    state[propName] = !state[propName];
    return {...state, [propName] : state[propName]};
  },
  propName,
  type: actionType,
});

export const Change = (actionType: any, changes: any) => {
  return {
    applyChanges: (state: any) => {
      const newState = {};
      for (const key in state) {
        if (state[key]) {
          newState[key] = state[key];
        }
      }
      for (const key in changes) {
        if (state[key]) {
          newState[key] = changes[key];
        }
      }
      return newState;
    },
    changes,
    type: actionType,
  };
};
