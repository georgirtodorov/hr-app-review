import {Component, Input, OnInit, isDevMode, ViewChild, ElementRef} from '@angular/core';
import {PictureService} from "../../../../services/pages/profile/picture/picture.service";
import {SwalService} from "../../../../services/helpers/swal/swal.service";
import {Employee} from "../../../../classes/pages/Employee";
import {UserPermissionsService} from "../../../../services/helpers/permissions/user-permissions.service";
import {EmployeesService} from "../../../../services/pages/employees/employees.service";


@Component({
    selector: 'picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit
{
    @ViewChild('addPic') addPic: ElementRef<HTMLElement>;
    @Input() employee: Employee

    ASSETS_PATH: string = '/test/hr-app/public/assets/angular/assets/'
    selectedFile: File | null = null;

    private canChangeProfilePicture: boolean = false;
    private canChangeProfilePicturesGlobal: boolean = false;
    private loggedEmployee: Employee;

    constructor(
        private picture_service: PictureService,
        private swal_service: SwalService,
        private employee_service: EmployeesService,
        private user_permissions: UserPermissionsService)
    {
    }


    ngOnInit(): void
    {
        if (isDevMode()) {
            this.ASSETS_PATH = '/assets/'
        }
        this.getCurrentEmployee();
        this.checkPermissions();
    }

    addPicture()
    {
        this.addPic.nativeElement.click()
    }

    // Add this method to handle file selection
    onFileSelected(event: any)
    {
        this.selectedFile = event.target.files[0] as File;
        this.swal_service.loader()
        setTimeout(() => {
            this.onUpload()
        }, 100)
    }

    onUpload(): void
    {
        if (this.selectedFile && this.employee.id) {
            this.picture_service.add(this.employee.id, this.selectedFile).subscribe(
                (response) => {
                    // Handle successful upload
                    if (response.success) {
                        window.location.reload();
                    }
                },
                (error) => {
                    // Handle error
                    this.swal_service.error({titleText: 'Picture was not changed'})
                }
            );
        } else {
            this.swal_service.error({titleText: 'No employee or file'})
        }
    }

    private getCurrentEmployee()
    {
        this.employee_service.getEmployee().subscribe(r => this.loggedEmployee = r)
    }

    public canChangePicture(employee_id): boolean
    {
        if (this.canChangeProfilePicturesGlobal) {
            return true;
        }
        return employee_id === this.loggedEmployee?.id && this.canChangeProfilePicture;

    }

    private checkPermissions()
    {
        this.user_permissions.hasPermission('can_change_profile_pictures_global').subscribe(r => this.canChangeProfilePicturesGlobal = r)
        this.user_permissions.hasPermission('can_change_profile_picture').subscribe(r => this.canChangeProfilePicture = r)
    }

}
