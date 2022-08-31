import userModel from '../models/user.models'
import bcrypt from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body
    const user = await userModel.findOne({ username })
    if (!user)
      return res.json({ msg: 'Incorrect Username or Password', status: false })
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid)
      return res.json({ msg: 'Incorrect Username or Password', status: false })
    // delete user.password
    return res.json({ status: true,user })
  } catch (error) {
    next(error)
  }
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body
    const usernameCheck = await userModel.findOne({ username })
    if (usernameCheck)
      return res.json({ msg: 'Username already used', status: false })
    const emailCheck = await userModel.findOne({ email })
    if (emailCheck)
      return res.json({ msg: 'Email already used', status: false })
    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = await userModel.create({
      email,
      username,
      password: hashedPassword,
    })
    return res.json({
      status: true,
      user: { email: user.email, username: user.username },
    })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async(req: Request,res: Response,next: NextFunction) => {
  try {
    const users = await userModel.find({_id:{ $ne:req.params.id}}).select([
      "email",
      "username",
      "avatarImage",
      "_id"
    ])
    return res.json(users)
  } catch (error) {
    next(error)
  }
}

export const setAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id
    const avatarImage = req.body.image
    console.log(avatarImage)
    const userData = await userModel.findByIdAndUpdate(
      userId,
      { isAvatarImageSet: true, avatarImage },
      { new: true }
    )
    return res.json({
      isSet: userData?.isAvatarImageSet,
      image: userData?.avatarImage
    })
  } catch (error) {
    next(error)
  }
}

export const logOut = (req:Request, res:Response, next:NextFunction) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required"})
    onlineUsers.delete(req.params.id)
    return res.sendStatus(200)
  } catch (error) {
    next(error)
  }
} 