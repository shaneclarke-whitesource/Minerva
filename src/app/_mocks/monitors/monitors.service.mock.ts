import { default as monitorsCollection} from './collection.json';
import { default as monitorSingle } from './single.json';
import { default as schema } from './schema.json';

export class monitorsMock {
    collection = monitorsCollection;
    single = monitorSingle;
    schema = schema;
}
