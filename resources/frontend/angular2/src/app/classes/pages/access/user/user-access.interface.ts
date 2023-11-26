import {PermissionInterface} from "../permissions/permission.interface";
import {RoleInterface} from "../roles/role.interface";
import {User} from "../../user/user.interface";

export interface UserAccessInterface extends User {
    roles: RoleInterface[],
    permissions: PermissionInterface[]
}
