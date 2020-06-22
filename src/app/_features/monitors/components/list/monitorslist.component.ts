import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { MonitorService } from '../../../../_services/monitors/monitor.service';
import { Monitor, Monitors} from '../../../../_models/monitors';
import { SpinnerService } from '../../../../_services/spinner/spinner.service';

@Component({
  selector: 'app-monitorslist',
  templateUrl: './monitorslist.component.html',
  styleUrls: ['./monitorslist.component.scss']
})
export class MonitorslistComponent implements OnInit {
  searchPlaceholderText: string;
  monitors: any[];
  total: number;
  page: number = 0;
  defaultAmount: number = environment.pagination.pageSize;
  fetchMonitors: any;
  Object: Object = Object;
  selectedMonitors: any = [];
  constructor(private monitorService: MonitorService, private spnService: SpinnerService) { this.spnService.changeLoadingStatus(true); }

  ngOnInit() {
    this.fetchMonitors = () => {
      return this.monitorService.getMonitors(this.defaultAmount, this.page)
        .subscribe(data => {
          this.spnService.changeLoadingStatus(false);
          this.monitors = this.monitorService.monitors.content;
          this.total = this.monitorService.monitors.totalElements;
          this.searchPlaceholderText = `Search ${this.total} monitors`;
      });
    }
    this.fetchMonitors();
  }

  /**
   * @description check column event for items in tables, selects monitor item
   * @param event any
   * @returns void
   */
  checkColumn(event) {
    if (event.target.checked) {
      this.selectedMonitors = this.monitors.map(x => Object.assign({}, x));
    }
    else {
      this.selectedMonitors = [];
    }
    this.monitors.forEach(e => {
      e["checked"] = event.target.checked;
    });
  }

  /**
   * @description <app-pagination>
   * @param n number
   * @returns void
  */
  goToPage(n: number): void {
    this.page = n;
    this.fetchMonitors();
  }

  /**
   * @description <app-pagination>
   */
  nextPage(): void {
    this.page++;
    this.fetchMonitors();
  }

  /**
   * @description <app-pagination>
   */
  prevPage(): void {
    this.page--;
    this.fetchMonitors();
  }

  /**
   * @description Add selected monitors to an array for actions
   * @param monitor Monitor
   */
  selectMonitors(monitor: Monitor) {
    if (this.selectedMonitors.indexOf(monitor) === -1) {
      this.selectedMonitors.push(monitor);
    } else {
      this.selectedMonitors.splice(
        this.selectedMonitors.indexOf(monitor), 1
      );
    }
  }

}
