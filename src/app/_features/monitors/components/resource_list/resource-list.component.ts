import { Component, OnInit, Input } from '@angular/core';
import { BoundMonitor } from 'src/app/_models/resources';
import { ResourcesService } from '../../../../_services/resources/resources.service';
import { Subscription } from 'rxjs';
import { ConstantPool } from '@angular/compiler';
@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {
  resources:BoundMonitor[]; 
  @Input() monitorId:string;
  subscriber = new Subscription();
  constructor(private rsService : ResourcesService) { }

  /**
   * @description Default (ngOnInit) function called when component loads for the first time.
   */

  ngOnInit(): void {
    this.getResources();
  }

  /**
   * @description call getResources function to get all bound resources which is bound to speicific monitor.
   * @param monitorId string
  */

  getResources(){
    this.subscriber=this.rsService.getBoundResource(this.monitorId).subscribe(data =>{      
      this.resources = data.content;
    })
  }

  /**
   * @description call ngOnDestroy function when to unsubscribe subscriber param which is subscribed to fetch resources. 
   * @field this.subscriber
   */

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
