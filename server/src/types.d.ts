import { Socket } from "socket.io"

declare global {
  var onlineUsers : Map<any,any>  
  var chatSocket : Socket
}

// export interface ClientToServerEvents {
//   "add-user" : ( userId :string) => void
// }

export {}