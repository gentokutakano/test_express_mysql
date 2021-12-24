export type ErrorCode = {
  status: number
  type: string
  message: string
}

export type SuccessCode = {
  status: number
  type: string
  message: string
}

/**
 * パラメーターが誤っている場合のエラー
 */
export const PARAMETER_INVALID: ErrorCode = {
  status: 400,
  type: 'PARAMETER_INVALID',
  message: 'The parameter is invalid.',
}

/**
 * ユーザが存在しなかった場合のエラー
 */
export const NONEXISTENT: ErrorCode = {
  status: 400,
  type: 'NONEXISTENT_USER',
  message: 'The userId is not exist.',
}

/**
 * ユーザ名が存在しなかった場合のエラー
 */
export const NONEXISTENT_USERNAME: ErrorCode = {
  status: 400,
  type: 'NONEXISTENT_USER',
  message: 'The username is not exist.',
}

/**
* nameが重複している場合のエラー
*/
export const DUPLICATE_NAME: ErrorCode = {
  status: 400,
  type: 'DUPLICATE_NAME',
  message: 'The duplicate is name.',
}

/**
 * データが存在しない場合のエラー
 */
export const NO_DATA_EXISTS: ErrorCode = {
  status: 400,
  type: 'NO_DATA_EXISTS',
  message: 'No data exists.',
}
