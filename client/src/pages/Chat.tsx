import { useNavigate } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import styled from 'styled-components'
import { allUsersRoute, host } from '../utils/ApiRoutes'
import ChatContainer from '../components/ChatContainer'
import { Contacts } from '../components/Contacts'
import { Welcome } from '../components/Welcome'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Contact } from '../types'

const Chat = () => {
  const navigate = useNavigate()
  const socket = useRef() as MutableRefObject<Socket>
  const [contacts, setContacts] = useState<Contact[]>([])
  const [currentChat, setCurrentChat] = useState<Contact | undefined>(undefined)
  const [currentUser, setCurrentUser] = useState<{
    _id: string
    isAvatarImageSet: boolean
  } | null>(null)

  useEffect(() => {
    const getUser = async () => {
      //getting user from localStorage
      const userObject = localStorage.getItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY as string)
      if (userObject === null) {
        navigate('/login')
        return
      }
      const user = await JSON.parse(userObject)
      setCurrentUser(user)
    }
    getUser()
  }, [])
  useEffect(() => {
    //connecting to websockets
    if (currentUser !== null) {
      socket.current = io(host) //ApiUrl
      socket.current.emit('add-user', currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    //setting contacts state or redirecting to avatar's path 
    const setDataContacts = async () => {
      if (currentUser === null) return
      if (currentUser.isAvatarImageSet) {
        const response = await fetch(`${allUsersRoute}/${currentUser._id}`)
        const data = await response.json()
        setContacts(data)
        return
      }
      navigate('/setAvatar')
    }
    setDataContacts()
  }, [currentUser])

  const handleChatChange = (chat: Contact) => {
    setCurrentChat(chat)
  }

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`

export default Chat
