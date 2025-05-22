import { IsNumber, IsString } from 'class-validator'

export class GameStartDto {
  @IsString()
  code: string

  @IsNumber()
  app_id: number
}
