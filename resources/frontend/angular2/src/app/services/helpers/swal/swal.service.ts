import { Injectable } from '@angular/core';
import { extend } from '../../../functions/extend';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SwalService
{

    constructor() { }

    public loader(options: SweetAlertOptions = {}): typeof Swal
    {
        const loader = Swal.mixin(extend({
            title: "Loading...",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => Swal.showLoading(),

        } as SweetAlertOptions, options));

        loader.fire();
        return loader;
    }

    public confirm(options: SweetAlertOptions):Promise<SweetAlertResult<any>>
    {
        return Swal.fire(extend({
            icon: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Да, продължи",
            cancelButtonText: "Откажи",
            confirmButtonColor: "#DD6B55",
            reverseButtons: true,
            allowOutsideClick: false,
            width: "40vw",
        } as SweetAlertOptions, options));
    }

    public success(options: SweetAlertOptions): Promise<SweetAlertResult<any>>
    {
        return Swal.fire(extend({
            icon: "success",
            title: "Success!"
        }, options));
    }

    public warn(options:SweetAlertOptions):Promise<SweetAlertResult<any>>
    {
        return Swal.fire(extend({
            icon: "warning",
        }, options));
    }

    public error(options: SweetAlertOptions): Promise<SweetAlertResult<any>>
    {
        return Swal.fire(extend({
            icon: "error",
            title: "There was an error!"
        }, options));
    }
}
