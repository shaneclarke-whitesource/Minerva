import { Configs } from '../interfaces/config.interface';
export class SmtpConfig implements Configs {

    friendlyName = 'Smtp';
    type = 'remote';
    fields = {
        host: {
           label: "host"           
          },
          port: {
           label: "port"            
          },
          timeout: {
           label: "timeout"            
          },
          readTimeout: {
           label: "readTimeout"
          },
          ehlo: {
           label: "ehlo"
          },
          from: {
           label: "from"
          },
          to: {
           label: "to"
          },
          body: {
           label: "body"
          },
          starttls: {
           label: "starttls"
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