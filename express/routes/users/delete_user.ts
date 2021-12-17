import { Handler } from "../../core/handler";
import { Request, Response } from 'express'
import { User } from "../../models";
import { NONEXISTENT_USER } from "../../constants/error";

export class DeleteUser {
  handler: Handler
  paramsId: string

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
    this.paramsId = req.params.id
  }

  async main() {

    const userId = await User.findByPk<User>(this.paramsId)
    if (!userId) throw this.handler.error(NONEXISTENT_USER)

    const data = await this.deleteUser(userId)
    return this.handler.json<void>(data)
  }

  ///指定されたユーザを削除
  async deleteUser(deletedUserId: User) {

    const response = await deletedUserId.destroy()

    console.log(response)
  }
}