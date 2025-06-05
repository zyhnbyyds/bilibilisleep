import type { CSSProperties } from 'vue'
import type { BiliMessage } from './bilibili'

export type SleepPeopleItem = Pick<BiliMessage, 'open_id' | 'uface' | 'uname' | 'msg' | 'emoji_img_url'> & {
  /**
   * 状态在线 | 离线 | 正在移动
   */
  status: 'active' | 'disActive' | 'acting'
  /**
   * 等级
   */
  level: number
  /**
   * 位置大小
   */
  style: CSSProperties
}
