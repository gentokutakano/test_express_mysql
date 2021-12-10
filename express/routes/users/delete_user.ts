import { Handler } from "../../core/handler";
import { Request, Response } from 'express'
import { User } from "../../models";
import { threadId } from "worker_threads";
import { PARAMETER_INVALID } from "../../constants/error";

export class DeleteUser {
  handler: Handler
  paramsId: string

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
    this.paramsId = req.params.id
  }

  async main() {
    const data = await this.deleteUser()
    return this.handler.json<void>(data)
  }

  ///指定されたユーザを削除
  async deleteUser() {
    const user = await User.findByPk<User>(this.paramsId)

    if (!user) {
      console.log("削除できるユーザは見つかりませんでした")
      throw this.handler.error(PARAMETER_INVALID)
    }

    await user.destroy().then((recode) => {
      console.log(`ユーザID：${this.paramsId}を削除しました`)
    })
  }
}