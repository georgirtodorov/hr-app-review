export type Filters = {
    employee: string[],
    department_name: string [],
    location_city: string[],
    position_names: string[],
    absence_type: string[],
    absence_status: string[]
}

export class CalendarFilter {
    public filters: Filters

    constructor() {
        this.initFilters();
    }

    private initFilters(): void {
        this.filters = {
            employee: [],
            department_name: [],
            location_city: [],
            position_names: [],
            absence_type: [],
            absence_status: []
        }
    }

    public count(): number {
        return this.filters.employee.length + this.filters.department_name.length + this.filters.location_city.length
            + this.filters.position_names.length + this.filters.absence_type.length + this.filters.absence_status.length;
    }

    public isSelected(value: string, key: string): boolean {
        return key in this.filters && this.filters[key].includes(value);
    }

    public updateFilter(value: string, key: string): void {
        //Remove from filters
        if (this.isSelected(value, key)) {
            this.filters[key].splice(this.filters[key].indexOf(value), 1);
            return;
        }

        //Add to filters
        if (key in this.filters) {
            this.filters[key].push(value)
        }
    }

    public reset(): void
    {
        this.initFilters();
    }

    public makeFiltering(employees) {
        return employees.filter(employee => {

            const employeeMatch = this.filters.employee.length === 0 || this.filters.employee.includes(employee.id);
            const departmentMatch = this.filters.department_name.length === 0 || this.filters.department_name.includes(employee.department_name);
            const locationMatch = this.filters.location_city.length === 0 || this.filters.location_city.includes(employee.location_city);
            const positionMatch = this.filters.position_names.length === 0 || this.filters.position_names.includes(employee.position_name);

            const absenceMatch = employee.absence_requests.every(absence => {
                const typeMatch = this.filters.absence_type.length === 0 || this.filters.absence_type.includes(absence.type_name);
                const statusMatch = this.filters.absence_status.length === 0 || this.filters.absence_status.map(status => status.toUpperCase()).includes(absence.approval);
                return typeMatch && statusMatch;
            });

            return employeeMatch && departmentMatch && locationMatch && positionMatch && absenceMatch;
        });
    }

    public isBlank()
    {
        return Object.values(this.filters).every((filter) => filter.length === 0);
    }
}
