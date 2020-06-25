import { Configs } from '../interfaces/config.interface';
export class RedisConfig implements Configs {

    friendlyName = 'Redis';
    type = 'local';
    fields = {
        url: {
            label: "url"
          },
          password: {
            label: "password"
          },
          tlsCa: {
            label: "tlsCa"
          },
          tlsCert: {
            label: "tlsCert"
          },
          tlsKey: {
            label: "tlsKey"
          },
          insecureSkipVerify: {
            label: "insecureSkipVerify"
          }
    }
}