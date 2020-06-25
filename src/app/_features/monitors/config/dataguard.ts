import { Configs } from '../interfaces/config.interface';
export class DataguardConfig implements Configs {

    friendlyName = 'Dataguard';
    type = 'local';
    fields = {
        databaseNames: {
            label: "databaseNames"

        },
        filePath: {
            label: "filePath"
        }
    }
}