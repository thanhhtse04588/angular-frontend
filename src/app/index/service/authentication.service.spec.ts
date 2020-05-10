
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('Service: MyService', () => {
    let service: AuthenticationService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthenticationService]
        });
    });

    it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
        expect(service).toBeTruthy();
    }));

    it('#getValue should return real value', () => {
        expect(service.register).toBe('real value');
      });
});
