export enum UserAction {
  SET_USER_INFO = "SET_USER_INFO"
}
export enum EntriesAction {
  SET_ENTRIES = "SET_ENTRIES",
  ADD_ENTRY = "ADD_ENTRY",
  UPDATE_ENTRY = "UPDATE_ENTRY",
  DELETE_ENTRY = "DELETE_ENTRY",
}
export enum AdminAction {
  SET_REPORT_INFO = "SET_REPORT_INFO",
  SET_USERS_LIST = "SET_USERS_LIST",
}

export enum MetaAction {
  SET_LOADING_ENTRIES = "SET_LOADING_ENTRIES",
  SET_LOADING_REPORT_DATA = "SET_LOADING_REPORT_DATA",
  SET_LOADING_USERS_LIST = "SET_LOADING_USERS_LIST",
  SET_LOADING_USER_INFO = "SET_LOADING_USER_INFO"
}