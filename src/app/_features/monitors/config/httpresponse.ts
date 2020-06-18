
import { Configs } from '../interfaces/config.interface';
export class HttpResponseConfig implements Configs {

    friendlyName = 'HttpResponse';
    type = 'remote';
    fields = {
        url: {
           label: "url"
          },
          httpProxy: {
           label: "httpProxy"
          },
          timeout: {
           label: "timeout"
          },
          method: {
           label: "method"
          },
          followRedirects: {
           label: "followRedirects"
          },
          body: {
           label: "body"
          },
          responseStringMatch: {
           label: "responseStringMatch"
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
          },
          headers: {
           label: "headers"
          }
    }
}