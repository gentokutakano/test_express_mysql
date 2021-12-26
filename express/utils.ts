export default class Utils{

  private constructor() {}

  //POST　型チェック
  static checkMatchParams(params: {}, validKey: string[] ): Boolean {
    const validParams = validKey;
    const paramsKey = Object.keys(params)
    return validParams.every((Key => paramsKey.includes(Key)))
  }

  //PUT  存在チェック
  static CheckPermissionParams( params: {}, validKey: string[], ): Boolean {
    const validParams = validKey;
    const paramsKey = Object.keys(params)
    return paramsKey.every((Key => validParams.includes(Key)))
  }
}