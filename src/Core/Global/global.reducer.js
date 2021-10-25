import {Actions} from "./global.actions";

const initialState = {
    connection: undefined,
    api: undefined,
    accountInfo: {
        username: "Account",
        balance: 0
    },
    games: [],
    wagerconnection: undefined,
    wagerAPI: undefined
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
        case Actions.setWagerConnection:
            return {...state, wagerconnection:action.payload.wagerconnection}
        case Actions.setWagerAPI:
            return {...state, wagerAPI: action.payload.wagerAPI}
        default:
            return state;
    }
}