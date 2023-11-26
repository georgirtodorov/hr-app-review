import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, FormGroupDirective} from "@angular/forms";

// Services //
import {SwalService} from "../../../../../services/helpers/swal/swal.service";
import {PermissionsService} from "../../../../../services/pages/access/permissions/permissions.service";

// Classes //
import {PermissionForm} from "../../../../../classes/pages/access/permissions/permission-form";
import {PermissionInterface} from "../../../../../classes/pages/access/permissions/permission.interface";

@Component({
    selector: 'add-permission',
    templateUrl: './add-permission.component.html',
    styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {

    @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
    public permission: PermissionForm<PermissionInterface>;

    constructor(
        private permissions_service: PermissionsService,
        private swal_service: SwalService,
        private fb: UntypedFormBuilder
    ) {
        this.permission = new PermissionForm<PermissionInterface>(fb);
    }

    ngOnInit(): void {
    }

    public add(): void {
        if (!this.permission.formGroup.valid) {
            this.permission.formGroup.markAllAsTouched();
            return;
        }
        this.permissions_service.add(this.permission.formGroup.getRawValue()).subscribe(result => {
            if (!result) {
                this.swal_service.error({text: 'Грешка'});
                return;
            }
            setTimeout(() => this.formGroupDirective.resetForm(), 200);
            this.swal_service.success({text: `Permission ${result.name} added.`});
        }, error => {
            this.swal_service.error({title: 'Грешка', text: error});
        })
    }
}
