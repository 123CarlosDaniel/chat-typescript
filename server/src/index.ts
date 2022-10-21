import app from "./App";
import { Server as SocketServer } from 'socket.io'
import 'dotenv/config'

const port = app.get('port')

const server = app.listen(port)
console.log('server running on port ',port)


const io = new SocketServer(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
})
global.onlineUsers = new Map()
io.on('connection',async (socket) => {
  const count = io.engine.clientsCount
  console.log({count})
  socket.on('discon', () => {
    socket.disconnect(true)
  })
  // global.chatSocket = socket
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId,socket.id)
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to) //socket.id
    if (sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieve", data.msg)
    }
  })
  socket.on('disconnect', ()=>{
    const count = io.engine.clientsCount
    console.log({count},'disconnect')
  })
})
