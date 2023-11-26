export class CalendarController {
    public today = new Date();
    public start_date: Date
    public end_date: Date
    public prev_start_date: Date
    public prev_end_date: Date
    public next_start_date: Date
    public next_end_date: Date

    constructor() {
        this.initCalendarDays();
    }
    initCalendarDays() {
        this.start_date = new Date(this.today);
        this.end_date = new Date(this.start_date);
        this.end_date.setMonth(this.start_date.getMonth() + 1);

        this.prev_start_date = new Date(this.start_date);
        this.prev_end_date = new Date(this.end_date);
        this.next_start_date = new Date(this.start_date);
        this.next_end_date = new Date(this.end_date);
        this.calcPrevNextDates()
    }

    calcPrevNextDates() {
        this.prev_start_date = new Date(this.start_date);
        this.prev_start_date.setMonth(this.start_date.getMonth() - 1);

        this.prev_end_date = new Date(this.end_date);
        this.prev_end_date.setMonth(this.end_date.getMonth() - 1);

        this.next_start_date = new Date(this.start_date);
        this.next_start_date.setMonth(this.start_date.getMonth() + 1);

        this.next_end_date = new Date(this.end_date);
        this.next_end_date.setMonth(this.end_date.getMonth() + 1);
    }

    prevMonth() {
        this.start_date = new Date(this.prev_start_date);
        this.end_date = new Date(this.prev_end_date);
        this.calcPrevNextDates();
        // this.generateCalendar();
    }

    nextMonth() {
        this.start_date = new Date(this.next_start_date);
        this.end_date = new Date(this.next_end_date);
        this.calcPrevNextDates();
        // this.generateCalendar();
    }

    restartCalendar() {
        this.initCalendarDays();
        // this.generateCalendar();
        this.calcPrevNextDates();
    }
}
