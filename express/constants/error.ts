export type ErrorCode = {
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
 * データが存在しない場合のエラー
 */
export const NO_DATA_EXISTS: ErrorCode = {
  status: 400,
  type: 'NO_DATA_EXISTS',
  message: 'No data exists.',
}
