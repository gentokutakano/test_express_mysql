import { Request, Response } from 'express'
import { Handler } from '../../core/handler'
import { User } from '../../models/index'

type TPutParams = {
  id: string
}

export class PutUser {
  handler: Handler
  //TODO 型指定する
  params: any

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
    this.params = {...req.params}
  }

  /**
   * メイン処理
   */
  async main() {
    //idがnumberじゃないときにエラーを返すようにする
    //idが存在しない場合エラーを返す
    //ボディを渡す
    //ボディがnameとAge以外のものが含まれていたらエラー返す
    //name: String Age: number  
    await this.putUser()
    return this.handler.json<boolean>(true)
  }

  async putUser() {
    const value = {
      name: "gentoku"
     }
    User.update(value, {
      where: {
        id: this.params.id
      }
    })
  }
}
