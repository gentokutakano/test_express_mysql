import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/.env' })

interface DatabaseTypes {
  database: string | undefined
  user: string | undefined
  password: string | undefined
}

export const dbSetting: DatabaseTypes = {
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
}
