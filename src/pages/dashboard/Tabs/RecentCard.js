import React from 'react'
import { Link } from 'react-router-dom'

const RecentCard = ({ chat }) => {
    const avatar = 'https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png'
    return (
        <li key={chat.id} id={"conversation" + chat.id}>
            <Link to="#" >
                <div className="d-flex">
                    {
                        chat.photo === "Null" ?
                            <div className={"chat-user-img " + chat.status + " align-self-center me-1 ms-0"}>
                                <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                        {chat.name}
                                    </span>
                                </div>
                                {
                                    chat.status && <span className="user-status"></span>
                                }
                            </div>
                            :
                            <div className={"chat-user-img " + chat.status + " align-self-center me-1 ms-0"}>
                                <img src={chat.photo || avatar} className="rounded-circle avatar-xs" alt="chatvia" />
                                {
                                    chat.status === "online" ? <span className="user-status"></span>
                                        :
                                        <span className="user-status away"></span>
                                }
                            </div>
                    }

                    <div className="flex-grow-1 overflow-hidden">
                        <h5 className="text-truncate font-size-15 mb-1 ms-3">{chat.name}</h5>
                        {/* <p className="chat-user-message font-size-14 text-truncate mb-0 ms-3">

                            {
                                chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isImageMessage === true) ? <i className="ri-image-fill align-middle me-1"></i> : null
                            }
                            {
                                chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isFileMessage === true) ? <i className="ri-file-text-fill align-middle me-1"></i> : null
                            }
                            {
                                chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].message : null
                            }

                        </p> */}
                    </div>
                    {/* <div className="font-size-11">{chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].time : null}</div> */}
                    {/* {chat.unRead === 0 ? null :
                        <div className="unread-message" id={"unRead" + chat.id}>
                            <span className="badge badge-soft-danger rounded-pill">{chat.messages && chat.messages.length > 0 ? chat.unRead >= 20 ? chat.unRead + "+" : chat.unRead : ""}</span>
                        </div>
                    } */}
                </div>
            </Link>
        </li>
    )
}

export default RecentCard