import { Handler } from "../../core/handler"
import { Response } from 'express'
import { User } from "../../models/entities/user.entity";
import { TUserParams } from "../../types/permission_params_user";
import { DUPLICATE_NAME, NONEXISTENT_USERNAME, PARAMETER_INVALID } from "../../constants/error";
import { UserValidProperty } from "../../constants/api_value";

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

    ///指定外のパラメータValueの確認
    const validParams = UserValidProperty;
    const paramsKey = Object.keys(this.params)
    const isKeySafe = paramsKey.every((Key => validParams.includes(Key)))

    ///パラメータ型の確認
    if ((this.params.name && typeof this.params.name !== "string") ||
      (this.params.age && typeof this.params.age !== "number" ||
      !isKeySafe )) {
        console.log("型の異なるパラメータを検出しました")
        throw this.handler.error(PARAMETER_INVALID)
    }

    ///nameの存在確認
    if(this.params.name.length < 0) throw this.handler.error(NONEXISTENT_USERNAME)

    ///名前重複の確認
    const isDuplicateName = await this.checkDuplicateName()
    if (isDuplicateName) throw this.handler.error(DUPLICATE_NAME)

    const data = await this.createUser(this.params)
    return this.handler.json<boolean>(data)
  }

  /**
   * 重複したユーザnameの確認。
   */
    async checkDuplicateName(): Promise<boolean> {

    // response = nameが重複した場合[user{...}], 重複しない場合[]
    const response = await User.findAll({
      where: {
        name: this.params.name,
      },
    })

    return response.length >= 1 ? true : false
  }

  /**
   * ユーザを作成する
  **/
  async createUser(register: TUserParams): Promise<boolean> {
      const registerUser: User = new User()

      registerUser.name = register.name
      registerUser.age = register.age

      const response = await registerUser.save()

      console.log(response)
      console.log(Boolean(response))

      return Boolean(response)
  }
}
