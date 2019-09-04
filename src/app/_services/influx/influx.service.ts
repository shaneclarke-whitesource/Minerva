import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfluxService {

  constructor() { }

// influx query to show measurements i.e. tables
readonly influxShowMeasurements = () => {
  return `SHOW MEASUREMENTS LIMIT 100`;
}

/**
 * @name influxShowFields
 * @description influx query to show fields of a particular measurement
 * @param measurement the measurement from which to get field keys
*/
readonly influxShowFields = (measurement) => {
  return `SHOW FIELD KEYS FROM "${measurement}"`;
};

/**
 * @name influxDevices
 * @description gets all devices
 * @param field specific field
 * @param startTime start time of query
 * @param endTime end time of query
*/
  readonly influxDevices = (field:string, measurement, startTime, endTime) => {
    return `SELECT "${field}", "deviceLabel", "device" FROM "${measurement}" ` +
    `WHERE time >= ${endTime} - ${startTime}`;
  };

/**
 * @name influxMetrics
 * @description influx query for data points
 * @param metric name of metric - field key
 * @param table  name of table to query
 * @param startTime start time of query
 * @param endTime end time of query
*/
  readonly influxMetrics = (metric:string, table:string, startTime:string,
  endTime:string, device:string) => {
    return `SELECT mean("${metric}") FROM "${table}" ` +
    `WHERE time >= ${endTime} - ${startTime} AND device = "${device}" ` +
    `GROUP BY time(1m) fill(null)`;
};
}
