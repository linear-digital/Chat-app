import React, { useState, useEffect, useRef } from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Modal, ModalHeader, ModalBody, CardBody, Button, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
// import 'monaco-editor/esm/vs/editor/editor.all.css';


import SimpleBar from "simplebar-react";

import withRouter from "../../../components/withRouter";

//Import Components
import UserProfileSidebar from "../../../components/UserProfileSidebar";
import SelectContact from "../../../components/SelectContact";
import UserHead from "./UserHead";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";


//actions
import { openUserSidebar, setFullUser, autoFetchMessage } from "../../../redux/actions";

//Import Images


//i18n
import { useTranslation } from 'react-i18next';
import NoUserSelected from './NoUserSelected';
import request from '../../../helpers/request';
import FilePreview from './FilePreview';
import axios from 'axios';
import MonacoEditor from 'react-monaco-editor';

function UserChat(props) {

    const ref = useRef();

    const [modal, setModal] = useState(false);

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    //demo conversation messages
    //userType must be required


    const toggle = () => setModal(!modal);

    const addMessage = (message, type) => {
        // scrolltoBottom();
    }


    const deleteMessage = async (id) => {
        const response = await request.postData(`/chats/delete/${id}`, {})
        if (response) {
            props.autoFetchMessage(response)
        }
    }

    const [messages, setMessages] = useState([])
    const user = props.current_user
    const [height, setHeght] = useState(0)
    const downloadImage = async (imageUrl) => {
        try {
            const res = await fetch(imageUrl, { responseType: 'blob' });
            const data = await res.blob();

            const url = window.URL.createObjectURL(data);

            // Create a link element and trigger a download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'image-download.jpg'; // You can change the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };
    useEffect(() => {
        const element = document.getElementById('messages');
        if (element) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }, [height, props.all_message])

    useEffect(() => {
        if (props.all_message) {
            setMessages(props.all_message)
        }
        else {
            setMessages([])
        }


    }, [props.all_message])

    if (!props.selected_user) {
        return <NoUserSelected />
    }
    const avater1 = 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
    const avater2 = 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp'
    const detectLinks = text => {
        // Regular expression to match URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        // Replace URLs with clickable links
        return text.replace(urlRegex, url => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                {url}
            </a>
        ));
    };

    return (
        <React.Fragment>
            <div className="user-chat w-100 overflow-hidden">

                <div className="d-lg-flex">

                    <div className={props.userSidebar ? "w-70 overflow-hidden position-relative" : "w-100 overflow-hidden position-relative"}>

                        {/* render user head */}
                        <UserHead />

                        <SimpleBar
                            style={{ maxHeight: "100%" }}
                            ref={ref}
                            className="chat-conversation p-5 p-lg-4"
                        >
                            <ul className="list-unstyled mb-5" id="messages" ref={(el) => {
                                if (el) {
                                    setHeght(el.scrollHeight)
                                }
                            }}>
                                {
                                    messages?.map((chat, key) => {
                                        return <div key={key}>
                                            {
                                                chat.sender === user?.email ?
                                                    <li key={key} className={"right"}>
                                                        <div className="conversation-list">

                                                            <div className="chat-avatar">
                                                                <img src={user.photo || avater1} alt="chatvia" />
                                                            </div>

                                                            <div className="user-chat-content">
                                                                <div className="ctext-wrap">
                                                                    {
                                                                        chat.status === "deleted"
                                                                            ?
                                                                            <span className='deleted'>Message Removed</span>
                                                                            :
                                                                            <div className="ctext-wrap-content">
                                                                                {
                                                                                    chat.type === "text" &&
                                                                                    <p className="mb-0">
                                                                                        {
                                                                                            detectLinks(chat.message)

                                                                                        }
                                                                                    </p>
                                                                                }
                                                                                {
                                                                                    chat.type === "image" &&
                                                                                    // image list component
                                                                                    <ImageList images={[chat.image]} />
                                                                                }
                                                                                {
                                                                                    chat.type === "file" &&
                                                                                    //file input component
                                                                                    <FilePreview file={chat} />
                                                                                }
                                                                            </div>
                                                                    }

                                                                    {
                                                                        chat.status !== "deleted" &&
                                                                        <UncontrolledDropdown className="align-self-start">
                                                                            <DropdownToggle tag="a" className="text-muted ms-1">
                                                                                <i className="ri-more-2-fill"></i>
                                                                            </DropdownToggle>
                                                                            <DropdownMenu>
                                                                                {
                                                                                    chat.type === "text" &&
                                                                                    <DropdownItem onClick={() => navigator.clipboard.writeText(chat.message)}>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                                }
                                                                                {
                                                                                    chat.type === "text" &&
                                                                                    <DropdownItem onClick={() => downloadImage(chat.image)}>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                                                }
                                                                                <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                                            </DropdownMenu>
                                                                        </UncontrolledDropdown>
                                                                    }

                                                                </div>
                                                                {
                                                                    <div className="conversation-name">
                                                                        {user.name}
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                                    :
                                                    <li key={key} className={""}>
                                                        <div className="conversation-list">
                                                            <div className="chat-avatar">
                                                                <img src={props.selected_user?.photo || avater2} alt="chatvia" />
                                                            </div>

                                                            <div className="user-chat-content">
                                                                <div className="ctext-wrap">
                                                                    <div className="ctext-wrap-content">
                                                                        {
                                                                            chat.type === "text" &&
                                                                            <p className="mb-0">
                                                                                {
                                                                                    chat.status === "deleted"
                                                                                        ?
                                                                                        <span className='deleted'>{chat.status}</span>
                                                                                        :
                                                                                        chat.message
                                                                                }

                                                                            </p>
                                                                        }
                                                                        {
                                                                            chat.type === "code" &&
                                                                            <p className="mb-0">
                                                                                {
                                                                                    chat.status === "deleted"
                                                                                        ?
                                                                                        <span className='deleted'>{chat.status}</span>
                                                                                        :
                                                                                        // <MonacoEditor
                                                                                        //     width="800"
                                                                                        //     height="600"
                                                                                        //     language="javascript"
                                                                                        //     theme="vs-dark" // or 'light'
                                                                                        //     value={chat.message}
                                                                                        //     options={{ selectOnLineNumbers: true }}
                                                                                        //     onChange={() => { }}
                                                                                        // />
                                                                                        <p style={{ whiteSpace: 'pre-wrap', maxWidth: "500px", }} >{chat.message}</p>
                                                                                }

                                                                            </p>
                                                                        }
                                                                        {
                                                                            chat.type === "image" &&
                                                                            // image list component
                                                                            <ImageList images={[chat.image]} />
                                                                        }
                                                                        {
                                                                            chat.type === "file" &&
                                                                            //file input component
                                                                            <FilePreview file={chat} />
                                                                        }
                                                                    </div>
                                                                    {
                                                                        chat.status !== "deleted" &&
                                                                        <UncontrolledDropdown className="align-self-start">
                                                                            <DropdownToggle tag="a" className="text-muted ms-1">
                                                                                <i className="ri-more-2-fill"></i>
                                                                            </DropdownToggle>
                                                                            <DropdownMenu>
                                                                                {
                                                                                    chat.type === "text" || "code" &&
                                                                                    <DropdownItem onClick={() => navigator.clipboard.writeText(chat.message)}>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                                }
                                                                                {
                                                                                    chat.type === "image" &&
                                                                                    <DropdownItem onClick={() => downloadImage(chat.image)}>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                                                }
                                                                                {/* <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem> */}
                                                                            </DropdownMenu>
                                                                        </UncontrolledDropdown>
                                                                    }

                                                                </div>
                                                                {
                                                                    <div className="conversation-name">
                                                                        {props.selected_user?.name}
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                            }
                                        </div>


                                    }
                                    )
                                }
                            </ul>
                        </SimpleBar>

                        <Modal backdrop="static" isOpen={modal} centered toggle={toggle}>
                            <ModalHeader toggle={toggle}>Forward to...</ModalHeader>
                            <ModalBody>
                                <CardBody className="p-2">
                                    <SimpleBar style={{ maxHeight: "200px" }}>
                                        <SelectContact handleCheck={() => { }} />
                                    </SimpleBar>
                                    <ModalFooter className="border-0">
                                        <Button color="primary">Forward</Button>
                                    </ModalFooter>
                                </CardBody>
                            </ModalBody>
                        </Modal>

                        <ChatInput onaddMessage={addMessage} />
                    </div>

                    <UserProfileSidebar activeUser={props.recentChatList[props.active_user]} />

                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_user } = state.Chat;
    const { userSidebar } = state.Layout;
    const { selected_user, all_message, current_user } = state.ChatPro
    return { active_user, userSidebar, selected_user, all_message, current_user };
};

export default withRouter(connect(mapStateToProps, { openUserSidebar, setFullUser, autoFetchMessage })(UserChat));

