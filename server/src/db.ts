import { config } from 'dotenv'
import pkg from 'mongoose'
config()
const { connect } = pkg
const url = process.env.MONGO_URL
connect(url as string)
  .then((db) => {
    console.log('Db is connected')
  })
  .catch((er: Error) => {
    console.log(er.message)
  })
