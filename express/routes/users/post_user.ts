import { Handler } from "../../core/handler"
import { Response } from 'express'
import { User } from "../../models/entities/user.entity";
import { TUserParams } from "../../types/permission_params_user";
import { DUPLICATE_NAME, NONEXISTENT_USERNAME, PARAMETER_INVALID } from "../../constants/error";
import { PostUserValidProperty, UserValidProperty } from "../../constants/api_value";
import Utils from "../../utils";

export class CreateUser{
  handler: Handler
  params: TUserParams

  constructor(req: any, res: Response) {
    this.handler = new Handler(req, res)
    this.params = { ...req.params, ...req.body }
  }

  /**
   *
   * @returns
   * メイン処理
   */
  async main() {

    // Utils.checkValidParams(this.params, PostUserValidProperty)
    // ///パラメータ型の確認
    // console.log(this.params.name)
    // // console.log(this.params.name.length < 0)
    // console.log(!Number(this.params.age))
    // console.log(Utils.checkValidParams(UserValidProperty, this.params))

    ///パラメータ型の確認
    if ((this.params.name && typeof this.params.name !== "string") ||
        (this.params.name && this.params.name.length < 0) ||
      (!Number(this.params.age) ||
        !Utils.checkValidParams(this.params, UserValidProperty)
      )) {
        throw this.handler.error(PARAMETER_INVALID)
    }

    ///名前重複の確認
    const isDuplicateName = await this.checkDuplicateName()
    if (isDuplicateName) throw this.handler.error(DUPLICATE_NAME)

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
      // console.log(e + "")
      throw this.handler.error(DUPLICATE_NAME)
    }
  }

  /**
   * ユーザを作成する
  **/
  async createUser(register: TUserParams): Promise<number> {
    const registerUser: User = new User()

    registerUser.name = register.name
    registerUser.age = register.age

    const response = await registerUser.save()
    if (!response) throw this.handler.error(PARAMETER_INVALID)

    return response.id
  }
}
