/**
 * Salus Monitor definition
 */
export interface CreateMonitor {
    name?: string;
    labelSelector?: {
        [k: string]: string;
    };
    labelSelectorMethod?: "AND" | "OR";
    resourceId?: string;
    excludedResourceIds?: string[];
    interval?: string;
    details?: Local | Remote;
}
export interface Local {
    type: "local";
    plugin:
    | Apache
    | Cpu
    | Disk
    | Diskio
    | Mem
    | Mysql
    | Net
    | OracleDataguard
    | OracleRman
    | OracleTablespace
    | Packages
    | Postgresql
    | Procstat
    | Redis
    | Sqlserver
    | System;
}
export interface Apache {
    type: "apache";
    url: string;
    username?: string;
    password?: string;
    timeout?: string;
    tlsCa?: string;
    tlsCert?: string;
    tlsKey?: string;
    insecureSkipVerify?: boolean;
}
export interface Cpu {
    type: "cpu";
    percpu?: boolean;
    totalcpu?: boolean;
    collectCpuTime?: boolean;
    reportActive?: boolean;
}
export interface Disk {
    type: "disk";
    mount: string;
}
export interface Diskio {
    type: "diskio";
    device?: string;
    skipSerialNumber?: boolean;
}
export interface Mem {
    type: "mem";
}
export interface Mysql {
    type: "mysql";
    servers: any;
    perfEventsStatementsDigestTextLimit?: number;
    perfEventsStatementsLimit?: number;
    perfEventsStatementsTimeLimit?: number;
    tableSchemaDatabases?: string[];
    gatherProcessList?: boolean;
    gatherUserStatistics?: boolean;
    gatherInfoSchemaAutoInc?: boolean;
    gatherInnodbMetrics?: boolean;
    gatherSlaveStatus?: boolean;
    gatherBinaryLogs?: boolean;
    gatherTableIoWaits?: boolean;
    gatherTableLockWaits?: boolean;
    gatherIndexIoWaits?: boolean;
    gatherEventWaits?: boolean;
    gatherTableSchema?: boolean;
    gatherFileEventsStats?: boolean;
    gatherPerfEventsStatements?: boolean;
    intervalSlow?: string;
    tlsCa?: string;
    tlsCert?: string;
    tlsKey?: string;
    insecureSkipVerify?: boolean;
}
export interface Net {
    type: "net";
    ignoreProtocolStats?: boolean;
    interface?: string;
}
export interface OracleDataguard {
    type: "oracle_dataguard";
    databaseNames?: string[];
    filePath?: string;
}
export interface OracleRman {
    type: "oracle_rman";
    exclusionCodes?: string[];
    databaseNames?: string[];
    filePath?: string;
}
export interface OracleTablespace {
    type: "oracle_tablespace";
    databaseNames?: string[];
    filePath?: string;
}
export interface Packages {
    type: "packages";
    includeRpm?: boolean;
    includeDebian?: boolean;
    failWhenNotSupported?: boolean;
}
export interface Postgresql {
    type: "postgresql";
    address: string;
    outputaddress?: string;
    maxLifetime?: string;
    ignoredDatabases?: string[];
    databases?: string[];
}
export interface Procstat {
    type: "procstat";
    pidFile?: string;
    user?: string;
    exe?: string;
    pattern?: string;
    systemdUnit?: string;
    cgroup?: string;
    winService?: string;
    processName?: string;
}
export interface Redis {
    type: "redis";
    url: string;
    password?: string;
    tlsCa?: string;
    tlsCert?: string;
    tlsKey?: string;
    insecureSkipVerify?: boolean;
}
export interface Sqlserver {
    type: "sqlserver";
    servers: any;
    azuredb: boolean;
    queryExclusions?: string[];
}
export interface System {
    type: "system";
}
export interface Remote {
    type: "remote";
    monitoringZones?: string[];
    plugin: Dns | Http | Mysql1 | NetResponse | Ping | Postgresql1 | Smtp | Sqlserver1 | Ssl;
}
export interface Dns {
    type: "dns";
    dnsServer: string;
    domain: string;
    network: "udp" | "tcp";
    recordType: "A" | "AAAA" | "ANY" | "CNAME" | "MX" | "NS" | "PTR" | "TXT" | "SOA" | "SPF" | "SRV";
    port: number;
    timeout?: string;
}
export interface Http {
    type: "http";
    url: string;
    httpProxy?: string;
    timeout?: string;
    method?: string;
    followRedirects?: boolean;
    body?: string;
    responseStringMatch?: string;
    tlsCa?: string;
    tlsCert?: string;
    tlsKey?: string;
    insecureSkipVerify?: boolean;
    headers?: {
        [k: string]: string;
    };
}
export interface Mysql1 {
    type: "mysql";
    servers: any;
    perfEventsStatementsDigestTextLimit?: number;
    perfEventsStatementsLimit?: number;
    perfEventsStatementsTimeLimit?: number;
    tableSchemaDatabases?: string[];
    gatherProcessList?: boolean;
    gatherUserStatistics?: boolean;
    gatherInfoSchemaAutoInc?: boolean;
    gatherInnodbMetrics?: boolean;
    gatherSlaveStatus?: boolean;
    gatherBinaryLogs?: boolean;
    gatherTableIoWaits?: boolean;
    gatherTableLockWaits?: boolean;
    gatherIndexIoWaits?: boolean;
    gatherEventWaits?: boolean;
    gatherTableSchema?: boolean;
    gatherFileEventsStats?: boolean;
    gatherPerfEventsStatements?: boolean;
    intervalSlow?: string;
    tlsCa?: string;
    tlsCert?: string;
    tlsKey?: string;
    insecureSkipVerify?: boolean;
}
export interface NetResponse {
    type: "net_response";
    protocol: "udp" | "tcp";
    host: string;
    port: number;
    timeout?: string;
    readTimeout?: string;
    send?: string;
    expect?: string;
}
export interface Ping {
    type: "ping";
    target: string;
    count?: number;
    pingInterval?: string;
    timeout?: string;
    deadline?: string;
}
export interface Postgresql1 {
    type: "postgresql";
    address: string;
    outputaddress?: string;
    maxLifetime?: string;
    ignoredDatabases?: string[];
    databases?: string[];
}
export interface Smtp {
    type: "smtp";
    host: string;
    port: number;
    timeout?: string;
    readTimeout?: string;
    ehlo?: string;
    from?: string;
    to?: string;
    body?: string;
    starttls?: boolean;
    tlsCa?: string;
    tlsCert?: string;
    tlsKey?: string;
    insecureSkipVerify?: boolean;
}
export interface Sqlserver1 {
    type: "sqlserver";
    servers: any;
    azuredb: boolean;
    queryExclusions?: string[];
}
export interface Ssl {
    type: "ssl";
    target: string;
    timeout?: string;
    tlsCa?: string;
    tlsCert?: string;
    tlsKey?: string;
    insecureSkipVerify?: boolean;
}
