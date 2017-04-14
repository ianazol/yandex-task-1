/**
 * @module schedule
 */

import dateUtils from './dateUtils';
import SCHEDULE_DATA from '../data';

let lectures = [];

function onClickHandler(event) {
    if (event.target.classList.contains("schedule-item__lecturer")) {
        showLecturerDetail(event.target.nextElementSibling);
    }
}

function showLecturerDetail(element) {
    $(element).slideToggle();
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

function render(lectures) {
    document.querySelector(".schedule").innerHTML = getScheduleHtml(lectures);
}

function filterLectures(filterValues) {
    let filteredLecture = [];

    filterValues.date = filterValues.date ? dateUtils.formatDate(new Date(filterValues.date)) : false;

    lectures.forEach(function (item) {
        let lecture = $.extend(true, {}, item),
            valid = true;

        for (let key in filterValues) {
            if (filterValues.hasOwnProperty(key) && filterValues[key]) {
                switch (key) {
                    case "date":
                        if (filterValues["date"] !== lecture.date) {
                            valid = false;
                        }
                        break;
                    case "school":
                        let result = lecture["school"].every((school) => school.id !== filterValues["school"]);
                        if (result === true) {
                            valid = false;
                        }
                        break;
                    case "lecturer":
                        if (lecture["lecturer"].id !== filterValues["lecturer"]) {
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
    //prepare lectures data for render
    SCHEDULE_DATA.forEach(function (item) {
        let data = $.extend(true, {}, item);
        lectures.push(prepareLectureData(data));
    });
    render(lectures);

    document.querySelector(".schedule").addEventListener("click", onClickHandler);
}

function getLinksHtml(links) {
    return `
        <div class="schedule-item__materials">
            ${links.map((link) => `<a class="btn" href="${link.link}">${link.name}</a>`).join("")}
        </div>
    `;
}

function getScheduleHtml(items) {
    return items.reduce((acc, item) => acc + `
        <div class="schedule-item ${item.completed ? 'schedule-item_completed' : ''}">
            <div class="schedule-item__wrap">
                <h2 class="schedule-item__title">${item.title}</h2>
                <span class="schedule-item__date">${item.date} (${item.time})</span>
                <ul class="schedule-item__info">
                    <li>
                        <span class="schedule-item__info-title">Место:</span>
                        ${item.place}
                    </li>
                    <li>
                        <span class="schedule-item__info-title">Лектор:</span>
                        <span class="schedule-item__lecturer">${item.lecturer.name}</span>
                        <div class="schedule-lecturer">
                            <div class="schedule-lecturer__wrap">
                                <div class="schedule-lecturer__photo">
                                    <img src="${item.lecturer.photo['1x']}" srcset="${item.lecturer.photo['2x']} 2x" alt="${item.lecturer.name}" />
                                </div>
                                <div class="schedule-lecturer__text">
                                    ${item.lecturer.description}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span class="schedule-item__info-title">Школа:</span>
                        ${item.schoolList}
                    </li>
                </ul>
                ${item.links.length > 0 ? getLinksHtml(item.links) : ''}
            </div>
        </div>
    `, '');
}

export default {filterLectures, init};