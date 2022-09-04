import styled from 'styled-components'
import { Buffer } from 'buffer'
import loader from '../assets/loader.gif'
import { ToastContainer, toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { setAvatarRoute } from '../utils/ApiRoutes'
import { useEffect, useState } from 'react'
import { Contact } from '../types'

const VITE_REACT_APP_KEY = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY as string
export const SetAvatar = () => {
  const api = `https://api.multiavatar.com/4645646`
  const navigate = useNavigate()
  const [avatars, setAvatars] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState<undefined | number>(
    undefined
  )
  const toastOptions: ToastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: false,
    draggable: true,
    theme: 'dark',
  }
  useEffect(() => {
    //verify if you are logged
    const user = localStorage.getItem(VITE_REACT_APP_KEY)
    if ( user === null ) navigate('/login')
  }, [])

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions)
      return
    } 
    const user : Contact = await JSON.parse(
      localStorage.getItem(VITE_REACT_APP_KEY) as string
    )
    const response = await fetch(`${setAvatarRoute}/${user._id}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        image: avatars[selectedAvatar],
      }),
    })
    const data = await response.json()
    if (data.isSet) {
      user.isAvatarImageSet = true
      user.avatarImage = data.image
      localStorage.setItem(
        VITE_REACT_APP_KEY,
        JSON.stringify(user)
      )
      navigate('/')
    } else {
      toast.error('Error setting avatar. Please try again.', toastOptions)
    }
  }

  useEffect(() => {
    //getting random avatars
    const getData = async () => {
      try {
        let data: string[] = []
        for (let i = 0; i < 4; i++) {
          const url = `${api}/${Math.round(Math.random() * 1000)}`
          const response = await fetch(url)
          const image = await response.arrayBuffer()
          const buffer = Buffer.from(image)
          const res = buffer.toString("base64")
          data.push(res)
        }
        setAvatars(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={"index"}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              )
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`
