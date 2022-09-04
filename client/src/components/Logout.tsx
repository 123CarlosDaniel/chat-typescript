import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi"
import styled from "styled-components";
import { logoutRoute } from "../utils/ApiRoutes";
import { Socket } from "socket.io-client";
import { MutableRefObject } from "react";

const Logout = ({socket} : {socket : MutableRefObject<Socket>} ) => {
  const navigate = useNavigate()

  const handleClick = async () => {
    const user = localStorage.getItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY as string) 
    if (user === null) return 
    const id = await JSON.parse(user)._id
    const response = await fetch(`${logoutRoute}/${id}`)
    if ( response.status === 200) {
      socket.current.emit('discon')
      localStorage.clear()
      navigate("/login")
    }
  }
  return (
    <Button onClick={handleClick}>
      <BiPowerOff/>
    </Button>
  )
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
export default Logout