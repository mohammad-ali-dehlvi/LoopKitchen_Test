import { ADD_AUTOCOMPLETE, ADD_BOOKMARK_ITEM, ADD_HOME_ITEM, CHANGE_LOGGIN, CLEAR_ALL, REMOVE_BOOKMARK_ITEM, REMOVE_HOME_ITEM } from "./actions";

const initialState = {
    isLoggedIn: localStorage.getItem("user") != null,
    autoCompleteList: [],
    homeList: JSON.parse(localStorage.getItem("homeList")) || [],
    bookmarkList: JSON.parse(localStorage.getItem("bookmarkList")) || [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_AUTOCOMPLETE:
            state = {
                ...state,
                autoCompleteList: action.payload
            }
            break;
        case ADD_HOME_ITEM:
            state = {
                ...state,
                homeList: [...state.homeList, action.payload]
            }
            localStorage.setItem("homeList", JSON.stringify(state.homeList));
            break;
        case REMOVE_HOME_ITEM:
            state = {
                ...state,
                homeList: state.homeList.filter((_, i) => i != action.payload)
            }
            localStorage.setItem("homeList", JSON.stringify(state.homeList));
            break;
        case ADD_BOOKMARK_ITEM:
            state = {
                ...state,
                bookmarkList: [...state.bookmarkList, action.payload]
            }
            localStorage.setItem("bookmarkList", JSON.stringify(state.bookmarkList));
            break;
        case REMOVE_BOOKMARK_ITEM:
            state = {
                ...state,
                bookmarkList: state.bookmarkList.filter((_, i) => i != action.payload)
            }
            localStorage.setItem("bookmarkList", JSON.stringify(state.bookmarkList));
            break;
        case CHANGE_LOGGIN:
            state = {
                ...state,
                isLoggedIn: action.payload
            }
            break;
        default:
            return state;
    }
    return state;
}

export default reducer;