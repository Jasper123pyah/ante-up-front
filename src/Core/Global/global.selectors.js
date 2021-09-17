export const getGlobalState = store => store.global;

export const getGlobalConnection = store => getGlobalState(store).connection;
export const getAPI = store => getGlobalState(store).api;