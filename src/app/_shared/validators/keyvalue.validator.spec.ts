import { async } from '@angular/core/testing';
import { keyPairValidator } from './keyvalue.validator';

describe('keyPairValidator', () => {
    let keyPairControl;
    beforeEach(async(() => {
        keyPairControl = (key: string, value: string) => ({
            get: (field: string) => {
                switch (field) {
                    case 'key':
                        return { value: key };
                    case 'value':
                        return { value: value };
                }
            }
        })
    }));

    it('should create validator', () => {
        expect(keyPairValidator).toBeTruthy();
    });

    it('should validate key pair', () => {
        expect(keyPairValidator(keyPairControl('stuff', 'whatever'))).toEqual(null);
    });

    it('should invalidate missing key', () => {
        expect(keyPairValidator(keyPairControl('', 'whatever'))).toEqual({ keyRequired: true });
    });

    it('should invalidate missing value', () => {
        expect(keyPairValidator(keyPairControl('stuff', ''))).toEqual({ valRequired: true });
    });

});