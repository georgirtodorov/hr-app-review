import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PositionsService} from "../../../../../services/pages/settings/positions.service";
import {PositionInterface} from "../../../../../classes/pages/settings/general/position/position.interface";
import {SwalService} from "../../../../../services/helpers/swal/swal.service";

@Component({
    selector: 'position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit
{
    @Input() edit_position: PositionInterface
    @Input() edit: boolean = false
    position: PositionInterface

    constructor(
        private dialogRef: MatDialogRef<any>,
        private positions_service: PositionsService,
        private swal_service: SwalService
    )
    {
    }

    ngOnInit(): void
    {
        if (this.edit_position) {
            this.position = Object.assign({}, this.edit_position)
        }
    }

    public submit()
    {
        if (this.edit) {
            this.positions_service.edit(this.position).subscribe(r => {
                if (r.id) {
                    this.swal_service.success({text: 'Позицията бе обновена!'})
                } else {
                    this.swal_service.error({text: 'Позицията не беше обновена'});
                }
            }, error => {
                this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
            })
        } else {
            this.positions_service.add(this.position).subscribe(result => {
                if (result) {
                    this.position = {
                        'name': '',
                        'job_description': ''
                    };
                }
            })
        }
    }

    close()
    {
        this.dialogRef.close();
    }

}

@Component({
    template: '<mat-dialog-content><position [edit_position]="position" [edit]="edit"></position></mat-dialog-content>',
})
export class PositionDialog
{
    position: PositionInterface
    edit: boolean = false

    constructor(
        // public dialogRef: MatDialogRef<PositionDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {
        this.position = data?.position;
        this.edit = data?.edit;
    }
}
