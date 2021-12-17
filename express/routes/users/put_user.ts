import { Request, response, Response } from 'express'
import { UserValidProperty } from '../../constants/api_value'
import { DUPLICATE_NAME, PARAMETER_INVALID, PARAMETER_VALIDITY } from '../../constants/error'
import { Handler } from '../../core/handler'
import { User } from '../../models/index'
import { TUserParams, } from '../../types/permission_params_user'
import { Op } from 'sequelize'
export class PutUser {
  handler: Handler
  params: TUserParams

  ///TODO reqのanyを型指定
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

    ///指定外のパラメータチェックの準備
    const validParams = UserValidProperty;
    const paramsKey = Object.keys(this.params)
    const isKeySafe = paramsKey.every((Key => validParams.includes(Key)))

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
    const userId = await User.findByPk<User>(this.params.id)
    if (!userId) this.handler.error(PARAMETER_INVALID)

    const isDuplicateName = await this.checkDuplicateName()
    if (isDuplicateName) this.handler.error(DUPLICATE_NAME)

    const data = await this.putUser()
    return this.handler.json<boolean>(data)
  }

  /**
   * 重複したユーザnameの確認。
   * 同じユーザ名からの変更はスキップする。
   */
  async checkDuplicateName(): Promise<boolean> {
    if (!this.params.name) return true

    // response = nameが重複した場合[user{...}], 重複しない場合[]
    const response = await User.findAll({
      where: {
        name: this.params.name,
        id: {
          [Op.not]: this.params.id,
        },
      },
    })

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
