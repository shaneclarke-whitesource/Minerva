import { async } from '@angular/core/testing';
import { transformKeyPairs, MarkFormGroupTouched } from './utils'
import { FormBuilder, FormGroup } from '@angular/forms';


describe('transformKeyPairs', () => {
    let testKeyArray;
    let form: FormGroup;
    const formBuilder: FormBuilder = new FormBuilder();
    beforeEach(async(() => {
        testKeyArray = [
            { key: 'ping', value: '127.0.1.1' },
            { key: 'os', value: 'linux' },
            { key: 'prod', value: 'false' }
        ];
        form = formBuilder.group({
            name: [''],
            type: [''],
            enabled: [''],
        });
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

    it('should mark all createMonitorForm controls as touched', () => {
        expect(form.controls['name'].touched).toEqual(false);
        expect(form.controls['name'].dirty).toEqual(false);
        expect(form.controls['type'].touched).toEqual(false);
        expect(form.controls['type'].dirty).toEqual(false);
        expect(form.controls['enabled'].touched).toEqual(false);
        expect(form.controls['enabled'].dirty).toEqual(false);
        MarkFormGroupTouched(form);
        expect(form.controls['name'].touched).toEqual(true);
        expect(form.controls['name'].dirty).toEqual(true);
        expect(form.controls['type'].touched).toEqual(true);
        expect(form.controls['type'].dirty).toEqual(true);
        expect(form.controls['enabled'].touched).toEqual(true);
        expect(form.controls['enabled'].dirty).toEqual(true);
    });


});