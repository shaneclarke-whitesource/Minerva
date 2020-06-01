import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animations } from 'src/app/_shared/animations';
import { Observable } from 'rxjs';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { Monitor } from 'src/app/_models/monitors';


declare const window: any;

@Component({
  selector: 'app-monitor-detail',
  templateUrl: './monitor-details.page.html',
  styleUrls: ['./monitor-details.page.scss'],
  animations: [
    Animations.slideUpDownTrigger
  ]
})
export class MonitorDetailsPage implements OnInit {
  id: string;

  monitor$: Observable<Monitor>;
  Object = window.Object;
  additionalSettings: string = 'out';

  @ViewChild('delMonLink') delMonitor :ElementRef;
  @ViewChild('delMonitorFail') delMonitorFailure: ElementRef;
  deleteLoading:boolean = false;


  constructor(private route: ActivatedRoute, private router: Router,
    private monitorService: MonitorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.monitor$ = this.monitorService.getMonitor(this.id);
    });
  }

  deleteMonitor(id: string): void {
    this.deleteLoading = true;
    this.monitorService.deleteMonitor(id).subscribe((resp) => {
      this.deleteLoading = false;

      if (resp.status === 204) {
        this.router.navigate(['/monitors']);
      }
      else {
        this.delMonitor.nativeElement.click();
        this.delMonitorFailure.nativeElement.click();
      }
    }, () => {
      this.deleteLoading = false;
      this.delMonitor.nativeElement.click();
      this.delMonitorFailure.nativeElement.click();
    });
  }

}
