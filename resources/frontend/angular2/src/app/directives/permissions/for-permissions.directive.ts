import {AfterContentInit, Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserPermissionsService} from "../../services/helpers/permissions/user-permissions.service";


/**
 * Custom directive for handling content visibility based on permissions.
 *
 * Usage Examples:
 *
 * - Show content only to admin users:
 *   <div *forPermission="'is_admin'">foo</div>
 *
 * - Show content only to users with 'add_iap_campaign' scope and access to the current game:
 *   <div *forPermission="'can_add_iap_campaign'">foo</div>
 *
 * - Show content only to users with 'copy_iap_campaign' scope and access to the game with ID 5553:
 *   <div *forPermission="'can_copy_iap_campaign' gameId:5553">foo</div>
 *
 * - Content will be rendered if the user has the 'add_iap_campaign' scope. Not game dependent.
 *   <div *forPermission="'has_add_iap_campaign'">foo</div>
 *
 * The permission string is in the format: 'type_permission'
 */
@Directive({
  selector: '[forPermissions]'
})
export class ForPermissionsDirective implements AfterContentInit{

    private permission: string
    @Input('forPermissions')
    set setPermission(permission: string)
    {
        this.permission = permission;
    }

  constructor(
      private viewContainer: ViewContainerRef,
      private templateRef: TemplateRef<any>,
      private user_permissions_service: UserPermissionsService
  ) {
  }

    ngAfterContentInit(): void
    {
        this.checkPermission().subscribe(p => p ? this.viewContainer.createEmbeddedView(this.templateRef) : this.viewContainer.clear())
    }

    private checkPermission()
    {
        return this.user_permissions_service.hasPermission(this.permission)
    }
}
