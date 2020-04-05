import { ICpu } from 'src/app/_models/salus.monitor'

export class MonitorConfig {
    monitor: {
        "CPU":
        {
            "interface": ICpu
            "details": {
                "type": "local",
                "plugin": {
                    "type": "cpu"
                }
            }
        }
    }

}