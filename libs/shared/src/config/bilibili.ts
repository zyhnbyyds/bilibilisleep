import { registerAs } from '@nestjs/config'

export default registerAs('bilibili', () => ({
  app_id: Number(process.env.BILIBILI_APP_ID),
  app_key: process.env.BILIBILI_APP_KEY,
  app_secret: process.env.BILIBILI_APP_SECRET,
}))
