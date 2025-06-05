import { IsString } from 'class-validator'

export class GameStartDto {
  @IsString()
  code: string
}
