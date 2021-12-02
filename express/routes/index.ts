import Express from 'express'
import usersController from './usersController'
import postsController from './postsController'

const router = Express.Router()

router.use('/users', usersController)
router.use('/posts', postsController)

export default router
