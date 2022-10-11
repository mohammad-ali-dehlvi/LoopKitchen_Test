import { ADD_AUTOCOMPLETE, ADD_BOOKMARK_ITEM, ADD_HOME_ITEM, CHANGE_LOGGIN, REMOVE_BOOKMARK_ITEM, REMOVE_HOME_ITEM } from "./actions";

function addAutoComplete(payload) {
    return {
        type: ADD_AUTOCOMPLETE,
        payload
    }
}

function addHomeItem(payload) {
    return {
        type: ADD_HOME_ITEM,
        payload,
    }
}

function removeHomeItem(payload) {
    return {
        type: REMOVE_HOME_ITEM,
        payload,
    }
}

function addBookmarkItem(payload) {
    return {
        type: ADD_BOOKMARK_ITEM,
        payload,
    }
}

function removeBookmarkItem(payload) {
    return {
        type: REMOVE_BOOKMARK_ITEM,
        payload
    }
}

function changeLoggin(payload) {
    return {
        type: CHANGE_LOGGIN,
        payload,
    }
}

export {
    addAutoComplete,
    addHomeItem,
    removeHomeItem,
    addBookmarkItem,
    removeBookmarkItem,
    changeLoggin,
};