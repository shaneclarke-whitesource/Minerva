import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, OnDestroy, AfterViewInit, Output  } from '@angular/core';
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  tap
} from "rxjs/operators";
import { fromEvent, Subscription } from 'rxjs';
import { Resources } from 'src/app/_models/resources';

@Component({
  selector: 'app-resources-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit, OnDestroy {

  @ViewChild('searchResources', { static: true }) searchResources: ElementRef;
  @Input() placeholder: string = "";
  @Output() searchResults = new EventEmitter<Resources>();

  @Output() resetResults = new EventEmitter<{}>();

  @Output() searching = new EventEmitter<boolean>();


  private subscription: Subscription;

  constructor(private resourceService: ResourcesService) { }

  ngAfterViewInit(): void {
    const search$ = fromEvent(this.searchResources.nativeElement, 'keyup')
    .pipe(
      map((e:any) => {
        if (e.target.value === "") {
          this.reset();
        }
        return e.target.value }), // retrieve the value of the input
     /*tap((input) => {
          if (input == "" || input.length <= 1) {
            this.reset();
          }
      }),*/
      filter((text:string) => text && text.length > 1), // filter if empty or more than 1
      debounceTime(1000), // search after 1000 ms or 1 second
      distinctUntilChanged(),
      tap(() => this.searching.emit(true))
    )

    // create subscription for text input
    this.subscription = search$.subscribe((text) => {
      this.resourceService.searchResources(text).subscribe((res) => {
        this.searching.emit(false)
        this.searchResults.emit(res)
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
