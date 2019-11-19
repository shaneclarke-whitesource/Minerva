import { AbstractControl } from '@angular/forms';

export const keyPairValidator = (control: AbstractControl): { [key: string]: boolean } => {
    const key = control.get('key').value;
    const val = control.get('value').value;

    if (key && !val) {
        return { valRequired: true }
    }

    if (val && !key) {
        return { keyRequired: true }
    }

    return null;
};