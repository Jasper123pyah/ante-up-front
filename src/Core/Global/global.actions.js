export const Actions = {
    setConnection: "[Global] Connection",
    setTheme: "[Global] Theme",
    setAPI:"[Global] API"
}

export const setConnection = (connection) => ({
    type: Actions.setConnection,
    payload: {
        connection
    }
})
export const setAPI = (api) =>({
    type: Actions.setAPI,
    payload:{
        api
    }
})
export const setTheme = (theme) => ({
    type: Actions.setTheme,
    payload: {
        theme
    }
})