import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableListComponent } from '../table-list/table-list.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){
      this.dialog.open(TableListComponent, {
          data: {
          },
          autoFocus: false,
          disableClose: true,
          width: "50vw",
      });

  }
}
