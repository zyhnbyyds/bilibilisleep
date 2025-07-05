import type { BiliMessage, WebsocketInfo } from '@type/bilibili'
import type { SleepPeopleItem } from '@type/sleep'
import { doHeart } from './apis'

/* eslint-disable no-console */
let ws: DanmakuWebSocket | undefined
let timer: NodeJS.Timeout
const sleepPeopleMap = ref(new Map<string, SleepPeopleItem>())
const comments = ref<BiliMessage[]>([])

export interface CreateSocketOptions extends WebsocketInfo {
  onReceiveMsg?: () => void
  onChangeBg?: () => void
  game_id: string
}

export const defaultStyle = {
  left: 10,
  bottom: 10,
}

/**
 * 创建socket长连接
 */
function createSocket(options: CreateSocketOptions) {
  const { auth_body, wss_link, game_id, onChangeBg } = options
  const opt = {
    ...getWebSocketConfig(auth_body, wss_link),
    // 收到消息,
    onReceivedMessage: (res: { cmd: string, data: any }) => {
      switch (res.cmd) {
        case 'LIVE_OPEN_PLATFORM_INTERACTION_END':
          clearInterval(timer)
          break
        case 'LIVE_OPEN_PLATFORM_DM':
        {
          console.log(res)
          const { open_id, uface, uname, msg, emoji_img_url } = res.data as BiliMessage
          comments.value.push(res.data as BiliMessage)

          const isHas = sleepPeopleMap.value.has(open_id)
          const mapItem = sleepPeopleMap.value.get(open_id)

          if (emoji_img_url && isHas && mapItem) {
            mapItem.emoji_img_url = emoji_img_url
            setTimeout(() => {
              mapItem.emoji_img_url = ''
            }, 3000)
          }

          switch (msg) {
            case '睡觉':
              if (!isHas) {
                sleepPeopleMap.value.set(open_id, { open_id, uface, uname, msg: '', level: 0, emoji_img_url: '', status: 'active', style: defaultStyle })
              }
              break

            case '左':
              if (isHas) {
                (sleepPeopleMap.value.get(open_id)!.style.left as number) -= 5
              }
              break

            case '右':
              if (isHas) {
                (sleepPeopleMap.value.get(open_id)!.style.left as number) += 5
              }
              break

            case '切换壁纸':
              onChangeBg && onChangeBg()
              break
            default:
              if (isHas) {
                sleepPeopleMap.value.get(open_id)!.msg = msg
                setTimeout(() => {
                  sleepPeopleMap.value.get(open_id)!.msg = ''
                }, 3000)
              }
              break
          }
          break
        }
        default:
          break
      }
    },
    // 收到心跳处理回调
    onHeartBeatReply: (data: any) => {
      console.log('heart', data)
    },
    onError: (data: any) => {
      console.log('error', data)
    },
    onListConnectError: () => {
      console.log('list connect error')
      destroySocket()
    },
  }

  if (!ws) {
    ws = new DanmakuWebSocket(opt)
    timer = setInterval(() => {
      doHeart(game_id)
    }, 20000)
  }

  return ws
}

/**
 * 获取websocket配置信息
 * @param authBody
 * @param wssLinks
 */
function getWebSocketConfig(authBody: string, wssLinks: string[]) {
  const url = wssLinks[0]
  const urlList = wssLinks
  const auth_body = JSON.parse(authBody)
  return {
    url,
    urlList,
    customAuthParam: [
      {
        key: 'key',
        value: auth_body.key,
        type: 'string',
      },
      {
        key: 'group',
        value: auth_body.group,
        type: 'string',
      },
    ],
    rid: auth_body.roomid,
    protover: auth_body.protoover,
    uid: auth_body.uid,
  }
}

/**
 * 销毁websocket
 */
function destroySocket() {
  ws && ws.destroy()
  ws = undefined
}

/**
 * 获取websocket实例
 */
function getWsClient() {
  return ws
}

export { comments, createSocket, destroySocket, getWebSocketConfig, getWsClient, sleepPeopleMap, timer }
