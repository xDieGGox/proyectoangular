import { TestBed } from '@angular/core/testing';

import { CarritosService } from './carritos.service';

describe('CarritosService', () => {
  let service: CarritosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
