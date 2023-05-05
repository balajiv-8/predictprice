import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initialized locations', () => {
    expect(component.locations).toBeDefined();
  });

  it('should set locations correctly', () => {
    const testLocations = ['location1', 'location2', 'location3'];
    const expectedLocations = testLocations;
    component.locations = testLocations;
    expect(component.locations).toEqual(expectedLocations);
  });

  it('should have a getBHKValue function that returns a number', () => {
    expect(typeof component.getBHKValue()).toBe('number');
  });

  it('should have a getBathValue function that returns a number', () => {
    expect(typeof component.getBathValue()).toBe('number');
  });

  it('should have an onClickedEstimatePrice function', () => {
    expect(component.onClickedEstimatePrice).toBeDefined();
  });
});
