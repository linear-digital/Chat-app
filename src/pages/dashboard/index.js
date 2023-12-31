import React, { Component, useEffect, useState } from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat/index";

import { connect, useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client'
import { getLoggedInUser } from '../../helpers/authUtils';

import { currentUser, refetch, autoFetchMessage } from '../../redux/actions';
import DefaultFetch from './DefaultFetch';
import tone from '../../assets/tone.wav'



export const socket = io('http://localhost:4000', {
    transports: ['websocket', 'polling'],
    query: {
        email: getLoggedInUser().user?.email
    }
})

const Index = (props) => {
    const payNotification = () => {
        const playTone = new Audio(tone)
        playTone.play()
    }
    const dispatch = useDispatch()
    document.title = "Chat | Chatvia - Responsive Bootstrap 5 Admin Dashboard"

    const user = getLoggedInUser().user
    useEffect(() => {
        if (user) {
            socket.emit('new-user', user?.email);
        }
        // socket.emit('send-chat-message', "user.email");
    }, [user, socket]);
    useEffect(() => {
        // Listen for messages from the server
        socket.on('disconnectd-user', (data) => {
            dispatch(refetch(data))

        });
        socket.on('connected-user', (data) => {
            dispatch(refetch(data))
        })
        socket.on('message', (data) => {
            dispatch(autoFetchMessage(data))
            if (data.receiver === user?.email) {
                payNotification()
            }
        })
        // Clean up when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, [socket])
    return (
        <React.Fragment>
            <DefaultFetch user={user} />
            <ToastContainer />
            {/* chat left sidebar */}
            <ChatLeftSidebar recentChatList={props.users} />

            {/* user chat */}
            <UserChat recentChatList={props.users} />

        </React.Fragment>
    );

}

const mapStateToProps = (state) => {
    const { users } = state.Chat;
    return { users };
};

export default connect(mapStateToProps, { currentUser })(Index);