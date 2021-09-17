export const Actions = {
    setConnection: "[Global] Connection",
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