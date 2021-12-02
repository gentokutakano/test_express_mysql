import Express from 'express'
import usersController from './usersController'
import postsController from './postsController'
import { Handler } from '../core/handler'

const router = Express.Router()

router.get('/', (req, res, next) => {
  const handler = new Handler(req, res)
  return handler.json<string>("Hello Gen!!!")
})

router.use('/users', usersController)
router.use('/posts', postsController)

export default router
