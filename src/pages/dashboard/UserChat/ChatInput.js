import React, { useState } from 'react';
import { Button, Input, Row, Col, UncontrolledTooltip, ButtonDropdown, DropdownToggle, DropdownMenu, Label, Form } from "reactstrap";
import EmojiPicker from 'emoji-picker-react';
import { socket } from '..';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ChatInput(props) {
    const { current_user, selected_user } = useSelector(state => state.ChatPro)
    const [textMessage, settextMessage] = useState("");
    const [isOpen, setisOpen] = useState(false);
    const [file, setfile] = useState({
        name: "",
        size: ""
    });
    const [selectedFile, setSelectedFile] = useState(null)
    const [imageTitle, setImageTitle] = useState("")
    const [fileImage, setfileImage] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)


    const toggle = () => setisOpen(!isOpen);

    //function for text input value change
    const handleChange = e => {
        settextMessage(e.target.value);
    }

    const onEmojiClick = (event) => {
        settextMessage(textMessage + event.emoji);
    };

    //function for file input change
    const handleFileChange = e => {
        if (e.target.files.length !== 0) {
            setfile({
                name: e.target.files[0].name,
                size: e.target.files[0].size,
            })
            setSelectedFile(e.target.files[0])
        }
    }
    const handleFIleSend = async () => {
        if (selectedFile) {
            setLoading(true)
            const formData = new FormData();
            formData.append("image", selectedFile);
            const responseIU = await fetch("https://openly-steady-chigger.ngrok-free.app/api/upload-image", {
                method: "post",
                body: formData,
            })
            const imageLink = await responseIU.json()
            setLoading(false)
            if (imageLink.image) {
                const newMessage = {
                    sender: current_user?.email,
                    receiver: selected_user.email,
                    message: "",
                    type: "file",
                    image: "",
                    imageTitle: "",
                    document: imageLink.image,
                    fileSize: file.size,
                    fileName: file.name,
                }

                socket.emit('new_message', newMessage)
                setfile({
                    name: "",
                    size: ""
                })
                setSelectedFile(null)
            }
        }
    }
    //function for image input change
    const handleImageChange = e => {
        if (e.target.files.length !== 0) {
            setSelectedImage(e.target.files[0])
            setfileImage(URL.createObjectURL(e.target.files[0]))
        }

    }
    const [loading, setLoading] = useState(false)
    const sendImageMessage = async () => {
        if (selectedImage !== null) {
            setLoading(true)
            const formData = new FormData();
            formData.append("image", selectedImage);
            const responseIU = await fetch("https://openly-steady-chigger.ngrok-free.app/api/upload-image", {
                method: "post",
                body: formData,
            })
            const imageLink = await responseIU.json()
            setLoading(false)
            if (imageLink.image) {
                const newMessage = {
                    sender: current_user?.email,
                    receiver: selected_user.email,
                    message: "",
                    type: "image",
                    image: imageLink.image,
                    imageTitle: imageTitle,
                    document: "",
                    fileSize: "",
                    fileName: "",
                }

                socket.emit('new_message', newMessage)
                setImageTitle("")
                setfileImage("")
                setSelectedImage()
            }
            else {
                toast.error("Something went wrong while sending image")
            }


        }
    }
    //function for send data to onaddMessage function(in userChat/index.js component)
    const onaddMessage = async (e, textMessage) => {
        e.preventDefault();


        // if text value is not emptry then call onaddMessage function
        if (textMessage !== "") {
            if (textMessage.length < 5000) {
                setLoading(true)
                // socket.emit('new_message', textMessage)
                const newMessage = {
                    sender: current_user?.email,
                    receiver: selected_user.email,
                    message: textMessage,
                    type: "text",
                    image: "",
                    imageTitle: "",
                    document: "",
                    fileSize: "",
                    fileName: "",
                }
                try {
                    socket.emit('new_message', newMessage)
                    settextMessage("")
                    setLoading(false)
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            }
            else{
                toast.error("Text Limit Over")
            }
        }

    }

    return (
        <React.Fragment>
            {
                loading && <div className='position-absolute loader '>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

            <div className="chat-input-section p-3 p-lg-4 border-top mb-0 ">
                <Form onSubmit={(e) => onaddMessage(e, textMessage)} >
                    <Row className='g-0'>
                        <Col>
                            <div>
                                <Input type="text" value={textMessage} onChange={handleChange} className="form-control form-control-lg bg-light border-light" placeholder="Enter Message..." />
                            </div>
                        </Col>
                        <Col xs="auto">
                            <div className="chat-input-links ms-md-2">
                                <ul className="list-inline mb-0 ms-0">
                                    <li className="list-inline-item">
                                        <ButtonDropdown className="emoji-dropdown" direction="up" isOpen={isOpen} toggle={toggle}>
                                            <DropdownToggle id="emoji" color="link" className="text-decoration-none font-size-16 btn-lg waves-effect">
                                                <i className="ri-emotion-happy-line"></i>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-end">
                                                <EmojiPicker onEmojiClick={onEmojiClick} />
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                        <UncontrolledTooltip target="emoji" placement="top">
                                            Emoji
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="list-inline-item input-file">
                                        <Label id="files" className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect">
                                            <i className="ri-attachment-line"></i>
                                            <Input onChange={(e) => handleFileChange(e)} type="file" name="fileInput" size="60" />
                                        </Label>
                                        <UncontrolledTooltip target="files" placement="top">
                                            Attached File
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="list-inline-item input-file position-relative">
                                        {
                                            fileImage &&
                                            <div className='image-preview border-primary'>
                                                <img src={fileImage} alt="" />
                                                <div className='image-title'>
                                                    <input type="text" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} className="form-control form-control-sm bg-light border-light" placeholder="Enter Title" />
                                                    {
                                                        !loading &&
                                                        <div onClick={sendImageMessage} className='btn btn-sm btn-primary'>Send</div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                        {
                                            selectedFile &&
                                            <div className='image-preview border-primary'>
                                                <div className='docuemtn-preview'>
                                                    <img src={'/document.png'} alt="" />
                                                    <div style={{ width: "80%" }}>
                                                        <p className="mb-0"><strong>Name : </strong>{selectedFile.name?.slice(0, 10) + '**' + selectedFile.name?.slice(-5)}</p>
                                                        <p className="mb-0"><strong>Size : </strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
                                                    </div>
                                                </div>
                                                <div className='image-title'>
                                                    {
                                                        !loading &&
                                                        <div onClick={handleFIleSend} className='btn btn-sm btn-primary'>Send</div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                        <Label id="images" className="me-1 btn btn-link text-decoration-none font-size-16 btn-lg waves-effect">
                                            <i className="ri-image-fill"></i>
                                            <Input onChange={(e) => handleImageChange(e)} accept="image/*" type="file" name="fileInput" size="60" />
                                        </Label>
                                        <UncontrolledTooltip target="images" placement="top">
                                            Images
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="list-inline-item">
                                        <Button disabled={loading} type="submit" color="primary" className="font-size-16 btn-lg chat-send waves-effect waves-light">
                                            <i className="ri-send-plane-2-fill"></i>
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </React.Fragment>
    );
}

export default ChatInput;