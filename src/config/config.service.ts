import { BaseConfig } from 'env-var-base';

type Envs = 'CACHE_PATH' | 'EXTERNAL_API' | 'REQUEST_TTL' | 'REQUEST_LIMIT';

export class ConfigService extends BaseConfig<Envs> {
  cachePath = this.get('CACHE_PATH').required().asString();

  externalApi = this.get('EXTERNAL_API').required().asString();

  requestTTL = this.get('REQUEST_TTL').default(10000).asInt();

  requestLimit = this.get('REQUEST_LIMIT').default(5).asInt();
}
