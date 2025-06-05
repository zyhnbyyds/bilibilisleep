import { BilibiliConfig } from '@app/shared/config/interface'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'
import { GameEndDto } from './dtos/gameEnd.dto'
import { GameStartDto } from './dtos/gameStart.dto'
import { HeartbeatDto } from './dtos/heart.dto'

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async gameStart(body: GameStartDto) {
    const { app_id } = this.configService.get<BilibiliConfig>('bilibili')
    const { data } = await lastValueFrom(this.httpService.post('/v2/app/start', { ...body, app_id }))
    return data
  }

  async gameEnd(body: GameEndDto) {
    const { app_id } = this.configService.get<BilibiliConfig>('bilibili')
    const { data } = await lastValueFrom(this.httpService.post('/v2/app/end', { ...body, app_id }))
    return data
  }

  async heartbeat(body: HeartbeatDto) {
    const { data } = await lastValueFrom(this.httpService.post('/v2/app/heartbeat', body))
    return data
  }
}
