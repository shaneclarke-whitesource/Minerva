import { Configs } from '../interfaces/config.interface';
export class PackagesConfig implements Configs {

    friendlyName = 'Packages';
    type = 'local';
    fields = {
        includeRpm: {
            label: "includeRpm"
          },
          includeDebian: {
            label: "includeDebian"
          },
          failWhenNotSupported: {
            label: "failWhenNotSupported"
          }
    }
}