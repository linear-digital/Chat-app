import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Input, InputGroup, Modal, ModalBody } from 'reactstrap'
import { headers, server_URL } from '../../../helpers'
import Loading from '../../../components/Loading'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { refetch } from '../../../redux/actions'
import request from '../../../helpers/request'

const AddFriend = ({ isModelOpen, toogleModal, currentUser }) => {

    const { friends, all_users, current_user } = useSelector(state => state.ChatPro)
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (search === "") {
            setUsers(all_users)
        }
        else {
            setUsers(all_users?.filter(user => user.name.toLowerCase().includes(search.toLowerCase())))
        }
    }, [currentUser, all_users, search])
    // if (isLoading || loading) {
    //     return <Loading />
    // }
    return (
        <Modal isOpen={isModelOpen} toggle={toogleModal} className="modal-dialog-centered">
            <ModalBody>
                <div className="p-3">
                    <div className="search-box chat-search-box">
                        <InputGroup className="mb-3 rounded-3">
                            <span className="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                                <i className="ri-search-line search-icon font-size-18"></i>
                            </span>
                            <Input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control bg-light" placeholder="Search messages or users" />
                        </InputGroup>
                    </div>

                    <div className='user-box'>
                        {

                            <div >
                                {
                                    users?.map((user, key) => current_user.email === user.email ? null : <UserCard
                                        friends={friends}
                                        currentUser={currentUser}
                                        key={key} user={user} />)
                                }
                            </div>
                        }
                    </div>
                </div>
            </ModalBody>
        </Modal >
    )
}

export default AddFriend

const UserCard = ({ user, currentUser, friends }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const avatar = "https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
    const [isFriend, setIsFriend] = useState(false)
    useEffect(() => {
        friends?.forEach(friend => {
            if (friend.email === user.email) {
                setIsFriend(true)
            }
        })

    }, [user, friends])
    const AddFriend = async () => {
        setLoading(true) 
        const newFrind = { user_email: currentUser.email, friend_email: user.email }
        const isAdded = await request.postData(`/friendlist/check`, newFrind)

        if (isAdded?.length === 0) {
            fetch(`${server_URL}/api/friendlist`, {
                method: "post",
                headers: headers,
                body: JSON.stringify(newFrind)
            }).then(res => res.json())
                .then(json => {
                    setLoading(false)
                    dispatch(refetch(json))
                    toast.success("Friend Added")
                })
        }
        else {
            console.log(isAdded)
            setLoading(false)
            toast.error("Friend already added")
        }

    }
    const removeFriend = () => {
        const newFrind = { user_email: currentUser.email, friend_email: user.email }
        fetch(`${server_URL}/api/friendlist`, {
            method: "delete",
            headers: headers,
            body: JSON.stringify(newFrind)
        }).then(res => {
            if (res.status === 200) {
                setIsFriend(false)
                dispatch(refetch(res))
                toast.success("Friend removed successfully")
            }
        })

    }

    return (
        <div className="shadow py-2">

            <div className='d-flex mb-2'>
                {
                    <div className={"chat-user-img " + user.status + " align-self-center d-flex me-1 ms-0"}>
                        {
                            user.photo ?
                                <img src={user.photo} className="rounded-circle avatar-xs" alt="chatvia" />
                                :
                                <img src={avatar} className="rounded-circle avatar-xs" alt="chatvia" />
                        }
                        {
                            user.status === "online" && <span className="user-status"></span>
                        }
                    </div>
                }
                <div className='ms-2'>
                    <h5 className="font-size-14 mb-0">{user.name}</h5>
                    <p className=" mb-0">{user.email}</p>
                </div>
            </div>
            {

                loading ? <div className='position-absolute '>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                    :
                    <div>
                        {
                            !isFriend
                                ?
                                <button onClick={AddFriend} className='btn btn-sm btn-primary'>
                                    Add Friend
                                </button>
                                :
                                <button onClick={removeFriend} className='btn btn-sm btn-primary'>
                                    Remove Friend
                                </button>

                        }
                    </div>
            }



        </div>
    )
}