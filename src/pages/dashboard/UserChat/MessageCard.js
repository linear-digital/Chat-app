import React from 'react'

const MessageCard = () => {
    return (
        <li key={key} className={chat.sender === user?.email ? "right" : ""}>
            <div className="conversation-list">

                <div className="chat-avatar">
                    {chat.userType === "sender" ? <img src={avatar1} alt="chatvia" /> :
                        props.recentChatList[props.active_user].profilePicture === "Null" ?
                            <div className="chat-user-img align-self-center me-3">
                                <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                        {chat.userName && chat.userName.charAt(0)}
                                    </span>
                                </div>
                            </div>
                            : <img src={props.recentChatList[props.active_user].profilePicture} alt="chatvia" />
                    }
                </div>

                <div className="user-chat-content">
                    <div className="ctext-wrap">
                        <div className="ctext-wrap-content">
                            {
                                chat.message &&
                                <p className="mb-0">
                                    {chat.message}
                                </p>
                            }
                            {
                                chat.imageMessage &&
                                // image list component
                                <ImageList images={chat.imageMessage} />
                            }
                            {
                                chat.fileMessage &&
                                //file input component
                                <FileList fileName={chat.fileMessage} fileSize={chat.size} />
                            }
                            {
                                chat.isTyping &&
                                <p className="mb-0">
                                    typing
                                    <span className="animate-typing">
                                        <span className="dot ms-1"></span>
                                        <span className="dot ms-1"></span>
                                        <span className="dot ms-1"></span>
                                    </span>
                                </p>
                            }
                            {
                                !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{chat.time}</span></p>
                            }
                        </div>
                        {
                            <UncontrolledDropdown className="align-self-start">
                                <DropdownToggle tag="a" className="text-muted ms-1">
                                    <i className="ri-more-2-fill"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                    <DropdownItem>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                    <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                    <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        }

                    </div>
                    {
                        <div className="conversation-name">{chat.userType === "sender" ? "Patricia Smith" : chat.userName}</div>
                    }
                </div>
            </div>
        </li>
    )
}

export default MessageCard