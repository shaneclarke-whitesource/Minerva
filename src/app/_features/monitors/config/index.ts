import { CPUConfig } from './cpu';
import { DiskConfig } from './disk';
import { NetworkConfig } from './net';
import { MemoryConfig } from "./mem";

export const config = {
    Cpu: new CPUConfig(),
    Disk: new DiskConfig(),
    Net: new NetworkConfig(),
    Mem:new MemoryConfig(),    
}
