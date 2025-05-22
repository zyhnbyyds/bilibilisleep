import { SharedModule } from '@app/shared'
import { BilibiliConfig } from '@app/shared/config/interface'
import { axiosBaseUrl } from '@app/shared/constant/axios'
import { requestHandler } from '@app/shared/utils/axios'
import { HttpModule, HttpService } from '@nestjs/axios'
import { Module, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    SharedModule,
    HttpModule.register(
      {
        timeout: 5000,
        maxRedirects: 3,
        baseURL: axiosBaseUrl,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}
  onModuleInit() {
    const bilibili = this.configService.get<BilibiliConfig>('bilibili')
    requestHandler(this.httpService.axiosRef, bilibili)
  }
}
