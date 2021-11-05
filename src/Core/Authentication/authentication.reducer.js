import {Actions} from "./authentication.actions";

const initialState = {
    token: "",
    email: "",
    id: "",
    error: ""
}

export default function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.authenticate:
            return {...state, authenticating: true}
        case Actions.loginSuccessInternal:
            return {
                ...state,
                token: action.payload.token,
                email: action.payload.email,
                id: action.payload.id
            }
        default:
            return state;
    }
}