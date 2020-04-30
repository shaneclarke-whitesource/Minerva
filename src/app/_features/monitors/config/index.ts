import { CPUConfig } from './cpu';
import { DiskConfig } from './disk';
import { NetworkConfig } from './net';

export const config = {
    Cpu: new CPUConfig(),
    Disk: new DiskConfig(),
    Net: new NetworkConfig()
}
