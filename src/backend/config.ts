import dotenv from 'dotenv'

dotenv.config()

// https://stackoverflow.com/a/55426597/346701
if (process.env.ELECTRON_ENV) {
  dotenv.config({ path: `.env.${process.env.ELECTRON_ENV}` })
}

export default dotenv
