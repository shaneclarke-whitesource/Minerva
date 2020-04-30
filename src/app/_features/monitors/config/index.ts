import { CPUConfig } from './cpu';
import { DiskConfig } from './disk';
import { MemoryConfig } from "./mem";

export const config = {
    Cpu: new CPUConfig(),
    Disk: new DiskConfig(),
    Mem:new MemoryConfig(),    
}
