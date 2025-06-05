export interface GameStartRes {
  anchor_info: AnchorInfo
  game_info: GameInfo
  websocket_info: WebsocketInfo
}

export interface AnchorInfo {
  open_id: string
  room_id: number
  uface: string
  uid: number
  uname: string
  union_id: string
}

export interface GameInfo {
  game_id: string
}

export interface WebsocketInfo {
  auth_body: string
  wss_link: string[]
}

export interface CommonRes<T = any> {
  code: number
  message: string
  request_id: string
  data: T
}

/**
 * 弹幕消息的数据结构
 */
export interface BiliMessage {
  /**
   * 弹幕接收的直播间 ID
   */
  room_id: number

  /**
   * 用户 UID（已废弃，固定为 0）
   */
  uid: number

  /**
   * 用户唯一标识
   */
  open_id: string

  /**
   * 用户在同一个开发者下的唯一标识
   * 默认为空，根据业务需求单独申请开通
   */
  union_id: string

  /**
   * 用户昵称
   */
  uname: string

  /**
   * 弹幕内容
   */
  msg: string

  /**
   * 消息唯一 ID
   */
  msg_id: string

  /**
   * 粉丝勋章等级（0 表示未佩戴）
   */
  fans_medal_level: number

  /**
   * 粉丝勋章名称
   */
  fans_medal_name: string

  /**
   * 是否佩戴该房间粉丝勋章
   */
  fans_medal_wearing_status: boolean

  /**
   * 房间大航海等级
   * 0 表示无，1：总督，2：提督，3：舰长
   */
  guard_level: number

  /**
   * 弹幕发送时间（秒级时间戳）
   */
  timestamp: number

  /**
   * 用户头像 URL
   */
  uface: string

  /**
   * 表情包图片地址
   */
  emoji_img_url: string

  /**
   * 弹幕类型
   * 0：普通弹幕，1：表情包弹幕
   */
  dm_type: number

  /**
   * 直播荣耀等级
   */
  glory_level: number

  /**
   * 被 @ 用户的 open_id
   */
  reply_open_id: string

  /**
   * 被 @ 用户的昵称
   */
  reply_uname: string

  /**
   * 是否为房管（0：否，1：是）
   */
  is_admin: number
}
