export const Actions = {
    setConnection: "[Global] Connection",
    setAPI:"[Global] API",
    setAccountInfo:"[Global] AccountInfo",
    setGames:"[Global] Games",
    setWagerConnection: "[Global] WagerConnection",
    setWagerAPI: "[Global] WagerAPI"
}

export const setConnection = (connection) => ({
    type: Actions.setConnection,
    payload: {
        connection
    }
})
export const setWagerConnection = (connection) =>({
    type: Actions.setWagerConnection,
    payload: {
        connection
    }
})
export const setGames = (games) => ({
    type: Actions.setGames,
    payload:{
        games
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
export const setWagerAPI = (api) =>({
    type: Actions.setWagerAPI,
    payload:{
        api
    }
})