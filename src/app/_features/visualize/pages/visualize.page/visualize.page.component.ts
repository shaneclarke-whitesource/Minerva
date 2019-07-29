import { Component, OnInit } from '@angular/core';
import { GraphEngine } from 'hedwig-monitoring-library';

@Component({
  selector: 'app-visualize.page',
  templateUrl: './visualize.page.component.html',
  styleUrls: ['./visualize.page.component.scss']
})
export class VisualizePage implements OnInit {

  graphType: string;
  dataStuff = JSON.stringify([
    {
        "usage_average": .37,
        "time": "2018-11-24T18:58:21Z"
    },
    {
        "usage_average": 0.50,
        "time": "2018-11-25T23:58:21Z"
    },
    {
        "usage_average": .80,
        "time": "2018-11-26T02:58:21Z"
    },
    {
        "usage_average": 0.12,
        "time": "2018-11-27T10:58:21Z"
    }]);
  constructor() { }

  ngOnInit() {
    //needed on components that utilize Hedwig
    new GraphEngine();
    this.graphType = 'cpu-average-usage';
  }

}
