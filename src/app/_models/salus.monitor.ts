/**
 * Salus Monitor definition
 */
export interface ICreateMonitor {
    name?: string;
    labelSelector?: {
        [k: string]: string;
    };
    labelSelectorMethod?: "AND" | "OR";
    resourceId?: string;
    excludedResourceIds?: string[];
    interval?: string;
    details?: ILocal | IRemote;
}
export interface ILocal {
    type: "local";
    plugin:
    | IApache
    | ICpu
    | IDisk
    | IDiskio
    | IMem
    | IMysql
    | INet
    | IOracleDataguard
    | IOracleRman
    | IOracleTablespace
    | IPackages
    | IPostgresql
    | IProcstat
    | IRedis
    | ISqlserver
    | ISystem;
}
export interface IApache {
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
export interface ICpu {
    type: "cpu";
    percpu?: boolean;
    totalcpu?: boolean;
    collectCpuTime?: boolean;
    reportActive?: boolean;
}
export interface IDisk {
    type: "disk";
    mount: string;
}
export interface IDiskio {
    type: "diskio";
    device?: string;
    skipSerialNumber?: boolean;
}
export interface IMem {
    type: "mem";
}
export interface IMysql {
    type: "mysql";
    servers: [string, ...string[]];
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
export interface INet {
    type: "net";
    ignoreProtocolStats?: boolean;
    interface?: string;
}
export interface IOracleDataguard {
    type: "oracle_dataguard";
    databaseNames?: string[];
    filePath?: string;
}
export interface IOracleRman {
    type: "oracle_rman";
    exclusionCodes?: string[];
    databaseNames?: string[];
    filePath?: string;
}
export interface IOracleTablespace {
    type: "oracle_tablespace";
    databaseNames?: string[];
    filePath?: string;
}
export interface IPackages {
    type: "packages";
    includeRpm?: boolean;
    includeDebian?: boolean;
    failWhenNotSupported?: boolean;
}
export interface IPostgresql {
    type: "postgresql";
    address: string;
    outputaddress?: string;
    maxLifetime?: string;
    ignoredDatabases?: string[];
    databases?: string[];
}
export interface IProcstat {
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
export interface IRedis {
    type: "redis";
    url: string;
    password?: string;
    tlsCa?: string;
    tlsCert?: string;
    tlsKey?: string;
    insecureSkipVerify?: boolean;
}
export interface ISqlserver {
    type: "sqlserver";
    servers: [string, ...string[]];
    azuredb: boolean;
    queryExclusions?: string[];
}
export interface ISystem {
    type: "system";
}
export interface IRemote {
    type: "remote";
    monitoringZones?: string[];
    plugin: IDns | IHttp | IMysql1 | INetResponse | IPing | IPostgresql1 | ISmtp | ISqlserver1 | ISsl;
}
export interface IDns {
    type: "dns";
    dnsServer: string;
    domain: string;
    network: "udp" | "tcp";
    recordType: "A" | "AAAA" | "ANY" | "CNAME" | "MX" | "NS" | "PTR" | "TXT" | "SOA" | "SPF" | "SRV";
    port: number;
    timeout?: string;
}
export interface IHttp {
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
export interface IMysql1 {
    type: "mysql";
    servers: [string, ...string[]];
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
export interface INetResponse {
    type: "net_response";
    protocol: "udp" | "tcp";
    host: string;
    port: number;
    timeout?: string;
    readTimeout?: string;
    send?: string;
    expect?: string;
}
export interface IPing {
    type: "ping";
    target: string;
    count?: number;
    pingInterval?: string;
    timeout?: string;
    deadline?: string;
}
export interface IPostgresql1 {
    type: "postgresql";
    address: string;
    outputaddress?: string;
    maxLifetime?: string;
    ignoredDatabases?: string[];
    databases?: string[];
}
export interface ISmtp {
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
export interface ISqlserver1 {
    type: "sqlserver";
    servers: [string, ...string[]];
    azuredb: boolean;
    queryExclusions?: string[];
}
export interface ISsl {
    type: "ssl";
    target: string;
    timeout?: string;
    tlsCa?: string;
    tlsCert?: string;
    tlsKey?: string;
    insecureSkipVerify?: boolean;
}
