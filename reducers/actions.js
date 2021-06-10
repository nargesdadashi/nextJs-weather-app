import { setLocation, setTimeState } from "./Reducer"

// action creators
export function actionSetLocation(locationObj) {
  return {
    type: setLocation,
    payload: locationObj,
  }
}

export function actionSetTimeState(state) {
  return {
    type: setTimeState,
    payload: state,
  }
}
