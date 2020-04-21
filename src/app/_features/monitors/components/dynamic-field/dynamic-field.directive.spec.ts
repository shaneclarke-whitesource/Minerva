import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { Component, DebugElement, ComponentFactoryResolver } from '@angular/core';

@Component({
  template: `
  <form>
  <ng-container type="text" monitorDynamicField>
  </ng-container>
  </form>
  `
})
class TestDynamicFieldComponent {
}

describe('DynamicFieldDirective', () => {

  let component: TestDynamicFieldComponent;
  let fixture: ComponentFixture<TestDynamicFieldComponent>;
  let componentFactoryResolver : ComponentFactoryResolver ;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [TestDynamicFieldComponent, DynamicFieldDirective]
    });
    fixture = TestBed.createComponent(TestDynamicFieldComponent);
    component = fixture.componentInstance;
    componentFactoryResolver =  fixture.debugElement.injector.get(ComponentFactoryResolver);
});

  it('should create an instance', () => {
    expect(component).toBeDefined()
  });
});
