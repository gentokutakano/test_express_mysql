import dayjs from 'dayjs'
import { Request, Response } from 'express'
import { Handler } from '../../core/handler'
import { PARAMETER_INVALID } from '../../constants/error'
import { Post } from '../../models/index'
import { getPostsResponse } from '../../types/index'

export class GetPosts {
  handler: Handler

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
  }

  /**
   * メイン処理
   */
  async main() {
    const data = await this.getPosts()

    if (!data) {
      return this.handler.error(PARAMETER_INVALID)
    }

    return this.handler.json<getPostsResponse[]>(data)
  }

  async getPosts(): Promise<getPostsResponse[]> {
    const data = await Post.findAll({
      attributes: ['id', 'user_id', 'message', 'created_at', 'updated_at'],
    })

    return data.map((v) => {
      return {
        id: v.id,
        user_id: v.user_id,
        message: v.message,
        created_at: dayjs(v.created_at).format('YYYY年M月D日 HH時mm分'),
        updated_at: dayjs(v.updated_at).format('YYYY年M月D日 HH時mm分'),
      }
    })
  }
}
