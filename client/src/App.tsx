import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SetAvatar } from "./components/SetAvatar"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Chat/>}/>
        <Route path="/setAvatar" element={<SetAvatar/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
