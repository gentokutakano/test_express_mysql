import { Request, response, Response } from 'express'
import { UserValidProperty } from '../../constants/api_value'
import { DUPLICATE_NAME, PARAMETER_INVALID, PARAMETER_VALIDITY } from '../../constants/error'
import { Handler } from '../../core/handler'
import { User } from '../../models/index'
import { TUserParams, } from '../../types/permission_params_user'
export class PutUser {
  handler: Handler
  params: TUserParams

  constructor(req: any, res: Response) {
    this.handler = new Handler(req, res)
    this.params = { ...req.params, ...req.body }
  }

  /**
   * メイン処理
   */
  async main() {

    ///TODO 処理フローおさらい
    ///APIの記法確認

    ///指定外のパラメータValueの確認
    const validParams: string[] = UserValidProperty;
    const paramsKey: string[] = Object.keys(this.params)
    const isKeySafe: boolean = paramsKey.every((Key => validParams.includes(Key)))

    ///パラメータ型の確認
    if (!this.params.id ||
      !Number(this.params.id) ||
      (this.params.name && typeof this.params.name !== "string") ||
      (this.params.age && typeof this.params.age !== "number" ||
      !isKeySafe )) {
        console.log("型の異なるパラメータを検出しました")
        throw this.handler.error(PARAMETER_INVALID)
      }

    ///存在するIdの確認
    const user = await User.findByPk<User>(this.params.id)
    if (!user) {
      console.log("このユーザidは存在しません")
      throw this.handler.error(PARAMETER_INVALID)
    }

    const isUserByName = await this.getUserByName()
    if (!isUserByName) {
      console.log("このユーザnameすでに存在しています")
      throw this.handler.error(DUPLICATE_NAME)
    }

    const data = await this.putUser()
    return this.handler.json<boolean>(data)
  }

  async getUserByName(): Promise<boolean> {
    const response = await User.findAll({
      where: {
      name: this.params.name
      }
    })

    console.log(!response.length)

    return !response.length
  }

  ///指定されたユーザIDを更新する
  async putUser(): Promise<boolean> {
    const value = {
      name: this.params.name,
      age: this.params.age
    }

    ///更新が成功した場合[1]を返す、失敗時[0]
    const response = await User.update(value, {
      where: {
        id: this.params.id
      }
    })

    return Boolean(response[0])
  }
}
