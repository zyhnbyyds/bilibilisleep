import type { CommonRes, GameStartRes } from '@type/bilibili'
import { createFetch } from '@vueuse/core'

const request = createFetch({
  options: {
    timeout: 5000,
    afterFetch({ data, response }) {
      const { data: res, message, code } = data as CommonRes
      if (code !== 0) {
        // eslint-disable-next-line no-console
        console.log('err', res, message, code, data)
      }
      return {
        data: res,
        response,
      }
    },
  },
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})

export function doStart(code: string) {
  return request('/bilibilisleep/start').post({ code }).json<GameStartRes>()
}

export function doEnd(game_id: string) {
  return request('/bilibilisleep/end').post({ game_id }).json()
}

export function doHeart(game_id: string) {
  return request('/bilibilisleep/heartbeat').post({ game_id }).json()
}
