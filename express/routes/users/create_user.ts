import { Handler } from "../../core/handler"
import { Request, Response } from 'express'
import { User } from "../../models/entities/user.entity";
import { TUserParams } from "../../types/permission_params_user";
import { PARAMETER_INVALID } from "../../constants/error";
import { UserValidProperty } from "../../constants/api_value";

export class CreateUser{
  handler: Handler
  params: TUserParams

  constructor(req: any, res: Response) {
    this.handler = new Handler(req, res)
    this.params = { ...req.params, ...req.body }
  }

  async main() {
    console.log(this.params)

    ///共通化
    if (!this.params.id ||
      !Number(this.params.id) ||
      this.params.name ? typeof this.params.name !== "string" : false  ||
      typeof this.params.age !== "number" ) {
        console.log("型の異なるパラメータを検出しました")
        throw this.handler.error(PARAMETER_INVALID)
      }

    const validParams: string[] = UserValidProperty;
    const paramsKey: string[] = Object.keys(this.params)
    const isKeySafe: boolean = paramsKey.every((Key => validParams.includes(Key)))
    if (!isKeySafe) {
      console.log("存在しないキーを検出しました")
      throw this.handler.error(PARAMETER_INVALID)
    }

    ///名前重複エラー
    console.log(User.name.includes("karukichi"))

    const data = await this.createUser(this.params)
    return this.handler.json<void>(data)
  }

  async createUser(register: TUserParams): Promise<void> {
    try {
      const registerUser: User = new User()

      registerUser.name = register.name
      registerUser.age = register.age

      await registerUser.save().then((recode) => {
        console.log(`${registerUser.name}を作成しました`)
      })
    } catch (err) {
      console.log(`ユーザを作成できませんでした。\n ${err}`)
    }
  }
}
