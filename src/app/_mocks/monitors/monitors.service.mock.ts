import { default as monitorsCollection} from './collection.json';
import { default as monitorSingle } from './single.json';
import { default as schema } from './schema.json';
import { default as boundMonitor} from "./boundMonitor.json";


export class monitorsMock {
    collection = monitorsCollection;
    single = monitorSingle;
    schema = schema;
    boundMonitor = boundMonitor;
}
