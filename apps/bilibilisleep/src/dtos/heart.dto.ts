import { IsString } from 'class-validator'

export class HeartbeatDto {
  @IsString()
  game_id: string
}
