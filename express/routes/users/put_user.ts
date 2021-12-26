import { Response, Request } from 'express'
import { Op } from 'sequelize'
import { UserValidProperty } from '../../constants/api_value'
import { DUPLICATE_NAME, NOT_EXISTS, PARAMETER_INVALID} from '../../constants/error'
import { Handler } from '../../core/handler'
import { User } from '../../models/index'
import { TUserParams, } from '../../types/permission_params_user'
import Utils from '../../utils'

export class PutUser {
  handler: Handler
  params: TUserParams

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
    this.params = { ...req.params, ...req.body }
  }

  /**
   * メイン処理
   */
  async main() {

    ///指定外のパラメータ確認
    if (!Utils.CheckPermissionParams(this.params, UserValidProperty)) return this.handler.error(PARAMETER_INVALID)

    ///パラメータ型の確認
    if (!Number(this.params.id) ||
      (this.params.name && typeof this.params.name !== "string") ||
      (this.params.age && !Number(this.params.age))) {
        return this.handler.error(PARAMETER_INVALID)
      }

    ///userIdが存在するか確認
    const userId =await User.findByPk<User>(this.params.id)
    if (!userId)  return this.handler.error(NOT_EXISTS)

    ///username重複確認 TODO
    const user = this.checkDuplicateName()
    if (!user) return this.handler.error(DUPLICATE_NAME)

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

    return response.length >= 1 ? true : false
  }

  /**
   * 指定したユーザIDを更新する
  **/
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
