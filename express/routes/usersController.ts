import { Router } from 'express'
import { GetUsers } from './users/get_users'

const router = Router()

router.get('/', (req, res, next) => {
  new GetUsers(req, res).main().catch(next)
})

export default router
