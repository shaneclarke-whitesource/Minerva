
import { Configs } from '../interfaces/config.interface';
export class MysqlRemoteConfig implements Configs {

    friendlyName = 'MysqlRemote';
    type = 'remote';
    fields = {
        servers: {
            label: "servers",
          },
          perfEventsStatementsDigestTextLimit: {
           label: "perfEventsStatementsDigestTextLimit"
          },
          perfEventsStatementsLimit: {
           label: "perfEventsStatementsLimit"
          },
          perfEventsStatementsTimeLimit: {
           label: "perfEventsStatementsTimeLimit"
          },
          tableSchemaDatabases: {
           label: "tableSchemaDatabases",
          },
          gatherProcessList: {
           label: "gatherProcessList"
          },
          gatherUserStatistics: {
           label: "gatherUserStatistics"
          },
          gatherInfoSchemaAutoInc: {
           label: "gatherInfoSchemaAutoInc"
          },
          gatherInnodbMetrics: {
           label: "gatherInnodbMetrics"
          },
          gatherSlaveStatus: {
           label: "gatherSlaveStatus"
          },
          gatherBinaryLogs: {
           label: "gatherBinaryLogs"
          },
          gatherTableIoWaits: {
           label: "gatherTableIoWaits"
          },
          gatherTableLockWaits: {
           label: "gatherTableLockWaits"
          },
          gatherIndexIoWaits: {
           label: "gatherIndexIoWaits"
          },
          gatherEventWaits: {
           label: "gatherEventWaits"
          },
          gatherTableSchema: {
           label: "gatherTableSchema"
          },
          gatherFileEventsStats: {
           label: "gatherFileEventsStats"
          },
          gatherPerfEventsStatements: {
           label: "gatherPerfEventsStatements"
          },
          intervalSlow: {
           label: "intervalSlow"            
          },
          tlsCa: {
           label: "tlsCa"
          },
          tlsCert: {
           label: "tlsCert"
          },
          tlsKey: {
           label: "tlsKey"
          },
          insecureSkipVerify: {
           label: "insecureSkipVerify"
          }
    }
}