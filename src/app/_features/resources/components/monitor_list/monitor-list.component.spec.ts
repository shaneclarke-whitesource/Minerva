import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorService } from "../../../../_services/monitors/monitor.service";
import { MonitorListComponent } from './monitor-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('MonitorListComponent', () => {
  let component: MonitorListComponent;
  let fixture: ComponentFixture<MonitorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorListComponent],
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
  it('get bound monitors', () =>{
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() =>{
      expect(component.monitors.length).toBeGreaterThanOrEqual(1);
    })
  })
});
