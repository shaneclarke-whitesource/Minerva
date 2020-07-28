import { Component, OnInit, Output, ViewChild, ElementRef, Input, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  tap
} from "rxjs/operators";
import { fromEvent, Subscription } from 'rxjs';
import { Monitors } from 'src/app/_models/monitors';

@Component({
  selector: 'app-monitor-search',
  templateUrl: './monitor-search.component.html',
  styleUrls: ['./monitor-search.component.scss']
})
export class MonitorSearchComponent implements AfterViewInit, OnDestroy {

  @ViewChild('searchMonitors', {static : true}) searchMonitors: ElementRef; 
  @Input() placeholder: string = "";
  @Output() monitorSearchResults = new EventEmitter<Monitors>();
  @Output() resetResults = new EventEmitter<{}>();
  @Output() searching = new EventEmitter<boolean>();



  private subscription: Subscription;

  constructor(private monitorService: MonitorService) { }

  ngAfterViewInit():void {
    const search$ = fromEvent(this.searchMonitors.nativeElement, 'keyup')
    .pipe(
      map((e:any) => {
        if (e.target.value === "") {
          this.reset();
        }
        return e.target.value }), // retrieve the value of the input
      filter((text:string) => text && text.length > 1), // filter if empty or more than 1
      debounceTime(100), // search after 1000 ms or 1 second
      distinctUntilChanged(),
      tap(() => this.searching.emit(true))
    )

    // create subscription for text input
    this.subscription = search$.subscribe((text) => {
      this.monitorService.searchMonitors(text).subscribe((res) => {
        this.searching.emit(false)
        this.monitorSearchResults.emit(res)
      })
    });

  }
  
    /**
   * Reset dismissal of search
   */
  reset():void {
    this.resetResults.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
