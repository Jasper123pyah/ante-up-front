import {Actions} from "./global.actions";

const initialState = {
    connection: undefined,
    theme: true,
    api: undefined
}

export default function globalReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.setConnection:
            return {...state, connection: action.payload.connection}
        case Actions.setTheme:
            return {...state, theme:action.payload.theme}
        case Actions.setAPI:
            return {...state, api:action.payload.api}
        default:
            return state;
    }
}