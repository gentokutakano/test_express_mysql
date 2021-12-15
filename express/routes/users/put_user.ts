import { filter } from 'bluebird'
import { Request, Response } from 'express'
import { PARAMETER_INVALID, PARAMETER_VALIDITY } from '../../constants/error'
import { Handler } from '../../core/handler'
import { User } from '../../models/index'
import { getUsersResponse } from '../../types'

///TODO共通化
type TPutParams = {
  id: number
  name: string
  age: number
}

export class PutUser {
  handler: Handler
  params: TPutParams

  constructor(req: any, res: Response) {
    this.handler = new Handler(req, res)
    this.params = { ...req.params, ...req.body }
  }

  /**
   * メイン処理
   */
  async main() {


    console.log(this.params);
    ///TODO共通化
    const validParams = ["id", "name", "age"];

    ///存在するIdか確認
    const user = await User.findByPk<User>(this.params.id)
    if (!user) {
      console.log("このユーザidは存在しません")
      throw this.handler.error(PARAMETER_INVALID)
    }

    if (!this.params.id ||
      !Number(this.params.id) ||
      typeof this.params.name !== "string" ||
      !Number(this.params.age) ||
      !Object.keys(this.params).every(key => validParams.includes(key))) {
      throw this.handler.error(PARAMETER_INVALID)
    }

    const data = await this.putUser(this.params)
    return this.handler.json<void>(data)
  }

  ///指定されたユーザIDを更新する
  async putUser(updateJson: TPutParams): Promise<void> {
    User.update(updateJson, {
      where: {
        id: this.params.id
      }
    }).then((recode) => {
      console.log(`ユーザID:[${this.params.id}]を更新しました。`)
    })
  }
}
