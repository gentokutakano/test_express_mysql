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

export const NOT_MATCH_PARAMETER: ErrorCode = {
  status: 400,
  type: 'NOT_MATCH_PARAMETER',
  message: 'The parameter is not match.',
}

/**
 * usernameが誤っている場合のエラー
 */
export const INVALID_ID: ErrorCode = {
status: 400,
type: 'PARAMETER_INVALID',
message: 'The Id is invalid.',
}

/**
 * usernameが誤っている場合のエラー
 */
export const INVALID_USERNAME: ErrorCode = {
status: 400,
type: 'PARAMETER_INVALID',
message: 'The username is invalid.',
}

/**
 * ageが誤っている場合のエラー
 */
export const INVALID_AGE: ErrorCode = {
  status: 400,
  type: 'PARAMETER_INVALID',
  message: 'The age is invalid.',
}

/**
 * ユーザが存在しなかった場合のエラー
 */
export const NOT_EXISTS: ErrorCode = {
  status: 400,
  type: 'NONEXISTENT_USER',
  message: 'The Id is not exist.',
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
