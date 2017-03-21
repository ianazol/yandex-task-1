/**
 * @module schedule
 */

import dateUtils from './dateUtils';
import SCHEDULE_DATA from '../data';

let lectureData = [],
    scheduleContainer;

function onClickHandler(event) {
    if (event.target.classList.contains("schedule-item__lecturer")) {
        $(event.target).siblings(".schedule-lecturer").slideToggle();
    }
}

function prepareLectureData(item) {
    let startDate = new Date(item.start),
        endDate = new Date(item.end),
        today = new Date();

    item.completed = (Date.parse(item.start) < today);
    item.date = dateUtils.formatDate(startDate);
    item.time = dateUtils.getTime(startDate) + ' - ' + dateUtils.getTime(endDate);
    item.schoolList = item.school.map((schoolData) => schoolData.name).join(", ");

    return item;
}

function render(lecture) {
    scheduleContainer.innerHTML = ScheduleApp.templates.schedule.item({items: lecture});
}

function filterItems(filterValues) {
    let filteredLecture = [];

    filterValues.date = filterValues.date ? dateUtils.formatDate(new Date(filterValues.date)) : false;

    lectureData.forEach(function (item) {
        let lecture = $.extend(true, {}, item),
            valid = true;

        for (let key in filterValues) {
            if (filterValues.hasOwnProperty(key) && filterValues[key]) {
                switch (key) {
                    case "date":
                        if (filterValues[key] !== lecture.date) {
                            valid = false;
                        }
                        break;
                    case "school":
                        let result = lecture[key].every((item) => item.id !== filterValues[key]);
                        if (result === true) {
                            valid = false;
                        }
                        break;
                    case "lecturer":
                        if (lecture[key].id !== filterValues[key]) {
                            valid = false;
                        }
                }
            }
        }
        if (valid) {
            filteredLecture.push(lecture);
        }
    });

    render(filteredLecture);
}

function init() {
    scheduleContainer = document.querySelector(".schedule");

    SCHEDULE_DATA.forEach(function (item) {
        let data = $.extend(true, {}, item);
        lectureData.push(prepareLectureData(data));
    });
    render(lectureData);
    scheduleContainer.addEventListener("click", onClickHandler);
}

export default {filterItems, init};