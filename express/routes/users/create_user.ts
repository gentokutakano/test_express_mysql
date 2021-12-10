import { Handler } from "../../core/handler"
import { Request, Response } from 'express'
import { User } from "../../models/entities/user.entity";



export class CreateUser{
  handler: Handler

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
  }

  async main() {
    const data = await this.createUser()
    return this.handler.json<void>(data)
  }

  async createUser(register?: User) {
    try {
      const user = new User()

      user.name = "Yuka"
      user.age = 30

      await user.save().then((recode) => {
        console.log(`${user.name}を作成しました`)
      })
    } catch (err) {
      console.log(`ユーザを作成できませんでした。\n ${err}`)
    }
  }
}