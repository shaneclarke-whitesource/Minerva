import { async, ComponentFixture, TestBed, getTestBed, } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ResourcesListComponent } from './resourceslist.component';
import { ResourcesPage } from '../../pages/resources/resources.page';
import { ResourceDetailsPage } from '../../pages/details/resource-details.page';
import { resourcesMock } from '../../../../_mocks/resources/resources.service.mock'
import { environment } from '../../../../../environments/environment';
import { Resource } from 'src/app/_models/resources';
import { ValidateResource } from '../../../../_shared/validators/resourceName.validator';
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { Router } from '@angular/router';

var mockResource: Resource = {
  "resourceId": "development:1",
  "labels": {
    "agent_discovered_arch": "MS90HCG8WL",
    "agent_discovered_os": "darwin",
    "agent_discovered_hostname": "localdev",
    "pingable": "true",
    "agent.discovered.arch": "amd64"
  },
  "metadata": {
    "ping_ip": "127.0.0.1"
  },
  "tenantId": "833544",
  "presenceMonitoringEnabled": true,
  "associatedWithEnvoy": false,
  "createdTimestamp": new Date(),
  "updatedTimestamp": new Date()
};

describe('ResourcesListComponent', () => {
  let injector: TestBed;
  let component: ResourcesListComponent;
  let fixture: ComponentFixture<ResourcesListComponent>;
  let validateResource: ValidateResource;
  let resourceService: ResourcesService;
  let router: Router;

  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ResourcesListComponent, ResourcesPage, ResourceDetailsPage ],
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'resources/development:0', component: ResourceDetailsPage}]
        ),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        ResourcesService,
        ValidateResource,
        // reference the new instance of formBuilder from above
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(ResourcesListComponent);
    component = fixture.componentInstance;
    resourceService = injector.get(ResourcesService);
    validateResource = injector.get(ValidateResource);
    router = injector.get(Router);
    component.addResourceForm = formBuilder.group({
      name: ['', Validators.required],
      enabled: ''
    });

    fixture.detectChanges();
  });

  const updateForm = (resourceId: string, enabledPresence: boolean) => {
    component.addResourceForm.controls['name'].setValue(resourceId);
    component.addResourceForm.controls['enabled'].setValue(enabledPresence);
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it ('should have defaults', () => {
        expect(component.addResLoading).toEqual(false);
        expect(component.addButton).toBeDefined();
    });

    it('ngOnInit should resolve resources', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.resources).toEqual(new resourcesMock().collection.content
        .slice(0 * environment.pagination.resources.pageSize, 1 * environment.pagination.resources.pageSize));
      });
    });

    it('should assign total amount of resources', () => {
      expect(component.total).toEqual(54);
    });

    it('should assign current page', () => {
      expect(component.page).toEqual(0);
    });

    it('should create correct placeholder text', () => {
      expect(component.searchPlaceholderText).toEqual('Search 54 Resources');
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
    component.goToPage(2);
    expect(component.page).toEqual(2);
  });

  it('should goto next page', () => {
    component.nextPage();
    expect(component.page).toEqual(1);
  });

  it('should goto previous page', () => {
    component.goToPage(3);
    component.prevPage();
    expect(component.page).toEqual(2);
  });

  it('should set loading back to false after form submission', () => {
    expect(component.addResLoading).toBe(false);
    updateForm('newcool-server', false);
    fixture.ngZone.run(() => {
      component.addResource(component.addResourceForm);
      expect(component.addResLoading).toBe(false);
    });
  });

  it('should error form when resourceId is empty', () => {
    updateForm('', false);
    component.addResource(component.addResourceForm);
    expect(component.addResourceForm.invalid).toBe(true);
  });

  it('should add Resource and navigate to details page', () => {
    const spy = spyOn(router, 'navigate');
    fixture.ngZone.run(() => {
      updateForm('newcool-server', false);
      component.addResource(component.addResourceForm);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should add Resource and trigger services', () => {
    const spy = spyOn(resourceService, 'createResource');
    fixture.ngZone.run(() => {
      updateForm('newcool-server', false);
      component.addResource(component.addResourceForm);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should destroy subscriptions', () => {
    spyOn(component['ngUnsubscribe'], 'next');
    spyOn(component['ngUnsubscribe'], 'complete');
    component.ngOnDestroy();
    expect(component['ngUnsubscribe'].next).toHaveBeenCalledTimes(1);
    expect(component['ngUnsubscribe'].complete).toHaveBeenCalledTimes(1);
  });
});
