import { Cpu } from 'src/app/_models/salus.monitor'

export class MonitorConfig {
    monitor: {
        "CPU":
        {
            "interface": Cpu
            "details": {
                "type": "local",
                "plugin": {
                    "type": "cpu"
                }
            }
        }
    }

}