import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder} from "@angular/forms";

// Services //
import {SwalService} from "../../../../../services/helpers/swal/swal.service";
import {PermissionsService} from "../../../../../services/pages/access/permissions/permissions.service";

// Classes //
import {PermissionForm} from "../../../../../classes/pages/access/permissions/permission-form";
import {PermissionInterface} from "../../../../../classes/pages/access/permissions/permission.interface";

@Component({
    selector: 'edit-permission',
    templateUrl: './edit-permission.component.html',
    styleUrls: ['./edit-permission.component.scss']
})
export class EditPermissionComponent implements OnInit {
    public permission: PermissionForm<PermissionInterface> = new PermissionForm<PermissionInterface>(this.fb);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private permissions_service: PermissionsService,
        private swal_service: SwalService,
        private fb: UntypedFormBuilder,
        public dialogRef: MatDialogRef<EditPermissionComponent>
    ) {
    }

    ngOnInit(): void {
        if (!this.data.permission) {
            this.swal_service.error({text: 'Permission not loaded!'});
            this.dialogRef.close();
        }
        this.permission.formGroup.patchValue({
            id: this.data.permission.id,
            name: this.data.permission.name,
            localized_name: this.data.permission.localized_name,
            localized_description: this.data.permission?.localized_description ?? null,
        });
    }

    public edit(): void {
        if (!this.permission.formGroup.valid) {
            this.permission.formGroup.markAllAsTouched();
            return;
        }
        this.permissions_service.add(this.permission.formGroup.getRawValue()).subscribe(result => {
            if (!result) {
                this.swal_service.error({title: 'Грешка'});
                return;
            }
            this.swal_service.success({text: 'Промените са извършени!'}).then(() =>
                this.dialogRef.close()
            )
        }, error => {
            this.swal_service.error({title: 'Грешка', text: error.error});
        })
    }
}
