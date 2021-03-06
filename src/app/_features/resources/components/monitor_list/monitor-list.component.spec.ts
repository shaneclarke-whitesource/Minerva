import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorService } from "../../../../_services/monitors/monitor.service";
import { MonitorListComponent } from './monitor-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { monitorsMock } from "../../../../_mocks/monitors/monitors.service.mock";
import { of } from 'rxjs';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';

describe('MonitorListComponent', () => {
  let component: MonitorListComponent;
  let fixture: ComponentFixture<MonitorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorListComponent, PaginationComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
              ],
      providers:[{provide:MonitorService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get bound monitors', (done) =>{
    let spy = spyOn(component, 'getMonitors').and.returnValue(of(new monitorsMock().boundMonitor));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() =>{
      expect(component.getMonitors).toHaveBeenCalled()
      expect(component.monitors.length).toBeGreaterThanOrEqual(1);
      done();
          })
  })
});
