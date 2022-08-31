import app from "./App";
import { Server as SocketServer } from 'socket.io'

const port = app.get('port')

const server = app.listen(port)
console.log('server running on port ',port)


const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
})

global.onlineUsers = new Map()

io.on('connection', (socket) => {
  global.chatSocket = socket
  // const count = io.engine.clientsCount
  // console.log(count)
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId,socket.id)
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieve", data.msg)
    }
  })
})
