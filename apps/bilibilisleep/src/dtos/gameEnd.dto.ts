import { IsString } from 'class-validator'

export class GameEndDto {
  @IsString()
  game_id: string
}
