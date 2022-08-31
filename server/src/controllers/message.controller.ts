import { NextFunction, Request, Response } from 'express'
import messageModels from '../models/message.models'

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to } = req.body

    const messages = await messageModels
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updateAt: 1 })
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender?.toString() === from,
        message: msg.message.text,
      }
    })
    res.json(projectedMessages)
  } catch (error) {
    next(error)
  }
}

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to, message } = req.body
    const data = await messageModels.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    })

    if (data) return res.json({ msg: 'Message added successfully' })
    else return res.json({ msg: 'Failed to add message to the database' })
  } catch (error) {
    next(error)
  }
}
