import { Router } from 'express'
import { CreateUser } from './users/create_user'
import { GetUsers } from './users/get_users'
import { PutUser } from './users/put_user'

const router = Router()

router.get('/', (req, res, next) => {
  new GetUsers(req, res).main().catch(next)
})

router.put('/:id', (req, res, next) => {
  console.log(req.params);
  new PutUser(req, res).main().catch(next)
})

router.post('/', (req, res, next) => {
  // console.log(req.params);
  new CreateUser(req, res).main()
})


export default router
