export enum AbsenceRequestApprovalStatus {
    NOT_NEED = 'NOT_NEED',
    WAITING = 'WAITING',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED'
}

export interface AbsenceRequestInterface {
    id?: number;
    employee_id: number;
    type_id: number;
    start_date: Date;
    end_date: Date;
    created_at?: Date;
    days: number;
    approval: AbsenceRequestApprovalStatus;
}
