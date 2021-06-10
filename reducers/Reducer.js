/*
 Comment:
 1. Try to use semantic variables in code: setLoc => setLocation,
 2. Since you'll reuse the action.type later in the code to avoid inconsistency bugs use variables instead, example:
    export const ActionSetLocation = 'setLocation'
    then use it in the code:
    switch(action.type) {
        case ActionSetLocation: ...
    }
 3. This is fine since you have one reducer but if you have more you should name your reducers accordingly to what they'd do.
*/

export const setLocation = "setLocation"
export const setTimeState = "setTimeState"

const Reducer = (state, action) => {
  switch (action.type) {
    case setLocation:
      return {
        ...state,
        location: action.payload,
      }
    case setTimeState:
      return {
        ...state,
        timeState: action.payload,
      }
    default:
      return state
  }
}

export default Reducer
