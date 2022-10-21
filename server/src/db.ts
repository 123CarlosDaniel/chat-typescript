import 'dotenv/config'
import pkg from 'mongoose'
const { connect } = pkg
const url = process.env.MONGO_URL
connect(url as string)
  .then((db) => {
    console.log('Db is connected')
  })
  .catch((er: Error) => {
    console.log(er.message)
  })
