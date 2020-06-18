import { Configs } from '../interfaces/config.interface';
export class X509CertConfig implements Configs {

    friendlyName = 'X509Cert';
    type = 'remote';
    fields = {
        target: {
            label: "target"
          },
          timeout: {
            label: "timeout"
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