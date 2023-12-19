import {
    ACTIVE_FRIENDS,
    ACTIVE_USERS,
    ALL_MESSAGE,
    ALL_USERS,
    AUTOFETCH_MESSAGE,
    CHAT_LIST,
    CHAT_USER,
    CURRENT_USER,
    FRIENDS,
    REFETCH_USER,
    SELECTED_USER,

} from './constants';

const INIT_STATE = {
    friends: [],
}


const ChatPro = (state, action) => {
    switch (action.type) {
        case FRIENDS:
            return {
                ...state,
                friends: action.payload
            };
        case ACTIVE_FRIENDS:
            return {
                ...state,
                friends_active: action.payload
            };
        case CURRENT_USER:
            return {
                ...state,
                current_user: action.payload
            }
        case ALL_USERS:
            return {
                ...state,
                all_users: action.payload
            }
        case CHAT_LIST:
            return {
                ...state,
                chat_list: action.payload
            }
        case CHAT_USER: return {
            ...state,
            chat_user: action.payload
        }
        case REFETCH_USER: return {
            ...state,
            refetch: action.payload
        }
        case AUTOFETCH_MESSAGE:
            return {
                ...state,
                auto_fetch_message: action.payload
            }
        case ALL_MESSAGE:
            return {
                ...state,
                all_message: action.payload
            }
        case SELECTED_USER:
            return {
                ...state,
                selected_user: action.payload
            }
        default: return { ...state };
    }
}

export default ChatPro;