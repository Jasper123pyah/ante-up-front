export const Actions = {
    setConnection: "[Global] Connection",
    setTheme: "[Global] Theme"
}

export const setConnection = (connection) => ({
    type: Actions.setConnection,
    payload: {
        connection
    }
})
export const setTheme = (theme) => ({
    type: Actions.setTheme,
    payload: {
        theme
    }
})