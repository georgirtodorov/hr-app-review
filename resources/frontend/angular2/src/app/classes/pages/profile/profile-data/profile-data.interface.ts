export interface ProfileData {
    id?: number
    user_id : number;
    first_name: string,
    surname: string
    last_name: string,
    email: string;
    personal_phone: string;
    address: string;
    city: string;
    country: string
    work_phone: string;
    pin: string;
    post_code: number;
    position_id : number;
    department_id : number;
    location_id : number;
    supervisors: number[];
    start: Date;
    end_date?: Date;
}
