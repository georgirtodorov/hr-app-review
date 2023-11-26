import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, FormGroupDirective} from "@angular/forms";

// Services //
import {SwalService} from "../../../../../services/helpers/swal/swal.service";
import {RolesService} from "../../../../../services/pages/access/roles/roles.service";

// Classes //
import {PermissionInterface} from "../../../../../classes/pages/access/permissions/permission.interface";
import {RoleForm} from "../../../../../classes/pages/access/roles/role-form";
import {RoleInterface} from "../../../../../classes/pages/access/roles/role.interface";

@Component({
    selector: 'add-role',
    templateUrl: './add-role.component.html',
    styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
    @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
    @Input() permissions: PermissionInterface[];
    public role: RoleForm<RoleInterface> = new RoleForm<RoleInterface>(this.fb);

    constructor(
        private roles_service: RolesService,
        private swal_service: SwalService,
        private fb: UntypedFormBuilder,
    ) {
    }

    ngOnInit(): void {
    }

    public add(): void {
        if (!this.role.formGroup.valid) {
            this.role.formGroup.markAllAsTouched();
            return;
        }
        this.roles_service.add(this.role.formGroup.getRawValue()).subscribe(result => {
            if (!result) {
                this.swal_service.error({text: 'Грешка'});
                return;
            }
            setTimeout(() => this.formGroupDirective.resetForm(), 200);
            this.swal_service.success({text: `Role ${result.name} added.`});
        })
    }
}
