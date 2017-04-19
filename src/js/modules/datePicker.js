/**
 * @module calendar
 * @description initialize custom or native date picker
 */

import ua from './ua';
import dateUtils from './dateUtils';
import support from './support';
import Pikaday from './vendor/pikaday';

export default class DatePicker {
    constructor(el) {
        this.el = el;
        this.dateControl = el.querySelector('[name=date]');
        this.pickerIcon = el.querySelector(".textfield__icon_calendar");
        this.clearIcon = el.querySelector(".textfield__icon_clear");
    }

    static useNativeDatePicker() {
        return (support.nativeDatePickerSupported() && (ua.platform.ios || ua.platform.android));
    }

    init() {
        if (!DatePicker.useNativeDatePicker()) {
            this.dateControl.setAttribute("readonly", "readonly");
            this.initCustomDatePicker();
        } else {
            this.dateControl.setAttribute("type", "date");
        }
    }

    setValue(datePicker) {
        this.dateControl.value = dateUtils.formatDate(datePicker.getDate());
        this.pickerIcon.classList.add("textfield__icon_hidden");
        this.clearIcon.classList.remove("textfield__icon_hidden");
    }

    clearValue(datePicker) {
        datePicker.setDate(null);
        this.clearIcon.classList.add("textfield__icon_hidden");
        this.pickerIcon.classList.remove("textfield__icon_hidden");
    }

    initCustomDatePicker() {
        let datePicker = new Pikaday({
            field: this.dateControl,
            firstDay: 1,
            i18n: {
                previousMonth: 'Предыдущий',
                nextMonth: 'Следующий',
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
            },
            onSelect: () => this.setValue(datePicker)
        });

        this.pickerIcon.addEventListener("click", () => datePicker.show());
        this.clearIcon.addEventListener("click", () => this.clearValue(datePicker));
    }
}