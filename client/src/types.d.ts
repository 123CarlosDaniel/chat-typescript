import { MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';
export interface Data {
  status : boolean
  user : object
  msg: string
}

export type Contact = {
  _id: string
  avatarImage: MediaImage
  username: string
  isAvatarImageSet : boolean
}
export interface ContactsIf {
  contacts: Array<Contact>
  changeChat: (param: Contact) => void
}

export interface ChatContainerIf {
  currentChat : Contact
  socket : MutableRefObject<Socket>
}
