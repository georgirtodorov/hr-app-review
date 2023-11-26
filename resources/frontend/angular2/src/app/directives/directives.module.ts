import {NgModule} from '@angular/core';
import {ForPermissionsDirective} from "./permissions/for-permissions.directive";

@NgModule({
    imports: [],
    declarations: [
        ForPermissionsDirective
    ],
    exports: [
        ForPermissionsDirective
    ],
})
export class DirectivesModule {
}
