
import { FRIENDS, ACTIVE_USER, CURRENT_USER, CHAT_LIST, CHAT_USER, REFETCH_USER, ACTIVE_FRIENDS, AUTOFETCH_MESSAGE, ALL_USERS, SELECTED_USER, ALL_MESSAGE } from './constants';



export const setFriends = (friend) => ({
    type: FRIENDS,
    payload: friend
})
export const setActiveFriends = (users) => ({
    type: ACTIVE_FRIENDS,
    payload: users
})

export const setCurrentUser = (user) => ({
    type: CURRENT_USER,
    payload: user
})
export const setAllUsers = (user) => ({
    type: ALL_USERS,
    payload: user
})

export const setChatList = (chats) => ({
    type: CHAT_USER,
    payload: chats
})
export const refetch = (chats) => ({
    type: REFETCH_USER,
    payload: chats
})
export const autoFetchMessage = (message) => ({
    type: AUTOFETCH_MESSAGE,
    payload: message
})

export const selectedChatUser = (user) => ({
    type: SELECTED_USER,
    payload: user
})

export const setAllMessage = (message) => ({
    type: ALL_MESSAGE,
    payload: message
})
