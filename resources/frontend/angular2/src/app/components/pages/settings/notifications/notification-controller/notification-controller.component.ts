import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {NotificationsService} from "../../../../../services/pages/settings/notifications.service";
import {
    NotificationSettingsInterface
} from "../../../../../classes/pages/settings/notifications/notification-settings.interface";
import {Employee} from "../../../../../classes/pages/Employee";
import {SwalService} from "../../../../../services/helpers/swal/swal.service";
import {
    AbsenceActionMapper,
} from "../../../../../classes/pages/settings/notifications/absence-actions.interface";
import {Department} from "../../departments/departments.component";

@Component({
    selector: 'notification-controller',
    templateUrl: './notification-controller.component.html',
    styleUrls: ['./notification-controller.component.scss']
})
export class NotificationControllerComponent implements OnInit
{
    @Input() action: string
    @Input() notification_list: NotificationSettingsInterface[];
    @Input() employees: Employee[]
    @Input() category: string

    AbsenceActionMapper = AbsenceActionMapper;
    settingsControl = new FormControl()

    filteredEmployees: Employee[] = [];

    constructor(
        private notifications_service: NotificationsService,
        private swal_service: SwalService,
    )
    {
    }

    ngOnInit(): void
    {
        this.settingsControl.valueChanges.subscribe(value => {
            this.filteredEmployees = this.filterEmployees(value);
        });



        setTimeout(() => {
            this.initEmployeeSelector();
        }, 1000); // 1 second delay
    }

    private initEmployeeSelector()
    {
        if (!this.notification_list) {
            this.filteredEmployees = [...this.employees];
        } else {
            this.filteredEmployees = this.employees.filter(employee =>
                !this.notification_list.some(item => item.email.toLowerCase() === employee.email.toLowerCase())
            );
        }
    }

    filterEmployees(value: string): any[]
    {
        if (typeof value !== "string") {
            return [];
        }
        const filterValue = value.toLowerCase();
        if (this.notification_list) {
            return this.employees.filter(employee =>
                (
                    employee.first_name.toLowerCase() + ' ' +
                    employee.last_name.toLowerCase() + ' ' +
                    employee.email.toLowerCase()).includes(filterValue)
            ).filter(employee =>
                !this.notification_list.some(item => item.email.toLowerCase() === employee.email.toLowerCase())
            );
        } else {
            return this.employees.filter(employee =>
                (
                    employee.first_name.toLowerCase() + ' ' +
                    employee.last_name.toLowerCase() + ' ' +
                    employee.email.toLowerCase()).includes(filterValue)
            );
        }

    }

    add(event: MatAutocompleteSelectedEvent): void
    {
        this.settingsControl.setValue('')

        const employee = event.option.value;
        this.cleanUpFilteredEmployeesDropdown(employee);

        const newSettings = this.setNotificationSettings(employee)

        this.notification_list ??= [];
        this.notification_list.push(newSettings);

        this.notifications_service.add(this.category, this.action, event.option.value.email).subscribe(result => {
            if (result && result.id) {
                // Update the item in notification_list with the received id
                const index = this.notification_list.indexOf(newSettings);
                if (index !== -1) {
                    this.notification_list[index].id = result.id;
                }
            } else {
                // Request didn't return a valid response, remove the item
                this.swal_service.error({text: 'Contact cannot be added.'})
                this.filteredEmployees.push(employee);
                this.remove(newSettings);
            }
        }, error => {
            this.swal_service.error({text: error.error.error})
            this.filteredEmployees.push(employee);
        })
    }

    private setNotificationSettings(employee: Employee): NotificationSettingsInterface
    {
        return {
            employee_id: employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
        };
    }

    private cleanUpFilteredEmployeesDropdown(employee: Employee): void
    {
        const filteredEmployeeIndex = this.filteredEmployees.indexOf(employee);
        if (filteredEmployeeIndex !== -1) {
            this.filteredEmployees.splice(filteredEmployeeIndex, 1);
        }
    }

    remove(item: NotificationSettingsInterface)
    {
        const index = this.notification_list.indexOf(item);

        this.notifications_service.delete(item.id).subscribe(result => {
            if (result) {
                this.notification_list.splice(index, 1);
            } else {
                // Request didn't return a valid response, dont remove the item
                this.swal_service.error({text: 'Contact cannot be removed.'})
            }
        }, error => {
            this.swal_service.error({text: error.error.error})
        })
    }
}
