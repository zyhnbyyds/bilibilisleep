declare global {
  interface CustomAuthParam {
    key: string
    value: string
    type: string
  }

  interface DanmakuWebSocketOptions {
    url: string
    urlList: string[]
    customAuthParam: CustomAuthParam[]
    rid: number | string
    protover: number | string
    uid: number | string

    onReceivedMessage?: (res: any) => void
    onHeartBeatReply?: (data: any) => void
    onError?: (data: any) => void
    onListConnectError?: () => void
  }

  class DanmakuWebSocket {
    constructor(options: DanmakuWebSocketOptions)

    connect(): void
    destroy(): void
    send(data: any): void
    // 其他方法可根据需要添加
  }
}

export {}
