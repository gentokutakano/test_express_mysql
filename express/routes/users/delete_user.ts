import { Handler } from "../../core/handler";
import { Request, Response } from 'express'
import { User } from "../../models";
import { NONEXISTENT } from "../../constants/error";

export class DeleteUser {
  handler: Handler
  paramsId: string

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
    this.paramsId = req.params.id
  }

  async main() {

    const userId = await User.findByPk<User>(this.paramsId)
    if (!userId) throw this.handler.error(NONEXISTENT)
    console.log(userId)

    const data = await this.deleteUser(userId)
    return this.handler.json<boolean>(data)
  }

  /**
   * 指定されたユーザを削除
   * @param deleteUserId
   * @returns
   */
  async deleteUser(deleteUserId: User): Promise<boolean>{

    const response = await deleteUserId.destroy()

    return (Boolean(response))
  }
}