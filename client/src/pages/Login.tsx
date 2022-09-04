import { useNavigate, Link } from "react-router-dom"
import Logo from '../assets/logo.svg'
import styled from "styled-components"
import { ToastContainer, toast, ToastOptions } from "react-toastify"
import { loginRoute } from "../utils/ApiRoutes"
import "react-toastify/dist/ReactToastify.css"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Data } from "../types"

const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({ username: "", password:""})
  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }
  useEffect(() => {
    const user = localStorage.getItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY )
    if (user !== null){
      navigate('/')
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value})
  }

  const validateForm = () => {
    const { username, password } = values
    if (username === "" || password === "") {
      toast.error("Email and Password is required", toastOptions)
      return false
    }
    return true
  }

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const { username, password } = values
      const response = await fetch(loginRoute, {
        method : "POST",
        headers: { "content-type": "application/json"},
        body : JSON.stringify({
          username,
          password
        })
      })
      if (!response.ok) {
        toast.error(response.statusText, toastOptions)
      }
      const data: Data = await response.json()
      if ( data.status === false) {
        toast.error(data.msg, toastOptions)
      } 
      if (data.status === true) {
        localStorage.setItem(
          import.meta.env.VITE_REACT_APP_LOCALHOST_KEY as string,
          JSON.stringify(data.user)
        )
        navigate("/")
      }
    }
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
           type="text" 
           placeholder='Username'
           name='username'
           onChange={(e)=> handleChange(e)}
           min="3"
           />
          <input
           type="password" 
           placeholder='Password'
           name='password'
           onChange={(e)=> handleChange(e)}
           />
           <button type='submit'>Log In</button>
           <span>Don't have an account? <Link to={"/register"}>Create One</Link></span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login