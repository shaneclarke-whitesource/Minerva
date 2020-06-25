import { Configs } from '../interfaces/config.interface';
export class DiskioConfig implements Configs {

    friendlyName = 'DiskIo';
    type = 'local';
    fields = {
        device: {
            label: "device"
          },
          skipSerialNumber: {
            label: "skipSerialNumber"
          }
    }
}