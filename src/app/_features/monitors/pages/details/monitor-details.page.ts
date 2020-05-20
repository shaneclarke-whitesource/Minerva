import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, animate, style, group, state } from '@angular/animations'
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorService } from '../../../../_services/monitors/monitor.service';
import { Observable } from 'rxjs';
import { Monitor } from 'src/app/_models/monitors';


declare const window: any;

@Component({
  selector: 'app-monitor-detail',
  templateUrl: './monitor-details.page.html',
  styleUrls: ['./monitor-details.page.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
        animate('400ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('500ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('900ms ease-in-out', style({
          'visibility': 'hidden'
        }))
      ]
      )]),
      transition('out => in', [group([
        animate('1ms ease-in-out', style({
          'visibility': 'visible'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '500px'
        })),
        animate('800ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
      )])
    ])
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
