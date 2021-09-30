export const Actions = {
    setConnection: "[Global] Connection",
    setAPI:"[Global] API",
    setAccountInfo:"[Global] AccountInfo"
}

export const setConnection = (connection) => ({
    type: Actions.setConnection,
    payload: {
        connection
    }
})
export const setAccountInfo = (info) => ({
    type:Actions.setAccountInfo,
    payload:{
        info
    }
})
export const setAPI = (api) =>({
    type: Actions.setAPI,
    payload:{
        api
    }
})