import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { ToastContainer, toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { registerRoute } from '../utils/ApiRoutes'
import { Data } from '../types'
import { getUserFromLS, setUserInLS } from '../utils/LocalStorage'


const Register = () => {
  const navigate = useNavigate()
  const toastOptions : ToastOptions= {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }
  const [values, setValues] = useState({
    username : "",
    email : "",
    password: "",
    confirmPassword : ""
  })

  useEffect(() => {
    const user = getUserFromLS()
    if(user!== null){
      navigate('/')
    }
  }, [])

  const handleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({ ...values, [e.target.name] : e.target.value })
  } 

  const handleValidation = () => {
    const {password, confirmPassword, username, email} = values
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      )
      return false;
    } 
    if ( username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      )
      return false;
    } 
    if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false
    } 
    if ( email === "") {
      toast.error("Email is required", toastOptions)
      return false
    }

    return true
  }
  
  const handleSubmit:FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault()
    if (handleValidation()){
      const { email, username, password } = values
      const response = await fetch(registerRoute, {
        method: 'POST',
        headers: {'content-type': 'application/json' },
        body : JSON.stringify({
          email,
          username,
          password
        })
      })
      if (!response.ok) {
        toast.error(response.statusText, toastOptions)
      }
      const data : Data = await response.json()
      console.log(data)
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
        return
      }
      setUserInLS(data.user)
      navigate('/')
      
    }
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className='brand'>
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
           type="text" 
           placeholder='Username'
           name='username'
           onChange={handleChange}
           />
          <input
           type="email" 
           placeholder='Email'
           name='email'
           onChange={handleChange}
           />
          <input
           type="password" 
           placeholder='Password'
           name='password'
           onChange={handleChange}
           />
          <input
           type="password" 
           placeholder='Confirm Password'
           name='confirmPassword'
           onChange={handleChange}
           />
           <button type='submit'>Create User</button>
           <span>Already have an account? <Link to={"/login"}>Login</Link></span>
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
    padding: 3rem 5rem;
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

export default Register