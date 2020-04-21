import { FormGroup, FormControl } from "@angular/forms";

/**
* @description Turns the array of key pairs into an object
* @param keyPairs [{[key: string] : any}]
* @returns {}
*/
function transformKeyPairs(keyPairs: [{ [key: string]: any }]): {} {
    let paired = {};
    keyPairs.forEach(element => {
        if (element.key && element.value) {
            paired[element.key] = element.value;
        }
    });
    return paired;
}

/**
 * @description Marks all a formgroup's controls as dirty & touched
 * @param group FormGroup
 */
function MarkFormGroupTouched(group: FormGroup): void {
(<any>Object).values(group.controls).forEach((control: FormControl) => {
    control.markAsDirty();
    control.markAsTouched({ onlySelf: true });
})
}


export { transformKeyPairs, MarkFormGroupTouched }