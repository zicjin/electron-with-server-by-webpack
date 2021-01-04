import dotenv from 'dotenv'

dotenv.config()

// https://stackoverflow.com/a/55426597/346701
if (process.env.NODE_ENV) {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
}

export default dotenv
