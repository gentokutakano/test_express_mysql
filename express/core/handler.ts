import { Request, Response } from 'express'
import { ErrorCode, SuccessCode } from '../constants/error'

/**
 * APIのハンドリングをする機能
 */
export class Handler {
  constructor(private req: Request, private res: Response) {}

  /**
   * データの送信
   */
  json<T>(data: T): void {
    this.res.json({ data: data })
  }

  /**
   * エラーの送信
   */
  error(error: ErrorCode): void {
    this.res.status(error.status).send({ error: error })
  }

    /**
   * 正常の送信
   */
  success(success: SuccessCode): void{
    this.res.status(success.status).send({success: success})
  }
}
