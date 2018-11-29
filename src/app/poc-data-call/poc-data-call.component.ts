import { Component, OnInit } from '@angular/core';
import { PocApiCallService } from '../poc-api-call.service';
import * as d3 from 'd3';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-poc-data-call',
  templateUrl: './poc-data-call.component.html',
  styleUrls: ['./poc-data-call.component.less']
})
export class PocDataCallComponent implements OnInit {

  marshalledData = [];
  logger = new LoggingService();

  constructor( private apiCall:PocApiCallService ) { 

  }

  ngOnInit() {
    
  }

  ngAfterContentInit() {
    this.fetchData();
  }

  fetchData(){
    this.logger.log('Fetching data', this.logger.logLevels.info);
    this.apiCall.post({ "queryString":  "select * from agent_cpu where time > now() - 5m" })
    .subscribe(response => this.dataMarshaller(response));
  }

  visualize() {

    // Setup the margins and height, width
    var margin = { top: 30, right: 20, bottom: 30, left: 50 };
    const height = 200 - margin.top - margin.bottom;
    const width = 600 - margin.left - margin.right;

    // Create the line
    var calculatedLine = d3.line()
    .y(function(data:any, index:number){
      return data.cpu_max_usage;
    })
    .x(function(data:any, index:number){
      return index * 10;
    })

    // Setup the svg element in the DOM
    var svg = d3.select('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create the path to the line in the svg element
    svg.append('path')
    .attr('d', calculatedLine(this.marshalledData))
    .attr('class', 'line')
    .style('stroke-width', 2)
    .style('stroke', 'orange')
    .style('fill', 'none');
  
    // Scale the graph to the dimensions of the svg
    var chartProps = {};
    chartProps['x'] = d3.scaleLinear().range([0, width]);
    chartProps['y'] = d3.scaleLinear().range([height, 0]);

    var xAxis = d3.axisBottom(chartProps['x']);
    var yAxis = d3.axisLeft(chartProps['y']);
    
    // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  }

  dataMarshaller(data: any) {
    this.logger.log({ message: 'returned data', data: data }, 1);
    for (let index in data[0].valuesCollection) {
      this.marshalledData.push({ time: data[0].valuesCollection[index][0], cpu_max_usage: data[0].valuesCollection[index][8] });
    }
    this.logger.log('Finished marshalling data', 1);
    this.visualize();
  }
}
