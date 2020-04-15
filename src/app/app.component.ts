import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoggingService } from './_services/logging/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit  {
  title = 'minerva';
  message: string = undefined;  
  constructor(private lgService:LoggingService,
     private changeDetector: ChangeDetectorRef){}

  ngOnInit() {
    this.subscribeError();
  }
  private subscribeError(){
    this.lgService.getAlertMsg().subscribe(msg =>{
      this.message=msg;      
      this.changeDetector.detectChanges();
    })
  }
 }