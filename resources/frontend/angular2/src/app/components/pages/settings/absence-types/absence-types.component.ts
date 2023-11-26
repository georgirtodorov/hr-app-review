import {Component, OnInit, ViewChild} from '@angular/core';
import {AbsenceTypesService} from '../../../../services/pages/settings/absence-types.service';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatAccordion} from '@angular/material/expansion';

@Component({
    selector: 'absence-types',
    templateUrl: './absence-types.component.html',
    styleUrls: ['../settings.component.scss', './absence-types.component.scss']
})
export class AbsenceTypesComponent implements OnInit {
    @ViewChild(MatAccordion) accordion: MatAccordion;

    public loading = true;
    public absence_types = [];
    public absence_type = {
        'name' : '',
        'details' : '',
        'annual_limit' : '',
        'duration_limit' : '',
        'transferable' : '',
        'transferable_amount' : '',
        'estimate_cost' : '',
        'approval' : ''
    };

    constructor(
        private absence_types_service: AbsenceTypesService,
    ) {
    }

    ngOnInit(): void {
        this.get();
    }

    public get() {
        this.absence_types_service.get().subscribe(result => {
            this.absence_types = result;
            this.loading = false
        })
    }

    public add() {
        this.absence_types_service.add(this.absence_type).subscribe(result => {
            if (result){
                this.get()
                this.absence_type = {
                    'name' : '',
                    'details' : '',
                    'annual_limit' : '',
                    'duration_limit' : '',
                    'transferable' : '',
                    'transferable_amount' : '',
                    'estimate_cost' : '',
                    'approval' : ''
                };
            }
        })
    }

    public delete(id) {
        this.absence_types_service.delete(id).subscribe(result => {
            if (result){
                this.get()
            }
        })
    }

    public edit() {

    }
}
