/**
 * @module support
 * @description Detect some browser feature support
 */

/**
 * Проверить, что поддерживается нативный календарь в input с типом date
 * @returns {boolean}
 */
function nativeDatePickerSupported() {
    let incorrectValue = "not-a-date",
        input = document.createElement("input");

    input.setAttribute("type", "date");
    input.value = incorrectValue;

    return input.value !== incorrectValue;
}

/**
 * Проверить, что поддерживается position:sticky
 * @returns {boolean}
 */
// Thanks Modernizr! https://github.com/phistuck/Modernizr/commit/3fb7217f5f8274e2f11fe6cfeda7cfaf9948a1f5
function stickySupported() {
    let prop = 'position:',
        value = 'sticky',
        el = document.createElement('test'),
        mStyle = el.style;

    mStyle.cssText = prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(value + ';' + prop) + value + ';';

    return mStyle.position.indexOf(value) !== -1;
}

export default {stickySupported, nativeDatePickerSupported};