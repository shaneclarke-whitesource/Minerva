import { CPUConfig } from './cpu';
import { DiskConfig } from './disk';
import { NetworkConfig } from './net';
import { MemoryConfig } from "./mem";
import { NetResponseConfig } from "./NetResponse";
import { MySqlConfig } from "./mysql";
import { DiskioConfig } from "./diskio";
import { ApacheConfig } from "./apache";
import {RmanConfig  } from "./rman";
import {  DataguardConfig} from "./dataguard";
import { PackagesConfig } from "./packages";
import { PostgresqlConfig } from "./postgresql";
import { TablespaceConfig } from "./tablespace";
import { ProcstatConfig } from './procstat';
import { RedisConfig } from './redis';
import { SqlServerConfig } from './sqlserver';
import { SystemConfig } from './system';
import { DnsConfig } from "./dns";
import { HttpResponseConfig } from "./httpresponse";
import { MysqlRemoteConfig } from "./mysqlremote";
import { PingConfig } from "./ping";
import { PostgresqlRemoteConfig } from "./postgresqlremote";
import { SmtpConfig } from "./smtp";
import { SqlServerRemoteConfig } from './sqlserverremote';
import { X509CertConfig } from './x509cert';

export const config = {
    Cpu: new CPUConfig(),
    Disk: new DiskConfig(),
    Net: new NetworkConfig(),
    Mem: new MemoryConfig(),
    NetResponse: new NetResponseConfig(),
    MySql: new MySqlConfig(),
    DiskIo:new DiskioConfig(),
    Apache:new ApacheConfig(),
    Rman: new RmanConfig(),
    Dataguard: new DataguardConfig(),
    Postgresql:new PostgresqlConfig(),
    Tablespace: new TablespaceConfig(),
    Packages:new PackagesConfig(),
    Procstat: new ProcstatConfig(),
    Redis: new RedisConfig(),
    SqlServer: new SqlServerConfig(),
    System : new SystemConfig(),
    Dns:new DnsConfig(),
    HttpResponse: new HttpResponseConfig(),
    MysqlRemote: new MysqlRemoteConfig(),
    Ping: new PingConfig(),
    PostgresqlRemote: new PostgresqlRemoteConfig(),
    Smtp: new SmtpConfig(),
    SqlServerRemote : new SqlServerRemoteConfig(),
    X509Cert: new X509CertConfig()
}