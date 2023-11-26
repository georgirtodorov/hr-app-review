import { Component, OnInit, ViewChild } from '@angular/core';
import {LocationsService} from '../../../../services/pages/settings/locations.service'
import {trigger, style, animate, transition} from '@angular/animations';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatAccordion} from '@angular/material/expansion';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PositionDialog} from "../positions/position/position.component";
import {LocationDialog} from "./location/location.component";
import {MatDialog} from "@angular/material/dialog";
import {SwalService} from "../../../../services/helpers/swal/swal.service";
import {PositionInterface} from "../../../../classes/pages/settings/general/position/position.interface";
import {Subscription} from "rxjs";
import {LocationInterface} from "../../../../classes/pages/settings/general/location/location.interface";

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: ['../settings.component.scss', './locations.component.scss'],
    animations: [
        trigger(
            'enterFromBottom', [
                transition(':enter', [
                    style({transform: 'translateY(100%)', opacity: 0}),
                    animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateY(0)', opacity: 1}),
                    animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
                ])
            ]
        )
    ]
})
export class LocationsComponent implements OnInit {
    @ViewChild(MatAccordion) accordion: MatAccordion;

    public loading = true;
    public locations = [];
    public location = {
        'city' : '',
        'address' : '',
        'post_code' : '',
        'country' : ''
    };
    private subscriptionUpdate: Subscription;
    private subscriptionAdd: Subscription;
    private subscriptionDelete: Subscription;

  constructor(
      private locations_service: LocationsService,
      private dialog: MatDialog,
      private swal_service: SwalService
  ) { }

  ngOnInit(): void {
      this.get()

      this.subscriptionUpdate = this.locations_service.dataChange.subscribe((location: LocationInterface) => {
          const indexToUpdate = this.locations.findIndex(l => l.id === location.id);
          if (indexToUpdate !== -1) {
              this.locations[indexToUpdate] = location;
              // this.updateTableData();
          } else {
              // this.official_holidays.push(holiday);
              // this.updateTableData();
          }
      });
      this.subscriptionAdd = this.locations_service.dataAdded.subscribe((location: LocationInterface) => {
          if (location.id) {
              this.locations.push(location);
          }
      });
      this.subscriptionDelete = this.locations_service.dataDeleted.subscribe((location: LocationInterface) => {
          if (location.id) {
              const indexToUpdate = this.locations.findIndex(l => l.id === location.id);
              if (indexToUpdate !== -1) {
                  this.locations.splice(indexToUpdate, 1); // Removes 1 element at the specified index
              }
          }
      });
  }
    public get() {
        this.locations_service.get().subscribe(result => {
            this.locations = result;
            this.loading = false
        })
    }

    public add()
    {
        this.locations_service.add(this.location).subscribe(result => {
            if (result) {
                this.location = {
                    'city' : '',
                    'address' : '',
                    'post_code' : '',
                    'country' : ''
                };
                this.swal_service.success({text: 'Локацията е добавена.'})
            } else {
                this.swal_service.error({text: 'Локацията не беше добавена.'})
            }

        }, error => {
            this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
        })
    }

    public delete(id)
    {
        this.locations_service.delete(id).subscribe(result => {
            if (result.id) {
                this.swal_service.success({text: `Локация в град ${result.city} и адрес ${result.address} бе премахната.`})
            } else {
                this.swal_service.error({text: 'Локация не беше премахната.'})
            }
        }, error => {
            this.swal_service.error({title: `${error.title()}`, text: `${error.message()}`});
        })
    }

    public edit(location)
    {
        this.dialog.open(LocationDialog, {
            data: {
                location: location,
                edit: true
            },
        })
    }
}
