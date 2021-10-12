import {Actions} from "./global.actions";

const initialState = {
    connection: undefined,
    api: undefined,
    accountInfo: undefined,
    games: []
}

export default function globalReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.setConnection:
            return {...state, connection: action.payload.connection}
        case Actions.setAPI:
            return {...state, api:action.payload.api}
        case Actions.setAccountInfo:
            return {...state, accountInfo: action.payload.info}
        case Actions.setGames:
            return {...state, games: action.payload.games}
        default:
            return state;
    }
}