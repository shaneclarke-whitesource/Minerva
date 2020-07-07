import { Configs } from '../interfaces/config.interface';
export class RmanConfig implements Configs {

    friendlyName = 'Rman';
    type = 'local';
    fields = {
        exclusionCodes: {
            label: ""
        },
        databaseNames: {
            label: "databaseNames"
        },
        filePath: {
            label: "filePath"
        }
    }
}