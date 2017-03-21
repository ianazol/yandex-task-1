import DatePicker from './modules/DatePicker';
import schedule from './modules/schedule';
import Sticky from './modules/sticky';

function filterChangeHandler() {
    let filterValues = {
        school: document.querySelector(".filter select[name=school]").value,
        lecturer: document.querySelector(".filter select[name=lecturer]").value,
        date: document.querySelector(".filter input[name=date]").value
    };
    schedule.filterItems(filterValues);
}

document.addEventListener('DOMContentLoaded', function() {
    let stickyFilter = new Sticky(document.querySelector(".filter"));
    stickyFilter.init();

    let calendar = new DatePicker(document.querySelector(".textfield"));
    calendar.init();

    schedule.init();

    [].forEach.call(
        document.querySelectorAll(".filter__control"),
        element => element.addEventListener("change", filterChangeHandler)
    );

    document.querySelector(".svg-lib").innerHTML = SVG_SPRITE;
});