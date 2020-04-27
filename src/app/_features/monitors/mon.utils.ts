import {
    CreateMonitor
} from 'src/app/_models/salus.monitor'
import { FieldConfig, Validator } from './interfaces/field.interface';
import { Validators } from '@angular/forms';

/**
 *
 * @param monitor a monitor based on schema type
 * @returns FieldConfig[]
 */
function CreateMonitorConfig(monitor: any): FieldConfig[] {
    let fields: FieldConfig[] = [];
    for (const field in monitor.properties) {
        if (field === "type") {
            continue;
        }
        const config: FieldConfig = createField(monitor, field);
        fields.push(config);
    }
    return fields;
}

function ParseMonitorTypeEnum(monitor: any): string {
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
function createField(monitor, fieldName): FieldConfig  {

    let field = monitor.properties[fieldName];
    let defaultValue = (): string | null => {
        let value;
        if(field.hasOwnProperty('default')) {
            value = field.default;
        }
        return value || null;
    };

    let validators = (): Validator[] | null => {
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

    let type = (): string | null => {
        let _type;
        switch (true) {
            case field.type === 'boolean':
                _type = "checkbox";
                break;
            case field.type === 'string' || field.type === 'integer':
                _type = "input";
                break;
            default:
                // TODO: Add error service connect
                break;
        }
        return _type || null;
    }

    let inputType = (): string | null => {
        let _inputType;
        if (field.type === "string") {
            _inputType = 'text';
        }
        return _inputType || null;
    }

    let label = () => {
        let _label = fieldName;
        return _label;
    }

    return {
        type: type(),
        ...(label() && {label: label(), name: label()}),
        ...(inputType() && {inputType: inputType()}),
        ...(defaultValue() && {value: defaultValue()}),
        ...(validators() && {validations: validators()})
    };
}

export { CreateMonitorConfig, ParseMonitorTypeEnum }
