import { Handler } from "../../core/handler"
import { Response, Request } from 'express'
import { User } from "../../models/entities/user.entity";
import { TPostUserParams } from "../../types/permission_params_user";
import { DUPLICATE_NAME, NOT_MATCH_PARAMETER, PARAMETER_INVALID } from "../../constants/error";
import { PostUserValidProperty } from "../../constants/api_value";
import Utils from "../../utils";

export class CreateUser{
  handler: Handler
  params: TPostUserParams

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
    this.params = { ...req.params, ...req.body }
  }

  /**
   *
   * @returns
   * メイン処理
   */
  async main() {

    // /型チェック
    if (!Utils.checkMatchParams(this.params, PostUserValidProperty)) {
      return this.handler.error(NOT_MATCH_PARAMETER)
    }

    ///パラメータ型の確認
    if ((this.params.name && this.params.name.length < 0 && typeof this.params.name !== "string" ) ||
      (!Number(this.params.age))) {
        return this.handler.error(PARAMETER_INVALID)
    }

    ///名前重複の確認
    const isDuplicateName = await this.checkDuplicateName()
    if (isDuplicateName) return this.handler.error(DUPLICATE_NAME)

    const data = await this.createUser(this.params)
    return this.handler.json<number>(data)
  }

  /**
   * 重複したユーザnameの確認。
   */
  async checkDuplicateName(): Promise<boolean> {

    // response = nameが重複した場合[user{...}], 重複しない場合[]
    try {
      const response = await User.findAll({
        where: {
          name: this.params.name,
        },
      })
      return response.length >= 1 ? true : false
    } catch (e) {
      throw this.handler.error(DUPLICATE_NAME)
    }
  }

  /**
   * ユーザを作成する
  **/
  async createUser(register: TPostUserParams): Promise<number> {
    try {

      const registerUser: User = new User()

      registerUser.name = register.name
      registerUser.age = register.age

      const response = await registerUser.save()
      if (!response) throw this.handler.error(PARAMETER_INVALID)

      return response.id
    } catch (err) {
      throw new Error(String(err))
    }
  }
}
