import React, { useEffect, useState } from 'react'
import request from '../../../../helpers/request'
import { useSelector } from 'react-redux'

const MessageTemplate = ({ chatHandler, onDoubleClick }) => {
    const { selected_user, current_user } = useSelector(state => state.ChatPro)
    const [messages, setMessages] = useState([])
    useEffect(() => {
        (
            async () => {
                const mes = await fetch('http://localhost:4000/api/bot')
                const messages = await mes.json()
                setMessages(messages.data)
            }
        )()
    }, [])

    return (
        <div onDoubleClick={onDoubleClick}>
            {
                !messages && <div className='position-absolute loader '>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            <div className='position-absolute shadow botmessage-template '>

                {
                    messages.map(message => <div onClick={() => chatHandler(message)} className='shadow-lg bg-primary cursor-pointer py-1 px-2 text-white rounded'>{message.title}</div>)
                }

            </div>
        </div>

    )
}

export default MessageTemplate