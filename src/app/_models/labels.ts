export interface ILabelResources extends ILabelMonitors{
    agent_discovered_arch: string[];
    agent_discovered_hostname: string[];
    agent_discovered_bios_vendor: string[];
    agent_discovered_bios_version: string[];
    agent_discovered_serial: string[];
    agent_discovered_xen_id: string[];
    [key: string]: any;
}

export interface ILabelMonitors {
    agent_discovered_os: string[];
}