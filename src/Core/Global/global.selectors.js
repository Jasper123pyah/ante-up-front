export const getGlobalState = store => store.global;

export const getAPI = store => getGlobalState(store).api;
export const getAccountInfo = store => getGlobalState(store).accountInfo;
export const getGames = store => getGlobalState(store).games;
export const getWagerAPI = store => getGlobalState(store).wagerAPI;
export const getWagerConnection = store => getGlobalState(store).wagerconnection;
export const getGlobalConnection = store => getGlobalState(store).connection;