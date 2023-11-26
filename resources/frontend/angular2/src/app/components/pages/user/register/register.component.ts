import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../../../../services/pages/user/user.service'
import {UserForm} from '../../../../classes/pages/user/user-form';
import {UserRegister} from "../../../../classes/pages/user/user-register-interface";
import {SwalService} from '../../../../services/helpers/swal/swal.service';
import {FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    public user: UserForm<UserRegister>;
    @Output() userRegistered = new EventEmitter<UserRegister>();

    constructor(
        private user_service: UserService,
        private fb: UntypedFormBuilder,
        private swal_service: SwalService,
    ) {
        this.user = new UserForm<UserRegister>(fb);
    }

    ngOnInit(): void {
    }

    public register(): void {
        if (!this.user.formGroup.valid) {
            this.user.formGroup.markAllAsTouched();
            return
        }
        const new_user = this.user.formGroup.getRawValue();
        this.user_service.add(new_user).subscribe(result => {
                if (!result.id) {
                    this.swal_service.error({title: 'Грешка', titleText: result.error});
                    return;
                }
                this.userRegistered.emit(result);
            }, error => {
                const message = Object.values(error).map(innerArray => innerArray[0]).join(", ");
                this.swal_service.error({title: 'Грешка', text: message})
            }
        )
    }
}
