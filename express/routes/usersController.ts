import { Router } from 'express'
import { GetUsers } from './users/get_users'
import { PutUser } from './users/put_user'

const router = Router()

router.get('/', (req, res, next) => {
  new GetUsers(req, res).main().catch(next)
})

router.put('/:id', (req, res, next) => {
  
  new PutUser(req, res).main().catch(next)
})


export default router
