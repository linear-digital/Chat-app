import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setCurrentUser, setFriends, setActiveFriends, setAllUsers, setAllMessage, selectedChatUser } from '../../redux/actions'
import request from '../../helpers/request'
// import tone from '../../assets/tone.wav'

const DefaultFetch = ({ user }) => {

    const { refetch, selected_user, auto_fetch_message } = useSelector(state => state.ChatPro)
    //https://openly-steady-chigger.ngrok-free.app/api/chats/get
    const dispatch = useDispatch()
    useEffect(() => {
        (
            async () => {
                const currentUser = await request.getData(`/users/${user?.email}`)
                dispatch(setCurrentUser(currentUser))

                const users = await request.getData('/users')
                dispatch(setAllUsers(users))

                const friends = await request.getData(`/friendlist/${user?.email}`)
                const emailsTemp = await friends.map((friend) => friend.friend_email)

                const emails = await emailsTemp.filter((email) => email !== user?.email)
                if (emails[0]) {
                    const friendList = await request.postData(`/friendlist/getFriend`, { emails: emails })

                    dispatch(setFriends(friendList))
                    const activeList = await friendList.filter((friend) => friend.status === "online")

                    dispatch(setActiveFriends(activeList))
                }
                else {
                    dispatch(setActiveFriends([]))
                    dispatch(setFriends([]))
                }


            }
        )()

    }, [refetch, user])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('selectedUser'))
        dispatch(selectedChatUser(user))
    }, [])

    useEffect(() => {
        (
            async () => {
                const message = await request.postData(`/chats/get`, {
                    sender: user?.email,
                    receiver: selected_user?.email
                })
                dispatch(setAllMessage(message))
            }
        )()
    }, [auto_fetch_message, selected_user, user])
    return <></>
}

export default DefaultFetch


