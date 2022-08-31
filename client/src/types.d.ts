export interface Data {
  status : boolean
  user : object
  msg: string
}

export interface Contact {
  _id: string
  avatarImage: MediaImage
  username: string
}
export interface ContactsIf {
  contacts: Array<Contact>
  changeChat: (param: Contact) => void
}

export interface ChatContainerIf {
  currentChat : Contact
  socket : any
}
