import {Actions} from "./global.actions";

const initialState = {
    connection: undefined,
    api: undefined
}

export default function globalReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.setConnection:
            return {...state, connection: action.payload.connection}
        case Actions.setAPI:
            return {...state, api:action.payload.api}
        default:
            return state;
    }
}