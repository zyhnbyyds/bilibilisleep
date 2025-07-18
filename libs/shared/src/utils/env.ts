import { plainToInstance, Transform } from 'class-transformer'
import { IsEnum, IsNumber, IsString, Max, Min, validateSync } from 'class-validator'

export function isDevMode(): boolean {
  return process.env.NODE_ENV === 'dev'
}

enum Environment {
  Development = 'dev',
  Production = 'prod',
  Local = 'local',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development

  // Redis
  @IsString()
  REDIS_HOST: string = '127.0.0.1'

  @IsNumber()
  @Min(0)
  @Max(65535)
  REDIS_PORT: number = 6379

  @IsString()
  REDIS_PASSWORD: string = ''

  @IsNumber()
  @Min(0)
  REDIS_DB: number = 0

  // Jwt auth
  @IsString()
  JWT_SECRET: string

  @IsString()
  JWT_EXPIRES_IN: string = '1d'

  @IsString()
  JWT_REFRESH_SECRET: string

  @IsString()
  BILIBILI_APP_KEY: string

  @IsString()
  BILIBILI_APP_SECRET: string

  @IsNumber()
  @Transform(({ value }) => Number(value))
  BILIBILI_APP_ID: number
}

export function customValidateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  )

  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
