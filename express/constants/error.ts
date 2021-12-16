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
 * nameが重複している場合のエラー
 */
 export const DUPLICATE_NAME: ErrorCode = {
  status: 400,
  type: 'DUPLICATE_NAME',
  message: 'The duplicate is name.',
}

/**
 * パラメーターが成功した場合
 */
export const PARAMETER_VALIDITY: ErrorCode = {
  status: 200,
  type: 'PARAMETER_VALIDITY',
  message: 'The parameter is validity.',
}

/**
 * データが存在しない場合のエラー
 */
export const NO_DATA_EXISTS: ErrorCode = {
  status: 400,
  type: 'NO_DATA_EXISTS',
  message: 'No data exists.',
}
