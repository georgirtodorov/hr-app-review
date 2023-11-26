import {User} from "./user.interface";

export interface UserRegister extends User {
    email_confirmation: string;
    password: string;
    password_confirmation: string;
}
