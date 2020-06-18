import { Configs } from '../interfaces/config.interface';
export class ProcstatConfig implements Configs {

    friendlyName = 'Procstat';
    type = 'local';
    fields = {
        pidFile: {
            label: "pidFile"
          },
          user: {
            label: "user"
          },
          exe: {
            label: "exe"
          },
          pattern: {
            label: "pattern"
          },
          systemdUnit: {
            label: "systemdUnit"
          },
          cgroup: {
            label: "cgroup"
          },
          winService: {
            label: "winService"
          },
          processName: {
            label: "processName"
          }
    }
}