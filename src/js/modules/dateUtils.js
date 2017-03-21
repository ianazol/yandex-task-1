/**
 * @module dateUtils
 * @description Helpers for date formatting
 */

function leadZero(num) {
    return num < 10 ? '0' + num : num;
}

function getTime(date) {
    return leadZero(date.getUTCHours()) + ":" + leadZero(date.getUTCMinutes());
}

function formatDate(date) {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    return [leadZero(day), leadZero(month), year].join('.');
}

export default {getTime, formatDate};