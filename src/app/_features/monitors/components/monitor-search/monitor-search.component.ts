import { Component, OnInit, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { EventEmitter } from 'protractor';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { Monitors } from 'src/app/_models/monitors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monitor-search',
  templateUrl: './monitor-search.component.html',
  styleUrls: ['./monitor-search.component.scss']
})
export class MonitorSearchComponent implements OnInit {

  @ViewChild('searchMonitors', {static : true}) searchMonitors: ElementRef; 
  @Input() placeholder: string;
  @Output() monitorSearchResults = new EventEmitter<Monitors>();

  private subscription: Subscription;

  constructor(private monitorð) { }

  ngOnInit(): void {
  }

}
