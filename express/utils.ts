export default class Utils{

  private constructor() {}

  //POST
  static checkValidParams(params: {}, validKey: string[] ): Boolean {
    const validParams = validKey;
    const paramsKey = Object.keys(params)
    return validParams.every((Key => paramsKey.includes(Key)))
  }

  //PUT
  static checkInValidKey( params: {}, validKey: string[], ): Boolean {
    const validParams = validKey;
    const paramsKey = Object.keys(params)
    return paramsKey.every((Key => validParams.includes(Key)))
  }
}