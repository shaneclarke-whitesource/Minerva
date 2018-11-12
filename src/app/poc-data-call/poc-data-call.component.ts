import { Component, OnInit } from '@angular/core';
import { PocApiCallService } from '../poc-api-call.service';

@Component({
  selector: 'app-poc-data-call',
  templateUrl: './poc-data-call.component.html',
  styleUrls: ['./poc-data-call.component.less']
})
export class PocDataCallComponent implements OnInit {

  constructor( private apiCall:PocApiCallService ) { 
    
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(){
    this.apiCall.post({ "queryString":  "select * from agent_cpu where time > now() - 5m" })
    .subscribe(response => console.log(response));
  }
}
