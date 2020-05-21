import {
    CreateMonitor
} from 'src/app/_models/salus.monitor'
import { FieldConfig, Validator } from './interfaces/field.interface';
import { Validators } from '@angular/forms';


export class MonotorUtil{
/**
 *
 * @param monitor a monitor based on schema type
 * @returns FieldConfig[]
 */
 static CreateMonitorConfig(monitor: any): FieldConfig[] {
    let fields: FieldConfig[] = [];
    for (const field in monitor.properties) {
        if (field === "type") {
            continue;
        }
        const config: FieldConfig = MonotorUtil.createField(monitor, field);
        fields.push(config);
    }
    return fields;
}

static ParseMonitorTypeEnum(monitor: any): string {
    let type: string;
    for (const field in monitor.properties) {
        if (field === "type") {
            type = monitor.properties[field].enum[0];
            break;
        }
    }
    return type;
}

/**
 *
 * @param monitor a monitor based on schema type
 * @param fieldName name of field of monitor.properties
 */
 static createField(monitor, fieldName): FieldConfig  {

    let field = monitor.properties[fieldName];


    let label = () => {
        let _label = fieldName;
        return _label;
    }

    return {
        type: MonotorUtil.type(field),
        ...(label() && {label: label(), name: label()}),
        ...(MonotorUtil.inputType(field) && {inputType: MonotorUtil.inputType(field)}),
        ...(MonotorUtil.defaultValue(field) && {value: MonotorUtil.defaultValue(field)}),
        ...(MonotorUtil.validators(monitor,field,fieldName) && {validations: MonotorUtil.validators(monitor,field,fieldName)}),
        ...(MonotorUtil.options(field)&& {options:MonotorUtil.options(field)})
    };
}
static options(field){
    if (field.type === "string" && field.hasOwnProperty('enum')){
        return field.enum;
    }
    return null;
}
 static defaultValue(field): string | null {
    let value;
    if(field.hasOwnProperty('default')) {
        value = field.default;
    }
    return value || null;
};

 static inputType (field): string | null {
    let _inputType;
    if (field.type === "string") {
        _inputType = 'text';
    }
    if(field.type ==="integer"){
        _inputType="number";
    }

    if(field.type === "string" && field.hasOwnProperty('format')) {
        if (field.format === "date-time") {
            _inputType = "number";
        }
    }
    return _inputType || null;
}
    static type(field): string | null {
        let _type;
        switch (true) {
            case field.type === 'string' && field.hasOwnProperty('enum'):
                _type = "select";
                break;
            case field.type === 'boolean':
                _type = "checkbox";
                break;
            case field.type === 'string':
            case field.type === 'integer':
                _type = "input";
                break;
            default:
                throw `Field type ${field.type}  don't support`;
        }
        return _type || null;
    }

 static validators (monitor,field,fieldName): Validator[] | null  {
    let vals = [];
    // apply any required validators
    if (monitor.required.includes(fieldName)) {
        vals.push({
            name: "required",
            validator: Validators.required,
            message: `${fieldName} Required`
        })
    }

    // apply any pattern validators
    if (field.type === "string" && field.hasOwnProperty('pattern')) {
        vals.push({
            name: "pattern",
            validator: Validators.pattern(field.pattern),
            message: `${fieldName} format incorrect`
        });
    }

    // apply any minimum validators
    if (field.type === "string" && field.hasOwnProperty('minLength')) {
        vals.push({
            name: "minimum",
            validator: Validators.minLength(parseInt(field.minLength)),
            message: `${fieldName} must be at least ${field.minLength} character(s)`
        })
    }
    return vals.length > 0 ? vals : null;
}

}

// export { CreateMonitorConfig, ParseMonitorTypeEnum }
