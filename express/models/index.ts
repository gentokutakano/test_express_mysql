import { Sequelize } from 'sequelize-typescript'
import log4js from 'log4js'
import { User } from './entities/user.entity'
import { Post } from './entities/post.entity'
import { dbSetting } from './db-setting'

const logger = log4js.getLogger('mysql')

export default new Sequelize({
  dialect: 'mysql',
  timezone: '+09:00',
  port: 3306,
  host: 'db',
  username: dbSetting['user'],
  password: dbSetting['password'],
  database: dbSetting['database'],
  logging: (sql: string) => {
    logger.info(sql)
  },
  define: { timestamps: false, underscored: true },
  pool: { max: 5, min: 0, idle: 10000, acquire: 30000 },
  models: [User, Post],
})

export { User, Post }
