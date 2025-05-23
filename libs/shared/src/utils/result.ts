const DEFAULT_SUCCESS_RESULT_MSG = 'success'
const DEFAULT_SUCCESS_RESULT_CODE = 0
const DEFAULT_ERROR_RESULT_CODE = 1

/**
 * common result 通用返回
 */
export class Result {
  private static getResult<T>(data: T, message: string, code: number) {
    return {
      data,
      message,
      code,
    }
  }

  /**
   * req success 请求成功
   * @param data response data
   * @param message response message
   * @returns
   */
  static success<T = object>(data: T, message: string = DEFAULT_SUCCESS_RESULT_MSG) {
    return this.getResult<T>(data, message, DEFAULT_SUCCESS_RESULT_CODE)
  }

  static ok(message: string = DEFAULT_SUCCESS_RESULT_MSG) {
    return this.getResult(null, message, DEFAULT_SUCCESS_RESULT_CODE)
  }

  static list<T>(list: T[], total: number, message: string = DEFAULT_SUCCESS_RESULT_MSG) {
    return this.getResult({ list, total }, message, DEFAULT_SUCCESS_RESULT_CODE)
  }

  static fail(message: any = '', code: number = DEFAULT_ERROR_RESULT_CODE) {
    return this.getResult<null>(null, message, code)
  }
}
