import React, { Component } from 'react';
import { Input, InputGroup, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//simplebar
import SimpleBar from "simplebar-react";

//actions
import { setconversationNameInOpenChat, activeUser, setFriends, selectedChatUser } from "../../../redux/actions";

//components
import OnlineUsers from "./OnlineUsers";
import AddFriend from './AddFriend';
import RecentCard from './RecentCard';


class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchChat: "",
            recentChatList: this.props.recentChatList,
            isModelOpen: false
        }
        this.openUserChat = this.openUserChat.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        var li = document.getElementById("conversation" + this.props.active_user);
        if (li) {
            li.classList.add("active");
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                recentChatList: this.props.recentChatList
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.recentChatList !== nextProps.recentChatList) {
            this.setState({
                recentChatList: nextProps.recentChatList,
            });
        }
    }

    handleChange(e) {
        this.setState({ searchChat: e.target.value });
        var search = e.target.value;
        let conversation = this.state.recentChatList;
        let filteredArray = [];

        //find conversation name from array
        for (let i = 0; i < conversation.length; i++) {
            if (conversation[i].name.toLowerCase().includes(search) || conversation[i].name.toUpperCase().includes(search))
                filteredArray.push(conversation[i]);
        }

        //set filtered items to state
        this.setState({ recentChatList: filteredArray })

        //if input value is blanck then assign whole recent chatlist to array
        if (search === "") this.setState({ recentChatList: this.props.recentChatList })
    }

    openUserChat(e, chat) {

        // set activeUser 
        if (chat) {
            this.props.selectedChatUser(chat)
            localStorage.setItem('selectedUser', JSON.stringify(chat))

            var chatList = document.getElementById("chat-list");
            var clickedItem = e.target;
            var currentli = null;

            if (chatList) {
                var li = chatList.getElementsByTagName("li");
                //remove coversation user
                for (var i = 0; i < li.length; ++i) {
                    if (li[i].classList.contains('active')) {
                        li[i].classList.remove('active');
                    }
                }
                //find clicked coversation user
                for (var k = 0; k < li.length; ++k) {
                    if (li[k].contains(clickedItem)) {
                        currentli = li[k];
                        break;
                    }
                }
            }

            //activation of clicked coversation user
            if (currentli) {
                currentli.classList.add('active');
            }

            var userChat = document.getElementsByClassName("user-chat");
            if (userChat) {
                userChat[0].classList.add("user-chat-show");
            }

            //removes unread badge if user clicks
            var unread = document.getElementById("unRead" + chat?.id);
            if (unread) {
                unread.style.display = "none";
            }
        }
    }
    toogleModal = () => {
        this.setState({
            isModelOpen: !this.state.isModelOpen
        })

    }
    setSelectedUser = (user) => {
        this.props.selectedChatUser(user)
        localStorage.setItem('selectedUser', JSON.stringify(user))
    }

    render() {

        return (
            <React.Fragment>
                <div>
                    <div className="px-4 pt-4">
                        <div className='d-flex align-items-center justify-content-between mb-4'>
                            <h4 className="">Chats</h4>
                            <button
                                onClick={this.toogleModal}
                                className='btn btn-light'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="text-primary" style={{ width: "20px", height: "20px" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                        <div className="search-box chat-search-box">
                            <InputGroup className="mb-3 rounded-3">
                                <span className="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                                    <i className="ri-search-line search-icon font-size-18"></i>
                                </span>
                                <Input type="text" value={this.state.searchChat} onChange={(e) => this.handleChange(e)} className="form-control bg-light" placeholder="Search messages or users" />
                            </InputGroup>
                        </div>
                        {/* Search Box */}
                    </div>
                    {
                        this.state.isModelOpen &&
                        <AddFriend currentUser={this.props.user} isModelOpen={this.state.isModelOpen} toogleModal={this.toogleModal} />
                    }
                    {/* online users */}
                    <OnlineUsers all_friends={this.props.friends} />

                    {/* Start chat-message-list  */}
                    <div>
                        <h5 className="mb-3 px-3 font-size-16">Recent</h5>
                        <SimpleBar className="chat-message-list">

                            <ul className="list-unstyled chat-list chat-user-list px-2" id="chat-list">
                                {
                                    this.props.friends &&
                                    this.props.friends?.map((chat, index) => (
                                        <div onClick={(e) => this.openUserChat(e, chat)} key={index}>
                                            <RecentCard chat={chat} />
                                        </div>
                                    ))
                                }

                            </ul>
                        </SimpleBar>

                    </div>
                    {/* End chat-message-list */}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { active_user, users } = state.Chat;
    const { friends } = state.ChatPro;
    return { active_user, friends, users };
};

export default connect(mapStateToProps, { setconversationNameInOpenChat, activeUser, setFriends, selectedChatUser })(Chats);


