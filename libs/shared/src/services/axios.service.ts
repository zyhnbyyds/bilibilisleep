import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios'

export class AxiosService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 5000,
      maxRedirects: 5,
    }
  }
}
