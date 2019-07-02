import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { MonitorService } from '../../../../_services/monitors/monitor.service';

@Component({
  selector: 'app-monitorslist',
  templateUrl: './monitorslist.component.html',
  styleUrls: ['./monitorslist.component.scss']
})
export class MonitorslistComponent implements OnInit {

  // @Input will be used to
  @Input() max: string;
  searchPlaceholderText: string;
  monitors: any = [];
  total: number;
  page: number = 1;
  defaultAmount: number = environment.pagination.monitors.pageSize;
  totalPages: number;
  fetchMonitors: any;
  Object: Object = Object;

  selectedMonitors: any = [];
  constructor(private monitorService: MonitorService) { }

  ngOnInit() {
    this.fetchMonitors = () => {
      return this.monitorService.getMonitors(this.defaultAmount, this.page)
        .subscribe(data => {
          this.monitors = this.monitorService.monitors.content;
          this.total = this.monitorService.monitors.totalElements;
          // reapply once API logic is confirmed
          //this.page = this.monitorService.monitors.default.number + 1;
          this.searchPlaceholderText = `Search ${this.total} monitors`;
      });
    }
    this.fetchMonitors();
  }

  checkColumn(event) {
    if (event.target.checked) {
      this.selectedMonitors = this.monitors.map(x => Object.assign({}, x));
    }
    else {
      this.selectedMonitors = [];
    }
    this.monitors.forEach(e => {
      e.checked = event.target.checked;
    });
  }

  goToPage(n: number): void {
    this.page = n;
    this.fetchMonitors();
  }

  nextPage(): void {
    this.page++;
    this.fetchMonitors();
  }

  prevPage(): void {
    this.page--;
    this.fetchMonitors();
  }

  selectMonitors(monitor) {
    if (this.selectedMonitors.indexOf(monitor) === -1) {
      this.selectedMonitors.push(monitor);
    } else {
      this.selectedMonitors.splice(
        this.selectedMonitors.indexOf(monitor), 1
      );
    }
  }

}
