import {Actions} from "./global.actions";

const initialState = {
    connection: undefined,
    theme: true
}

export default function globalReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.setConnection:
            return {...state, connection: action.payload.connection}
        case Actions.setTheme:
            return {...state, theme:action.payload.theme}
        default:
            return state;
    }
}