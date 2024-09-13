import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as supertest from 'supertest';
import { WeatherAPIService } from '../src/http-requester/weather-api.service';

export class TestingModule {
  app: INestApplication;

  api: supertest.SuperTest<supertest.Test>;

  static new(): TestingModule {
    const ctx = new TestingModule();

    beforeAll(async () => {
      ctx.app = await createTestApp();
      ctx.api = supertest(ctx.app.getHttpServer());
    });

    afterAll(async () => {
      await ctx.app.close();
    });

    return ctx;
  }
}

async function createTestApp(): Promise<NestExpressApplication> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(WeatherAPIService)
    .useValue({ getWeather: () => ({ celcius: 10, fahrenheit: 50 }) })
    .compile();

  const app = moduleFixture.createNestApplication() as NestExpressApplication;

  await app.init();

  return app;
}
