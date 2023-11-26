import {UntypedFormGroup, UntypedFormBuilder, Validators, ValidatorFn, ValidationErrors} from '@angular/forms';

export class UserAccessForm<T> {
    public formGroup: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {
        this.formGroup = this.fb.group({
            id: ['', Validators.required],
            first_name: ['', null],
            last_name: ['', null],
            email: ['', null],
            roles: [[], null],
            permissions: [[], null],
        }, { validator: this.atLeastOne(Validators.required, ['roles','permissions']) })
    }

    private atLeastOne = (validator: ValidatorFn, controls:string[] = null) => (
        group: UntypedFormGroup,
    ): ValidationErrors | null => {
        if(!controls){
            controls = Object.keys(group.controls)
        }

        const hasAtLeastOne = group && group.controls && controls
            .some(k => !validator(group.controls[k]));

        return hasAtLeastOne ? null : {
            atLeastOne: true,
        };
    };
}
