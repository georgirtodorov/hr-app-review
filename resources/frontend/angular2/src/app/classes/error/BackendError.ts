import {HttpErrorResponse} from "@angular/common/http";

export class BackendError
{
    error: string;
    error_id: number | null;
    trace?: any; // You can define the appropriate type for trace

    constructor(response: HttpErrorResponse)
    {
        this.error = response.error.error;
        this.error_id = response.error.error_id;
        if (response.error.trace) {
            this.trace = response.error.trace;
        }
    }

    title(): string
    {
        return this.error_id ? `Incident id: ${this.error_id}` : 'Грешка';
    }

    message(): string
    {
        return this.error;
    }
}
