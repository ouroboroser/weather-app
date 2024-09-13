import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { statSync } from 'fs';

export const setupOpenapi = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('/api/swagger', app, document, swaggerOptions);
};

const lastBuildDate = new Date(statSync('dist').ctime)
  .toLocaleString()
  .replace(', ', '-')
  .slice(0, -3);

export const documentOptions = new DocumentBuilder()
  .setTitle('Weather API')
  .setDescription(`Weather API - Build time: ${lastBuildDate}`)
  .setVersion('1.0.1')
  .addBearerAuth()
  .build();

export const swaggerOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'Swagger Weather',
};

export const redocOptions = {
  title: 'Redoc Weather',
  sortPropsAlphabetically: true,
  hideDownloadButton: false,
  hideHostname: false,
  docName: `parser-v${documentOptions.info.version}`,
  hideLoading: true,
};
