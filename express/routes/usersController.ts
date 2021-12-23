import { Router } from 'express'
import { CreateUser } from './users/post_user'
import { DeleteUser } from './users/delete_user'
import { GetUsers } from './users/get_users'
import { PutUser } from './users/put_user'

const router = Router()

router.get('/', (req, res, next) => {
  new GetUsers(req, res).main().catch(next)
})

router.put('/:id', (req, res, next) => {
  // console.log(req.params);
  new PutUser(req, res).main().catch(next)
})

router.post('/', (req, res, next) => {
  new CreateUser(req, res).main().catch(next)
})

router.delete('/:id', (req, res, next) => {
  new DeleteUser(req, res).main().catch(next)
})


export default router
