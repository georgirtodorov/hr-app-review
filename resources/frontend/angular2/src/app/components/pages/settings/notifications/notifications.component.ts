import { Component, OnInit } from '@angular/core';
import {
    AbsenceActionsInterface
} from "../../../../classes/pages/settings/notifications/absence-actions.interface";
import {EmployeesService} from "../../../../services/pages/employees/employees.service";
import {NotificationsService} from "../../../../services/pages/settings/notifications.service";


@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    absence_actions = Object.values(AbsenceActionsInterface);
    employees: any;
    notifications: any;
    departments: any
    absence_requests = 'absence_requests'
  constructor(
      private notifications_service: NotificationsService,
      private employees_service: EmployeesService,
  ) { }

  ngOnInit(): void {
      this.notifications_service.get().subscribe(r => {
          this.notifications = r.absence_requests;
      })

      this.employees_service.getEmployees().subscribe(r => {
          this.employees = r
      })
  }

}
