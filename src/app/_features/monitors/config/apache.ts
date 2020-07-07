import { Configs } from '../interfaces/config.interface';
export class ApacheConfig implements Configs {

    friendlyName = 'Apache';
    type = 'local';
    fields = {
        url: {
            label: "url",
          },
          username: {
            label: "userName",
          },
          password: {
            label: "password",
          },
          timeout: {
            label: "timeout",
          },
          tlsCa: {
            label: "tlsCa",
          },
          tlsCert: {
            label: "tlsCert",
          },
          tlsKey: {
            label: "tlsKey"
          },
          insecureSkipVerify: {
            label: "insecureSkipVerify"
          }
    }
}