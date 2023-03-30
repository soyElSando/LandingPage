import { TestBed } from '@angular/core/testing';
import { SobreMiService } from './sobre-mi.service';
import sobreMi from 'src/assets/mockBD/sobreMi.json';
import { SobreMi } from '../models/SobreMi.model';
import { of } from 'rxjs';

describe('SobreMiService', () => {
  let service: SobreMiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SobreMiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return sobreMi object', () => {
    let expectedSobreMi: SobreMi = sobreMi;
    let spy = spyOn(service, 'getSobreMi').and.returnValue(of(expectedSobreMi));

    service.getSobreMi().subscribe((result) => {
      expect(result).toEqual(expectedSobreMi);
      expect(spy).toHaveBeenCalled();
    });
  });
});
