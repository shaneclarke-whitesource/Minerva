import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ResourcesListComponent } from './resourceslist.component';
import { ResourcesPage } from '../../pages/resources/resources.page';
import { ResourceDetailsPage } from '../../pages/details/resource-details.page';
import { ResourcesMock } from '../../../../_mocks/resources/resources.service.mock'
import { environment } from '../../../../../environments/environment';

var mockResource = {
  "id": 26,
  "resourceId": "development:1",
  "labels": {
    "agent.discovered.hostname": "MS90HCG8WL",
    "agent.discovered.os": "darwin",
    "agent.environment": "localdev",
    "pingable": "true",
    "agent.discovered.arch": "amd64"
  },
  "metadata": {
    "ping_ip": "127.0.0.1"
  },
  "tenantId": "833544",
  "presenceMonitoringEnabled": true,
  "region": null
};

describe('ResourcesListComponent', () => {
  let component: ResourcesListComponent;
  let fixture: ComponentFixture<ResourcesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ResourcesListComponent, ResourcesPage, ResourceDetailsPage ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setup defaults', () => {
    it('ngOnInit should resolve resources', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.resources).toEqual(new ResourcesMock().collection.content
        .slice(0 * environment.pagination.resources.pageSize, 1 * environment.pagination.resources.pageSize));
      });
    });

    it('should assign total amount of resources', () => {
      expect(component.total).toEqual(54);
    });

    it('should assign current page', () => {
      expect(component.page).toEqual(1);
    });

    it('should create correct placeholder text', () => {
      expect(component.searchPlaceholderText).toEqual('Search 54 Resources');
    });
  });

  it('should add all resources', () => {
    var checked = { target:{checked:true} };
    component.checkColumn(checked);
    component.selectedResources.forEach(e => {
      e.checked = true;
    });

    expect(component.resources)
    .toEqual(component.selectedResources);

  });

  it('should remove all resources', () => {
    var unchecked = { target:{checked:false} };
    component.checkColumn(unchecked);
    expect(component.selectedResources).toEqual([]);
  });

  it('should select a resource', () => {
    component.selectResource(mockResource);
    expect(component.selectedResources[0]).toEqual(mockResource);
  });

  it('should remove a selected resource', () => {
    component.selectResource(mockResource);
    component.selectResource(mockResource);
    expect(component.selectedResources.indexOf(mockResource)).toEqual(-1);
  });

  it('should goto page', () => {
    component.goToPage(3);
    expect(component.page).toEqual(3);
  });

  it('should goto next page', () => {
    component.nextPage();
    expect(component.page).toEqual(2);
  });

  it('should goto previous page', () => {
    component.goToPage(3);
    component.prevPage();
    expect(component.page).toEqual(2);
  });


  it('should destroy subscriptions', () => {
    spyOn(component['ngUnsubscribe'], 'next');
    spyOn(component['ngUnsubscribe'], 'complete');
    component.ngOnDestroy();
    expect(component['ngUnsubscribe'].next).toHaveBeenCalledTimes(1);
    expect(component['ngUnsubscribe'].complete).toHaveBeenCalledTimes(1);
  });
});
