import { Request, Response } from 'express'
import { PARAMETER_INVALID, PARAMETER_VALIDITY } from '../../constants/error'
import { Handler } from '../../core/handler'
import { User } from '../../models/index'
import { getUsersResponse } from '../../types'

type TPutParams = {
  id: string
}

export class PutUser {
  handler: Handler
  //TODO 型指定する
  paramsId: string

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
    this.paramsId = req.params.id
  }

  /**
   * メイン処理
   */
  async main() {
    //idがnumberじゃないときにエラーを返すようにする ○
    //idが存在しない場合エラーを返す ○
    //ボディを渡す
    //ボディにnameとAge以外のものが含まれていたらエラー返す ○
    //name: String Age: number ○
    const data = await this.putUser()
    return this.handler.json<void>(data)
  }

  ///指定されたユーザIDを更新する
  async putUser(updateJson?: User) {

    if (!updateJson) {
      updateJson = <User>{
        name: "hand3",
        age: 12,
      }
    }
    ///存在するIdか確認
    const user = await User.findByPk<User>(this.paramsId);

    if (!user) {
      console.log("このユーザはいないっす");
      throw this.handler.error(PARAMETER_INVALID);
    }

    User.update(updateJson, {
      where: {
        id: this.paramsId
      }
    }).then((recode) => {
      console.log(`ユーザID:[${this.paramsId}]を更新しました。`)
    })
  }
}
