import { async } from '@angular/core/testing';
import { transformKeyPairs } from './utils'

describe('transformKeyPairs', () => {
    let testKeyArray;
    beforeEach(async(() => {
        testKeyArray = [
            { key: 'ping', value: '127.0.1.1' },
            { key: 'os', value: 'linux' },
            { key: 'prod', value: 'false' }
        ]
    }));

    it('should create utility', () => {
        expect(transformKeyPairs).toBeTruthy();
    });

    it('should transform an array of key value pairings', () => {
        expect(transformKeyPairs(testKeyArray)).toEqual({
            'ping': '127.0.1.1',
            'os': 'linux',
            'prod': 'false'
        });
    });

});