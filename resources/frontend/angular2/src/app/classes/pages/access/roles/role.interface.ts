import {PermissionInterface} from "../permissions/permission.interface";
import {User} from "../../user/user.interface";

export interface RoleInterface {
    id?: number,
    name: string,
    permissions?: PermissionInterface[];
    users?: User[];
}
