import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'
import { GameEndDto } from './dtos/gameEnd.dto'
import { GameStartDto } from './dtos/gameStart.dto'
import { HeartbeatDto } from './dtos/heart.dto'

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async gameStart(body: GameStartDto) {
    const { data } = await lastValueFrom(this.httpService.post('/v2/app/start', body))
    return data
  }

  async gameEnd(body: GameEndDto) {
    const { data } = await lastValueFrom(this.httpService.post('/v2/app/end', body))
    return data
  }

  async heartbeat(body: HeartbeatDto) {
    const { data } = await lastValueFrom(this.httpService.post('/v2/app/heartbeat', body))
    return data
  }
}
