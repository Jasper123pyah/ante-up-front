export const Actions = {
    loginSuccess: "[Authentication] Login Success",
    loginSuccessInternal: "[Authentication] Login Success Internal"
}

export const setUserData = (email, id, token) => ({
    type: Actions.loginSuccessInternal,
    payload: {
        email,
        id,
        token
    }
})

/*
export const login = (username, password) => {
    return function (dispatch, state) {
        dispatch(authenticate())
        const connection = getGlobalConnection(state());

        connection.send("Login", {
            Email: username,
            Password: password
        });
    }
}*/