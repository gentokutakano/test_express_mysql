import { Router } from 'express'
import { GetPosts } from './posts/get_posts'

const router = Router()

router.get('/', (req, res, next) => {
  new GetPosts(req, res).main().catch(next)
})

export default router
