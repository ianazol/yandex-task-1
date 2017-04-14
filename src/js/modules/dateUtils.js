/**
 * @module dateUtils
 * @description Helpers for date formatting
 */

function leadZero(num) {
    return num < 10 ? '0' + num : num;
}

function getTime(date) {
    date.setHours(date.getHours(), date.getMinutes() + date.getTimezoneOffset());
    return leadZero(date.getHours()) + ":" + leadZero(date.getMinutes());
}

function formatDate(date) {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    return [leadZero(day), leadZero(month), year].join('.');
}

export default {getTime, formatDate};