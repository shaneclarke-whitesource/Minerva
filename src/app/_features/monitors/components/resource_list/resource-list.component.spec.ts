import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceListComponent } from './resource-list.component';
import { ResourcesService } from '../../../../_services/resources/resources.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { resourcesMock } from '../../../../_mocks/resources/resources.service.mock';
import { of } from 'rxjs';

describe('ResourceListComponent', () => {
  let component: ResourceListComponent;
  let fixture: ComponentFixture<ResourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceListComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers:[{provide:ResourcesService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(ResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('get bound resources', (done) =>{
    let spy = spyOn(component, 'getResources').and.returnValue(of(new resourcesMock().boundResource));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() =>{
      expect(component.getResources).toHaveBeenCalled()
      expect(component.resources.length).toBeGreaterThanOrEqual(1);
      done();
    })
  });
});
