import React from 'react';
import { Link } from "react-router-dom";

//carousel
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

//helpers
import { useDispatch, useSelector } from 'react-redux';
import { selectedChatUser } from '../../../redux/actions';




const OnlineUsers = ({ all_friends }) => {
    const { current_user, friends_active } = useSelector(state => state.ChatPro)
    const responsive = {
        0: { items: 4 },
        1024: { items: 4 },
    }

    return (
        <React.Fragment>
            {/* Start user status */}
            <div className="px-4 pb-4 dot_remove" dir="ltr" >
                <AliceCarousel
                    responsive={responsive}
                    disableDotsControls={false}
                    disableButtonsControls={false}
                    mouseTracking

                >
                    {
                        friends_active?.map(friend => <UserCard current_user={current_user} friend={friend} key={friend.id} />)
                    }


                </AliceCarousel>
                {/* end user status carousel */}
            </div>
            {/* end user status  */}
        </React.Fragment>
    );
}

export default OnlineUsers;

const UserCard = ({ friend }) => {
    const dispatch = useDispatch()
    const avatar = 'https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png'

    const setActive = () => {
        dispatch(selectedChatUser(friend))
        localStorage.setItem('selectedUser', JSON.stringify(friend))
    }

    return <div key={friend.id} className={`item `}>
        <Link to="#" onClick={setActive} className="user-status-box">
            <div className="avatar-xs mx-auto d-block chat-user-img online">
                <img src={friend.photo || avatar} alt="user-img" className="img-fluid rounded-circle" />
                {
                    friend.status === "online" && <span className="user-status"></span>
                }
            </div>

            <h5 className="font-size-13 text-truncate mt-3 mb-1">{friend.name}</h5>
        </Link>
    </div>
}