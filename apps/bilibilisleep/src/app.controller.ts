import { Body, Controller, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { GameEndDto } from './dtos/gameEnd.dto'
import { GameStartDto } from './dtos/gameStart.dto'
import { HeartbeatDto } from './dtos/heart.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/start')
  GameStart(@Body() body: GameStartDto) {
    return this.appService.gameStart(body)
  }

  @Post('/end')
  GameEnd(@Body() body: GameEndDto) {
    return this.appService.gameEnd(body)
  }

  @Post('/heartbeat')
  Heartbeat(@Body() body: HeartbeatDto) {
    return this.appService.heartbeat(body)
  }
}
