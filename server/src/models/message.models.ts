import { Schema, model } from 'mongoose'

export interface MessageInterface {
  message: {
    text : string
  }
  users : Array<any>
  sender : any
}

const messageSchema = new Schema<MessageInterface>(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: Array,
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default model<MessageInterface>('Message', messageSchema)
