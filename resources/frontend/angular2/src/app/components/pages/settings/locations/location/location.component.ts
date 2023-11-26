import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SwalService} from "../../../../../services/helpers/swal/swal.service";
import {LocationInterface} from "../../../../../classes/pages/settings/general/location/location.interface";
import {LocationsService} from "../../../../../services/pages/settings/locations.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit
{
    @Input() edit_location: LocationInterface
    @Input() edit: boolean = false
    location: LocationInterface

    constructor(
        private dialogRef: MatDialogRef<any>,
        private locations_service: LocationsService,
        private swal_service: SwalService
    )
    {
    }

    ngOnInit(): void
    {
        if (this.edit_location) {
            this.location = Object.assign({}, this.edit_location)
        }
    }

    public submit()
    {
        if (this.edit) {
            this.locations_service.edit(this.location).subscribe(r => {
                if (r.id) {
                    this.swal_service.success({text: 'Локацията бе обновена!'})
                } else {
                    this.swal_service.error({text: 'Локацията не беше обновена'});
                }
            }, error => {
                this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
            })
        } else {
            this.locations_service.add(this.location).subscribe(result => {
                if (result) {
                    this.location = {
                        'city': '',
                        'post_code': '',
                        'country': '',
                        'address': ''
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
    template: '<mat-dialog-content><location [edit_location]="location" [edit]="edit"></location></mat-dialog-content>',
})
export class LocationDialog
{
    location: LocationInterface
    edit: boolean = false

    constructor(
        // public dialogRef: MatDialogRef<PositionDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {
        this.location = data?.location;
        this.edit = data?.edit;
    }
}
