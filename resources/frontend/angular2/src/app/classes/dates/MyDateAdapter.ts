import {NativeDateAdapter} from "@angular/material/core";


export class MyDateAdapter extends NativeDateAdapter {

    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        if (style === 'long') {
            return [
                'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври',
                'Ноември', 'Декември'
            ];
        } else if (style === 'short') {
            return [
                'Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'
            ]
        }
        return [
            'Я', 'Ф', 'М', 'А', 'М', 'Ю', 'Ю', 'А', 'С', 'О', 'Н', 'Д'
        ]
    }

    format(date: Date, displayFormat: Object): string {
        if (displayFormat != 'LL') {
            console.log(date)
            console.log(displayFormat)
        }
        if (displayFormat === 'MMMM YYYY') {
            console.log('here')
            return `${this.getMonthNames('long')[date.getMonth()]}`;
        }

        if (displayFormat === 'MMM YYYY') {
            return `${this.getMonthNames('long')[date.getMonth()]} ${date.getFullYear()}`;
        }
        if (displayFormat == "input") {
            return `${date.getDate()} ${this.getMonthNames('long')[date.getMonth()]} ${date.getFullYear()}`;
        } else {
            return `${date.getDate()} ${this.getMonthNames('long')[date.getMonth()]} ${date.getFullYear()}`;
        }
    }
}


// format(date: Date, displayFormat: Object): string {
//     if (displayFormat === 'input') {
//         return `${date.getDate()} ${this.getMonthNames('long')[date.getMonth()]} ${date.getFullYear()}`;
//     } else if (displayFormat === 'MMMM YYYY') {
//         return `${this.getMonthNames('long')[date.getMonth()]} ${date.getFullYear()}`;
//     } else {
//         return super.format(date, displayFormat);
//     }
// }
