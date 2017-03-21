/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _DatePicker = __webpack_require__(1);

	var _DatePicker2 = _interopRequireDefault(_DatePicker);

	var _schedule = __webpack_require__(6);

	var _schedule2 = _interopRequireDefault(_schedule);

	var _sticky = __webpack_require__(8);

	var _sticky2 = _interopRequireDefault(_sticky);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function filterChangeHandler() {
	    var filterValues = {
	        school: document.querySelector(".filter select[name=school]").value,
	        lecturer: document.querySelector(".filter select[name=lecturer]").value,
	        date: document.querySelector(".filter input[name=date]").value
	    };
	    _schedule2.default.filterItems(filterValues);
	}

	document.addEventListener('DOMContentLoaded', function () {
	    var stickyFilter = new _sticky2.default(document.querySelector(".filter"));
	    stickyFilter.init();

	    var calendar = new _DatePicker2.default(document.querySelector(".textfield"));
	    calendar.init();

	    _schedule2.default.init();

	    [].forEach.call(document.querySelectorAll(".filter__control"), function (element) {
	        return element.addEventListener("change", filterChangeHandler);
	    });

	    document.querySelector(".svg-lib").innerHTML = SVG_SPRITE;
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module calendar
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @description initialize custom or native date picker
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _ua = __webpack_require__(2);

	var _ua2 = _interopRequireDefault(_ua);

	var _dateUtils = __webpack_require__(3);

	var _dateUtils2 = _interopRequireDefault(_dateUtils);

	var _pikaday = __webpack_require__(4);

	var _pikaday2 = _interopRequireDefault(_pikaday);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function isNativeDateSupport() {
	    var incorrectValue = "not-a-date",
	        input = document.createElement("input");

	    input.setAttribute("type", "date");
	    input.value = incorrectValue;

	    return input.value !== incorrectValue;
	}

	function useNativeDatePicker() {
	    return isNativeDateSupport() && (_ua2.default.platform.ios || _ua2.default.platform.android);
	}

	var DatePicker = function () {
	    function DatePicker(el) {
	        _classCallCheck(this, DatePicker);

	        this.el = el;
	        this.dateControl = el.querySelector('[name=date]');
	        this.pickerIcon = el.querySelector(".textfield__icon_calendar");
	        this.clearIcon = el.querySelector(".textfield__icon_clear");
	    }

	    _createClass(DatePicker, [{
	        key: 'init',
	        value: function init() {
	            if (!useNativeDatePicker()) {
	                this.dateControl.setAttribute("readonly", "readonly");
	                this.initCustomDatePicker();
	            } else {
	                this.dateControl.setAttribute("type", "date");
	            }
	        }
	    }, {
	        key: 'setValue',
	        value: function setValue(datePicker) {
	            this.dateControl.value = _dateUtils2.default.formatDate(datePicker.getDate());
	            this.pickerIcon.classList.add("textfield__icon_hidden");
	            this.clearIcon.classList.remove("textfield__icon_hidden");
	        }
	    }, {
	        key: 'clearValue',
	        value: function clearValue(datePicker) {
	            datePicker.setDate(null);
	            this.clearIcon.classList.add("textfield__icon_hidden");
	            this.pickerIcon.classList.remove("textfield__icon_hidden");
	        }
	    }, {
	        key: 'initCustomDatePicker',
	        value: function initCustomDatePicker() {
	            var _this = this;

	            var datePicker = new _pikaday2.default({
	                field: this.dateControl,
	                firstDay: 1,
	                i18n: {
	                    previousMonth: 'Предыдущий',
	                    nextMonth: 'Следующий',
	                    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	                    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
	                    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
	                },
	                onSelect: function onSelect() {
	                    return _this.setValue(datePicker);
	                }
	            });

	            this.pickerIcon.addEventListener("click", function () {
	                return datePicker.show();
	            });
	            this.clearIcon.addEventListener("click", function () {
	                return _this.clearValue(datePicker);
	            });
	        }
	    }]);

	    return DatePicker;
	}();

		exports.default = DatePicker;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @module ua
	 * @description Detect user platform
	 */

	//thanks https://github.com/bem/bem-core/blob/v4/touch.blocks/ua/ua.js
	var ua = function () {
	    var ua = navigator.userAgent,
	        platform = {},
	        match = void 0;

	    if (match = ua.match(/Android\s+([\d.]+)/)) {
	        platform.android = match[1];
	    } else if (ua.match(/\sHTC[\s_].*AppleWebKit/)) {
	        // фэйковый десктопный UA по умолчанию у некоторых HTC (например, HTC Sensation)
	        platform.android = '2.3';
	    } else if (match = ua.match(/iPhone\sOS\s([\d_]+)/)) {
	        platform.ios = match[1].replace(/_/g, '.');
	    } else if (match = ua.match(/iPad.*OS\s([\d_]+)/)) {
	        platform.ios = match[1].replace(/_/g, '.');
	    } else if (match = ua.match(/Bada\/([\d.]+)/)) {
	        platform.bada = match[1];
	    } else if (match = ua.match(/Windows\sPhone.*\s([\d.]+)/)) {
	        platform.wp = match[1];
	    } else {
	        platform.other = true;
	    }

	    return {
	        platform: platform
	    };
	}();

	exports.default = ua;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	    var year = date.getFullYear(),
	        month = date.getMonth() + 1,
	        day = date.getDate();

	    return [leadZero(day), leadZero(month), year].join('.');
	}

	exports.default = { getTime: getTime, formatDate: formatDate };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * Pikaday
	 *
	 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
	 */

	(function (root, factory) {
	    'use strict';

	    var moment;
	    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	        // CommonJS module
	        // Load moment.js as an optional dependency
	        try {
	            moment = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"moment\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	        } catch (e) {}
	        module.exports = factory(moment);
	    } else if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function (req) {
	            // Load moment.js as an optional dependency
	            var id = 'moment';
	            try {
	                moment = __webpack_require__(5)(id);
	            } catch (e) {}
	            return factory(moment);
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        root.Pikaday = factory(root.moment);
	    }
	})(undefined, function (moment) {
	    'use strict';

	    /**
	     * feature detection and helper functions
	     */

	    var hasMoment = typeof moment === 'function',
	        hasEventListeners = !!window.addEventListener,
	        document = window.document,
	        sto = window.setTimeout,
	        addEvent = function addEvent(el, e, callback, capture) {
	        if (hasEventListeners) {
	            el.addEventListener(e, callback, !!capture);
	        } else {
	            el.attachEvent('on' + e, callback);
	        }
	    },
	        removeEvent = function removeEvent(el, e, callback, capture) {
	        if (hasEventListeners) {
	            el.removeEventListener(e, callback, !!capture);
	        } else {
	            el.detachEvent('on' + e, callback);
	        }
	    },
	        fireEvent = function fireEvent(el, eventName, data) {
	        var ev;

	        if (document.createEvent) {
	            ev = document.createEvent('HTMLEvents');
	            ev.initEvent(eventName, true, false);
	            ev = extend(ev, data);
	            el.dispatchEvent(ev);
	        } else if (document.createEventObject) {
	            ev = document.createEventObject();
	            ev = extend(ev, data);
	            el.fireEvent('on' + eventName, ev);
	        }
	    },
	        trim = function trim(str) {
	        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	    },
	        hasClass = function hasClass(el, cn) {
	        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
	    },
	        addClass = function addClass(el, cn) {
	        if (!hasClass(el, cn)) {
	            el.className = el.className === '' ? cn : el.className + ' ' + cn;
	        }
	    },
	        removeClass = function removeClass(el, cn) {
	        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
	    },
	        isArray = function isArray(obj) {
	        return (/Array/.test(Object.prototype.toString.call(obj))
	        );
	    },
	        isDate = function isDate(obj) {
	        return (/Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime())
	        );
	    },
	        isWeekend = function isWeekend(date) {
	        var day = date.getDay();
	        return day === 0 || day === 6;
	    },
	        isLeapYear = function isLeapYear(year) {
	        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
	        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	    },
	        getDaysInMonth = function getDaysInMonth(year, month) {
	        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	    },
	        setToStartOfDay = function setToStartOfDay(date) {
	        if (isDate(date)) date.setHours(0, 0, 0, 0);
	    },
	        compareDates = function compareDates(a, b) {
	        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
	        return a.getTime() === b.getTime();
	    },
	        extend = function extend(to, from, overwrite) {
	        var prop, hasProp;
	        for (prop in from) {
	            hasProp = to[prop] !== undefined;
	            if (hasProp && _typeof(from[prop]) === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
	                if (isDate(from[prop])) {
	                    if (overwrite) {
	                        to[prop] = new Date(from[prop].getTime());
	                    }
	                } else if (isArray(from[prop])) {
	                    if (overwrite) {
	                        to[prop] = from[prop].slice(0);
	                    }
	                } else {
	                    to[prop] = extend({}, from[prop], overwrite);
	                }
	            } else if (overwrite || !hasProp) {
	                to[prop] = from[prop];
	            }
	        }
	        return to;
	    },
	        adjustCalendar = function adjustCalendar(calendar) {
	        if (calendar.month < 0) {
	            calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
	            calendar.month += 12;
	        }
	        if (calendar.month > 11) {
	            calendar.year += Math.floor(Math.abs(calendar.month) / 12);
	            calendar.month -= 12;
	        }
	        return calendar;
	    },


	    /**
	     * defaults and localisation
	     */
	    defaults = {

	        // bind the picker to a form field
	        field: null,

	        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
	        bound: undefined,

	        // position of the datepicker, relative to the field (default to bottom & left)
	        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
	        position: 'bottom left',

	        // automatically fit in the viewport even if it means repositioning from the position option
	        reposition: true,

	        // the default output format for `.toString()` and `field` value
	        format: 'YYYY-MM-DD',

	        // the initial date to view when first opened
	        defaultDate: null,

	        // make the `defaultDate` the initial selected value
	        setDefaultDate: false,

	        // first day of week (0: Sunday, 1: Monday etc)
	        firstDay: 0,

	        // the default flag for moment's strict date parsing
	        formatStrict: false,

	        // the minimum/earliest date that can be selected
	        minDate: null,
	        // the maximum/latest date that can be selected
	        maxDate: null,

	        // number of years either side, or array of upper/lower range
	        yearRange: 10,

	        // show week numbers at head of row
	        showWeekNumber: false,

	        // used internally (don't config outside)
	        minYear: 0,
	        maxYear: 9999,
	        minMonth: undefined,
	        maxMonth: undefined,

	        startRange: null,
	        endRange: null,

	        isRTL: false,

	        // Additional text to append to the year in the calendar title
	        yearSuffix: '',

	        // Render the month after year in the calendar title
	        showMonthAfterYear: false,

	        // Render days of the calendar grid that fall in the next or previous month
	        showDaysInNextAndPreviousMonths: false,

	        // how many months are visible
	        numberOfMonths: 1,

	        // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
	        // only used for the first display or when a selected date is not visible
	        mainCalendar: 'left',

	        // Specify a DOM element to render the calendar in
	        container: undefined,

	        // Blur field when date is selected
	        blurFieldOnSelect: true,

	        // internationalization
	        i18n: {
	            previousMonth: 'Previous Month',
	            nextMonth: 'Next Month',
	            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	        },

	        // Theme Classname
	        theme: null,

	        // events array
	        events: [],

	        // callback function
	        onSelect: null,
	        onOpen: null,
	        onClose: null,
	        onDraw: null
	    },


	    /**
	     * templating functions to abstract HTML rendering
	     */
	    renderDayName = function renderDayName(opts, day, abbr) {
	        day += opts.firstDay;
	        while (day >= 7) {
	            day -= 7;
	        }
	        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
	    },
	        renderDay = function renderDay(opts) {
	        var arr = [];
	        var ariaSelected = 'false';
	        if (opts.isEmpty) {
	            if (opts.showDaysInNextAndPreviousMonths) {
	                arr.push('is-outside-current-month');
	            } else {
	                return '<td class="is-empty"></td>';
	            }
	        }
	        if (opts.isDisabled) {
	            arr.push('is-disabled');
	        }
	        if (opts.isToday) {
	            arr.push('is-today');
	        }
	        if (opts.isSelected) {
	            arr.push('is-selected');
	            ariaSelected = 'true';
	        }
	        if (opts.hasEvent) {
	            arr.push('has-event');
	        }
	        if (opts.isInRange) {
	            arr.push('is-inrange');
	        }
	        if (opts.isStartRange) {
	            arr.push('is-startrange');
	        }
	        if (opts.isEndRange) {
	            arr.push('is-endrange');
	        }
	        return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' + '<button class="pika-button pika-day" type="button" ' + 'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' + opts.day + '</button>' + '</td>';
	    },
	        renderWeek = function renderWeek(d, m, y) {
	        // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
	        var onejan = new Date(y, 0, 1),
	            weekNum = Math.ceil(((new Date(y, m, d) - onejan) / 86400000 + onejan.getDay() + 1) / 7);
	        return '<td class="pika-week">' + weekNum + '</td>';
	    },
	        renderRow = function renderRow(days, isRTL) {
	        return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
	    },
	        renderBody = function renderBody(rows) {
	        return '<tbody>' + rows.join('') + '</tbody>';
	    },
	        renderHead = function renderHead(opts) {
	        var i,
	            arr = [];
	        if (opts.showWeekNumber) {
	            arr.push('<th></th>');
	        }
	        for (i = 0; i < 7; i++) {
	            arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
	        }
	        return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
	    },
	        renderTitle = function renderTitle(instance, c, year, month, refYear, randId) {
	        var i,
	            j,
	            arr,
	            opts = instance._o,
	            isMinYear = year === opts.minYear,
	            isMaxYear = year === opts.maxYear,
	            html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
	            monthHtml,
	            yearHtml,
	            prev = true,
	            next = true;

	        for (arr = [], i = 0; i < 12; i++) {
	            arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected="selected"' : '') + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled="disabled"' : '') + '>' + opts.i18n.months[i] + '</option>');
	        }

	        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

	        if (isArray(opts.yearRange)) {
	            i = opts.yearRange[0];
	            j = opts.yearRange[1] + 1;
	        } else {
	            i = year - opts.yearRange;
	            j = 1 + year + opts.yearRange;
	        }

	        for (arr = []; i < j && i <= opts.maxYear; i++) {
	            if (i >= opts.minYear) {
	                arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"' : '') + '>' + i + '</option>');
	            }
	        }
	        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

	        if (opts.showMonthAfterYear) {
	            html += yearHtml + monthHtml;
	        } else {
	            html += monthHtml + yearHtml;
	        }

	        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
	            prev = false;
	        }

	        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
	            next = false;
	        }

	        if (c === 0) {
	            html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
	        }
	        if (c === instance._o.numberOfMonths - 1) {
	            html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
	        }

	        return html += '</div>';
	    },
	        renderTable = function renderTable(opts, data, randId) {
	        return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
	    },


	    /**
	     * Pikaday constructor
	     */
	    Pikaday = function Pikaday(options) {
	        var self = this,
	            opts = self.config(options);

	        self._onMouseDown = function (e) {
	            if (!self._v) {
	                return;
	            }
	            e = e || window.event;
	            var target = e.target || e.srcElement;
	            if (!target) {
	                return;
	            }

	            if (!hasClass(target, 'is-disabled')) {
	                if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
	                    self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
	                    if (opts.bound) {
	                        sto(function () {
	                            self.hide();
	                            if (opts.blurFieldOnSelect && opts.field) {
	                                opts.field.blur();
	                            }
	                        }, 100);
	                    }
	                } else if (hasClass(target, 'pika-prev')) {
	                    self.prevMonth();
	                } else if (hasClass(target, 'pika-next')) {
	                    self.nextMonth();
	                }
	            }
	            if (!hasClass(target, 'pika-select')) {
	                // if this is touch event prevent mouse events emulation
	                if (e.preventDefault) {
	                    e.preventDefault();
	                } else {
	                    e.returnValue = false;
	                    return false;
	                }
	            } else {
	                self._c = true;
	            }
	        };

	        self._onChange = function (e) {
	            e = e || window.event;
	            var target = e.target || e.srcElement;
	            if (!target) {
	                return;
	            }
	            if (hasClass(target, 'pika-select-month')) {
	                self.gotoMonth(target.value);
	            } else if (hasClass(target, 'pika-select-year')) {
	                self.gotoYear(target.value);
	            }
	        };

	        self._onKeyChange = function (e) {
	            e = e || window.event;

	            if (self.isVisible()) {

	                switch (e.keyCode) {
	                    case 13:
	                    case 27:
	                        if (opts.field) {
	                            opts.field.blur();
	                        }
	                        break;
	                    case 37:
	                        e.preventDefault();
	                        self.adjustDate('subtract', 1);
	                        break;
	                    case 38:
	                        self.adjustDate('subtract', 7);
	                        break;
	                    case 39:
	                        self.adjustDate('add', 1);
	                        break;
	                    case 40:
	                        self.adjustDate('add', 7);
	                        break;
	                }
	            }
	        };

	        self._onInputChange = function (e) {
	            var date;

	            if (e.firedBy === self) {
	                return;
	            }
	            if (hasMoment) {
	                date = moment(opts.field.value, opts.format, opts.formatStrict);
	                date = date && date.isValid() ? date.toDate() : null;
	            } else {
	                date = new Date(Date.parse(opts.field.value));
	            }
	            if (isDate(date)) {
	                self.setDate(date);
	            }
	            if (!self._v) {
	                self.show();
	            }
	        };

	        self._onInputFocus = function () {
	            self.show();
	        };

	        self._onInputClick = function () {
	            self.show();
	        };

	        self._onInputBlur = function () {
	            // IE allows pika div to gain focus; catch blur the input field
	            var pEl = document.activeElement;
	            do {
	                if (hasClass(pEl, 'pika-single')) {
	                    return;
	                }
	            } while (pEl = pEl.parentNode);

	            if (!self._c) {
	                self._b = sto(function () {
	                    self.hide();
	                }, 50);
	            }
	            self._c = false;
	        };

	        self._onClick = function (e) {
	            e = e || window.event;
	            var target = e.target || e.srcElement,
	                pEl = target;
	            if (!target) {
	                return;
	            }
	            if (!hasEventListeners && hasClass(target, 'pika-select')) {
	                if (!target.onchange) {
	                    target.setAttribute('onchange', 'return;');
	                    addEvent(target, 'change', self._onChange);
	                }
	            }
	            do {
	                if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
	                    return;
	                }
	            } while (pEl = pEl.parentNode);
	            if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
	                self.hide();
	            }
	        };

	        self.el = document.createElement('div');
	        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

	        addEvent(self.el, 'mousedown', self._onMouseDown, true);
	        addEvent(self.el, 'touchend', self._onMouseDown, true);
	        addEvent(self.el, 'change', self._onChange);
	        addEvent(document, 'keydown', self._onKeyChange);

	        if (opts.field) {
	            if (opts.container) {
	                opts.container.appendChild(self.el);
	            } else if (opts.bound) {
	                document.body.appendChild(self.el);
	            } else {
	                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
	            }
	            addEvent(opts.field, 'change', self._onInputChange);

	            if (!opts.defaultDate) {
	                if (hasMoment && opts.field.value) {
	                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
	                } else {
	                    opts.defaultDate = new Date(Date.parse(opts.field.value));
	                }
	                opts.setDefaultDate = true;
	            }
	        }

	        var defDate = opts.defaultDate;

	        if (isDate(defDate)) {
	            if (opts.setDefaultDate) {
	                self.setDate(defDate, true);
	            } else {
	                self.gotoDate(defDate);
	            }
	        } else {
	            self.gotoDate(new Date());
	        }

	        if (opts.bound) {
	            this.hide();
	            self.el.className += ' is-bound';
	            addEvent(opts.trigger, 'click', self._onInputClick);
	            addEvent(opts.trigger, 'focus', self._onInputFocus);
	            addEvent(opts.trigger, 'blur', self._onInputBlur);
	        } else {
	            this.show();
	        }
	    };

	    /**
	     * public Pikaday API
	     */
	    Pikaday.prototype = {

	        /**
	         * configure functionality
	         */
	        config: function config(options) {
	            if (!this._o) {
	                this._o = extend({}, defaults, true);
	            }

	            var opts = extend(this._o, options, true);

	            opts.isRTL = !!opts.isRTL;

	            opts.field = opts.field && opts.field.nodeName ? opts.field : null;

	            opts.theme = typeof opts.theme === 'string' && opts.theme ? opts.theme : null;

	            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

	            opts.trigger = opts.trigger && opts.trigger.nodeName ? opts.trigger : opts.field;

	            opts.disableWeekends = !!opts.disableWeekends;

	            opts.disableDayFn = typeof opts.disableDayFn === 'function' ? opts.disableDayFn : null;

	            var nom = parseInt(opts.numberOfMonths, 10) || 1;
	            opts.numberOfMonths = nom > 4 ? 4 : nom;

	            if (!isDate(opts.minDate)) {
	                opts.minDate = false;
	            }
	            if (!isDate(opts.maxDate)) {
	                opts.maxDate = false;
	            }
	            if (opts.minDate && opts.maxDate && opts.maxDate < opts.minDate) {
	                opts.maxDate = opts.minDate = false;
	            }
	            if (opts.minDate) {
	                this.setMinDate(opts.minDate);
	            }
	            if (opts.maxDate) {
	                this.setMaxDate(opts.maxDate);
	            }

	            if (isArray(opts.yearRange)) {
	                var fallback = new Date().getFullYear() - 10;
	                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
	                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
	            } else {
	                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
	                if (opts.yearRange > 100) {
	                    opts.yearRange = 100;
	                }
	            }

	            return opts;
	        },

	        /**
	         * return a formatted string of the current selection (using Moment.js if available)
	         */
	        toString: function toString(format) {
	            return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
	        },

	        /**
	         * return a Moment.js object of the current selection (if available)
	         */
	        getMoment: function getMoment() {
	            return hasMoment ? moment(this._d) : null;
	        },

	        /**
	         * set the current selection from a Moment.js object (if available)
	         */
	        setMoment: function setMoment(date, preventOnSelect) {
	            if (hasMoment && moment.isMoment(date)) {
	                this.setDate(date.toDate(), preventOnSelect);
	            }
	        },

	        /**
	         * return a Date object of the current selection
	         */
	        getDate: function getDate() {
	            return isDate(this._d) ? new Date(this._d.getTime()) : null;
	        },

	        /**
	         * set the current selection
	         */
	        setDate: function setDate(date, preventOnSelect) {
	            if (!date) {
	                this._d = null;

	                if (this._o.field) {
	                    this._o.field.value = '';
	                    fireEvent(this._o.field, 'change', { firedBy: this });
	                }

	                return this.draw();
	            }
	            if (typeof date === 'string') {
	                date = new Date(Date.parse(date));
	            }
	            if (!isDate(date)) {
	                return;
	            }

	            var min = this._o.minDate,
	                max = this._o.maxDate;

	            if (isDate(min) && date < min) {
	                date = min;
	            } else if (isDate(max) && date > max) {
	                date = max;
	            }

	            this._d = new Date(date.getTime());
	            setToStartOfDay(this._d);
	            this.gotoDate(this._d);

	            if (this._o.field) {
	                this._o.field.value = this.toString();
	                fireEvent(this._o.field, 'change', { firedBy: this });
	            }
	            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
	                this._o.onSelect.call(this, this.getDate());
	            }
	        },

	        /**
	         * change view to a specific date
	         */
	        gotoDate: function gotoDate(date) {
	            var newCalendar = true;

	            if (!isDate(date)) {
	                return;
	            }

	            if (this.calendars) {
	                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
	                    lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
	                    visibleDate = date.getTime();
	                // get the end of the month
	                lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
	                lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
	                newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
	            }

	            if (newCalendar) {
	                this.calendars = [{
	                    month: date.getMonth(),
	                    year: date.getFullYear()
	                }];
	                if (this._o.mainCalendar === 'right') {
	                    this.calendars[0].month += 1 - this._o.numberOfMonths;
	                }
	            }

	            this.adjustCalendars();
	        },

	        adjustDate: function adjustDate(sign, days) {

	            var day = this.getDate() || new Date();
	            var difference = parseInt(days) * 24 * 60 * 60 * 1000;

	            var newDay;

	            if (sign === 'add') {
	                newDay = new Date(day.valueOf() + difference);
	            } else if (sign === 'subtract') {
	                newDay = new Date(day.valueOf() - difference);
	            }

	            if (hasMoment) {
	                if (sign === 'add') {
	                    newDay = moment(day).add(days, "days").toDate();
	                } else if (sign === 'subtract') {
	                    newDay = moment(day).subtract(days, "days").toDate();
	                }
	            }

	            this.setDate(newDay);
	        },

	        adjustCalendars: function adjustCalendars() {
	            this.calendars[0] = adjustCalendar(this.calendars[0]);
	            for (var c = 1; c < this._o.numberOfMonths; c++) {
	                this.calendars[c] = adjustCalendar({
	                    month: this.calendars[0].month + c,
	                    year: this.calendars[0].year
	                });
	            }
	            this.draw();
	        },

	        gotoToday: function gotoToday() {
	            this.gotoDate(new Date());
	        },

	        /**
	         * change view to a specific month (zero-index, e.g. 0: January)
	         */
	        gotoMonth: function gotoMonth(month) {
	            if (!isNaN(month)) {
	                this.calendars[0].month = parseInt(month, 10);
	                this.adjustCalendars();
	            }
	        },

	        nextMonth: function nextMonth() {
	            this.calendars[0].month++;
	            this.adjustCalendars();
	        },

	        prevMonth: function prevMonth() {
	            this.calendars[0].month--;
	            this.adjustCalendars();
	        },

	        /**
	         * change view to a specific full year (e.g. "2012")
	         */
	        gotoYear: function gotoYear(year) {
	            if (!isNaN(year)) {
	                this.calendars[0].year = parseInt(year, 10);
	                this.adjustCalendars();
	            }
	        },

	        /**
	         * change the minDate
	         */
	        setMinDate: function setMinDate(value) {
	            if (value instanceof Date) {
	                setToStartOfDay(value);
	                this._o.minDate = value;
	                this._o.minYear = value.getFullYear();
	                this._o.minMonth = value.getMonth();
	            } else {
	                this._o.minDate = defaults.minDate;
	                this._o.minYear = defaults.minYear;
	                this._o.minMonth = defaults.minMonth;
	                this._o.startRange = defaults.startRange;
	            }

	            this.draw();
	        },

	        /**
	         * change the maxDate
	         */
	        setMaxDate: function setMaxDate(value) {
	            if (value instanceof Date) {
	                setToStartOfDay(value);
	                this._o.maxDate = value;
	                this._o.maxYear = value.getFullYear();
	                this._o.maxMonth = value.getMonth();
	            } else {
	                this._o.maxDate = defaults.maxDate;
	                this._o.maxYear = defaults.maxYear;
	                this._o.maxMonth = defaults.maxMonth;
	                this._o.endRange = defaults.endRange;
	            }

	            this.draw();
	        },

	        setStartRange: function setStartRange(value) {
	            this._o.startRange = value;
	        },

	        setEndRange: function setEndRange(value) {
	            this._o.endRange = value;
	        },

	        /**
	         * refresh the HTML
	         */
	        draw: function draw(force) {
	            if (!this._v && !force) {
	                return;
	            }
	            var opts = this._o,
	                minYear = opts.minYear,
	                maxYear = opts.maxYear,
	                minMonth = opts.minMonth,
	                maxMonth = opts.maxMonth,
	                html = '',
	                randId;

	            if (this._y <= minYear) {
	                this._y = minYear;
	                if (!isNaN(minMonth) && this._m < minMonth) {
	                    this._m = minMonth;
	                }
	            }
	            if (this._y >= maxYear) {
	                this._y = maxYear;
	                if (!isNaN(maxMonth) && this._m > maxMonth) {
	                    this._m = maxMonth;
	                }
	            }

	            randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

	            for (var c = 0; c < opts.numberOfMonths; c++) {
	                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
	            }

	            this.el.innerHTML = html;

	            if (opts.bound) {
	                if (opts.field.type !== 'hidden') {
	                    sto(function () {
	                        opts.trigger.focus();
	                    }, 1);
	                }
	            }

	            if (typeof this._o.onDraw === 'function') {
	                this._o.onDraw(this);
	            }

	            if (opts.bound) {
	                // let the screen reader user know to use arrow keys
	                opts.field.setAttribute('aria-label', 'Use the arrow keys to pick a date');
	            }
	        },

	        adjustPosition: function adjustPosition() {
	            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

	            if (this._o.container) return;

	            this.el.style.position = 'absolute';

	            field = this._o.trigger;
	            pEl = field;
	            width = this.el.offsetWidth;
	            height = this.el.offsetHeight;
	            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

	            if (typeof field.getBoundingClientRect === 'function') {
	                clientRect = field.getBoundingClientRect();
	                left = clientRect.left + window.pageXOffset;
	                top = clientRect.bottom + window.pageYOffset;
	            } else {
	                left = pEl.offsetLeft;
	                top = pEl.offsetTop + pEl.offsetHeight;
	                while (pEl = pEl.offsetParent) {
	                    left += pEl.offsetLeft;
	                    top += pEl.offsetTop;
	                }
	            }

	            // default position is bottom & left
	            if (this._o.reposition && left + width > viewportWidth || this._o.position.indexOf('right') > -1 && left - width + field.offsetWidth > 0) {
	                left = left - width + field.offsetWidth;
	            }
	            if (this._o.reposition && top + height > viewportHeight + scrollTop || this._o.position.indexOf('top') > -1 && top - height - field.offsetHeight > 0) {
	                top = top - height - field.offsetHeight;
	            }

	            this.el.style.left = left + 'px';
	            this.el.style.top = top + 'px';
	        },

	        /**
	         * render HTML for a particular month
	         */
	        render: function render(year, month, randId) {
	            var opts = this._o,
	                now = new Date(),
	                days = getDaysInMonth(year, month),
	                before = new Date(year, month, 1).getDay(),
	                data = [],
	                row = [];
	            setToStartOfDay(now);
	            if (opts.firstDay > 0) {
	                before -= opts.firstDay;
	                if (before < 0) {
	                    before += 7;
	                }
	            }
	            var previousMonth = month === 0 ? 11 : month - 1,
	                nextMonth = month === 11 ? 0 : month + 1,
	                yearOfPreviousMonth = month === 0 ? year - 1 : year,
	                yearOfNextMonth = month === 11 ? year + 1 : year,
	                daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
	            var cells = days + before,
	                after = cells;
	            while (after > 7) {
	                after -= 7;
	            }
	            cells += 7 - after;
	            for (var i = 0, r = 0; i < cells; i++) {
	                var day = new Date(year, month, 1 + (i - before)),
	                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
	                    isToday = compareDates(day, now),
	                    hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
	                    isEmpty = i < before || i >= days + before,
	                    dayNumber = 1 + (i - before),
	                    monthNumber = month,
	                    yearNumber = year,
	                    isStartRange = opts.startRange && compareDates(opts.startRange, day),
	                    isEndRange = opts.endRange && compareDates(opts.endRange, day),
	                    isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
	                    isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);

	                if (isEmpty) {
	                    if (i < before) {
	                        dayNumber = daysInPreviousMonth + dayNumber;
	                        monthNumber = previousMonth;
	                        yearNumber = yearOfPreviousMonth;
	                    } else {
	                        dayNumber = dayNumber - days;
	                        monthNumber = nextMonth;
	                        yearNumber = yearOfNextMonth;
	                    }
	                }

	                var dayConfig = {
	                    day: dayNumber,
	                    month: monthNumber,
	                    year: yearNumber,
	                    hasEvent: hasEvent,
	                    isSelected: isSelected,
	                    isToday: isToday,
	                    isDisabled: isDisabled,
	                    isEmpty: isEmpty,
	                    isStartRange: isStartRange,
	                    isEndRange: isEndRange,
	                    isInRange: isInRange,
	                    showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
	                };

	                row.push(renderDay(dayConfig));

	                if (++r === 7) {
	                    if (opts.showWeekNumber) {
	                        row.unshift(renderWeek(i - before, month, year));
	                    }
	                    data.push(renderRow(row, opts.isRTL));
	                    row = [];
	                    r = 0;
	                }
	            }
	            return renderTable(opts, data, randId);
	        },

	        isVisible: function isVisible() {
	            return this._v;
	        },

	        show: function show() {
	            if (!this.isVisible()) {
	                this._v = true;
	                this.draw();
	                if (this._o.bound) {
	                    addEvent(document, 'click', this._onClick);
	                    this.adjustPosition();
	                }
	                removeClass(this.el, 'is-hidden');
	                if (typeof this._o.onOpen === 'function') {
	                    this._o.onOpen.call(this);
	                }
	            }
	        },

	        hide: function hide() {
	            var v = this._v;
	            if (v !== false) {
	                if (this._o.bound) {
	                    removeEvent(document, 'click', this._onClick);
	                }
	                this.el.style.position = 'static'; // reset
	                this.el.style.left = 'auto';
	                this.el.style.top = 'auto';
	                addClass(this.el, 'is-hidden');
	                this._v = false;
	                if (v !== undefined && typeof this._o.onClose === 'function') {
	                    this._o.onClose.call(this);
	                }
	            }
	        },

	        /**
	         * GAME OVER
	         */
	        destroy: function destroy() {
	            this.hide();
	            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
	            removeEvent(this.el, 'touchend', this._onMouseDown, true);
	            removeEvent(this.el, 'change', this._onChange);
	            if (this._o.field) {
	                removeEvent(this._o.field, 'change', this._onInputChange);
	                if (this._o.bound) {
	                    removeEvent(this._o.trigger, 'click', this._onInputClick);
	                    removeEvent(this._o.trigger, 'focus', this._onInputFocus);
	                    removeEvent(this._o.trigger, 'blur', this._onInputBlur);
	                }
	            }
	            if (this.el.parentNode) {
	                this.el.parentNode.removeChild(this.el);
	            }
	        }

	    };

	    return Pikaday;
		});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./pikaday": 4,
		"./pikaday.js": 4
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 5;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dateUtils = __webpack_require__(3);

	var _dateUtils2 = _interopRequireDefault(_dateUtils);

	var _data = __webpack_require__(7);

	var _data2 = _interopRequireDefault(_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @module schedule
	 */

	var lectureData = [],
	    scheduleContainer = void 0;

	function onClickHandler(event) {
	    if (event.target.classList.contains("schedule-item__lecturer")) {
	        $(event.target).siblings(".schedule-lecturer").slideToggle();
	    }
	}

	function prepareLectureData(item) {
	    var startDate = new Date(item.start),
	        endDate = new Date(item.end),
	        today = new Date();

	    item.completed = Date.parse(item.start) < today;
	    item.date = _dateUtils2.default.formatDate(startDate);
	    item.time = _dateUtils2.default.getTime(startDate) + ' - ' + _dateUtils2.default.getTime(endDate);
	    item.schoolList = item.school.map(function (schoolData) {
	        return schoolData.name;
	    }).join(", ");

	    return item;
	}

	function render(lecture) {
	    scheduleContainer.innerHTML = ScheduleApp.templates.schedule.item({ items: lecture });
	}

	function filterItems(filterValues) {
	    var filteredLecture = [];

	    filterValues.date = filterValues.date ? _dateUtils2.default.formatDate(new Date(filterValues.date)) : false;

	    lectureData.forEach(function (item) {
	        var lecture = $.extend(true, {}, item),
	            valid = true;

	        var _loop = function _loop(key) {
	            if (filterValues.hasOwnProperty(key) && filterValues[key]) {
	                switch (key) {
	                    case "date":
	                        if (filterValues[key] !== lecture.date) {
	                            valid = false;
	                        }
	                        break;
	                    case "school":
	                        var result = lecture[key].every(function (item) {
	                            return item.id !== filterValues[key];
	                        });
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
	        };

	        for (var key in filterValues) {
	            _loop(key);
	        }
	        if (valid) {
	            filteredLecture.push(lecture);
	        }
	    });

	    render(filteredLecture);
	}

	function init() {
	    scheduleContainer = document.querySelector(".schedule");

	    _data2.default.forEach(function (item) {
	        var data = $.extend(true, {}, item);
	        lectureData.push(prepareLectureData(data));
	    });
	    render(lectureData);
	    scheduleContainer.addEventListener("click", onClickHandler);
	}

	exports.default = { filterItems: filterItems, init: init };

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var SCHEDULE_DATA = [{
	    title: "Адаптивная вёрстка",
	    start: "2017-04-11T16:00:00.000Z",
	    end: "2017-04-11T18:00:00.000Z",
	    place: "Красная аудитория",
	    lecturer: {
	        id: 'lecturer-0',
	        name: "Дмитрий Душкин",
	        description: "Кандидат технических наук, научный сотрудник ИПУ РАН с 2008 по 2013. Пришёл в Яндекс.Картинки в 2014 году, отвечал за мобильную версию и рост производительности сервиса. В 2016 перешёл в Yandex Data Factory, где разрабатывает интерфейсы и дизайн веб-приложений для B2B.",
	        photo: {
	            '1x': '/images/lecturer-0-1x.jpg',
	            '2x': '/images/lecturer-0-2x.jpg'
	        }
	    },
	    school: [{
	        id: 'school-0',
	        name: "Школа разработки интерфейсов"
	    }],
	    links: [{
	        name: "Материалы",
	        link: "#"
	    }, {
	        name: "Видеозапись",
	        link: "#"
	    }]
	}, {
	    title: "Идея, исследование, концепт (Часть 1)",
	    start: "2017-04-11T18:00:00.000Z",
	    end: "2017-04-11T20:30:00.000Z",
	    place: "Желтая аудитория",
	    lecturer: {
	        id: 'lecturer-4',
	        name: "Антон Тен",
	        description: "В Яндексе с 2014 года. Ведущий дизайнер продукта в сервисах Переводчик, Расписания и Видео.",
	        photo: {
	            '1x': '/images/lecturer-4-1x.jpg',
	            '2x': '/images/lecturer-4-2x.jpg'
	        }
	    },
	    school: [{
	        id: 'school-2',
	        name: "Школа мобильного дизайна"
	    }],
	    links: [{
	        name: "Материалы",
	        link: "#"
	    }, {
	        name: "Видеозапись",
	        link: "#"
	    }]
	}, {
	    title: "Работа с сенсорным пользовательским вводом",
	    start: "2017-04-12T16:00:00.000Z",
	    end: "2017-04-12T17:30:00.000Z",
	    place: "Синяя аудитория",
	    lecturer: {
	        id: 'lecturer-0',
	        name: "Дмитрий Душкин",
	        description: "Кандидат технических наук, научный сотрудник ИПУ РАН с 2008 по 2013. Пришёл в Яндекс.Картинки в 2014 году, отвечал за мобильную версию и рост производительности сервиса. В 2016 перешёл в Yandex Data Factory, где разрабатывает интерфейсы и дизайн веб-приложений для B2B.",
	        photo: {
	            '1x': '/images/lecturer-0-1x.jpg',
	            '2x': '/images/lecturer-0-2x.jpg'
	        }
	    },
	    school: [{
	        id: 'school-0',
	        name: "Школа разработки интерфейсов"
	    }, {
	        id: 'school-1',
	        name: "Школа мобильной разработки"
	    }],
	    links: [{
	        name: "Материалы",
	        link: "#"
	    }, {
	        name: "Видеозапись",
	        link: "#"
	    }]
	}, {
	    title: "Java Blitz (Часть 1)",
	    start: "2017-07-09T16:00:00.000Z",
	    end: "2017-07-09T18:00:00.000Z",
	    place: "Желтая аудитория",
	    lecturer: {
	        id: 'lecturer-2',
	        name: "Эдуард Мацуков",
	        description: "Разрабатываю приложения для Android с 2010 года. В 2014 делал высоконагруженное финансовое приложение. Тогда же начал осваивать АОП, внедряя язык в продакшн. В 2015 разрабатывал инструменты для Android Studio, позволяющие использовать aspectJ в своих проектах. В Яндексе занят на проекте Авто.ру.",
	        photo: {
	            '1x': '/images/lecturer-2-1x.jpg',
	            '2x': '/images/lecturer-2-2x.jpg'
	        }
	    },
	    school: [{
	        id: 'school-1',
	        name: "Школа мобильной разработки"
	    }],
	    links: []
	}, {
	    title: "Идея, исследование, концепт (Часть 2)",
	    start: "2017-07-09T16:00:00.000Z",
	    end: "2017-07-09T18:00:00.000Z",
	    place: "Красная аудитория",
	    lecturer: {
	        id: 'lecturer-4',
	        name: "Антон Тен",
	        description: "В Яндексе с 2014 года. Ведущий дизайнер продукта в сервисах Переводчик, Расписания и Видео.",
	        photo: {
	            '1x': '/images/lecturer-4-1x.jpg',
	            '2x': '/images/lecturer-4-2x.jpg'
	        }
	    },
	    school: [{
	        id: 'school-2',
	        name: "Школа мобильного дизайна"
	    }],
	    links: []
	}, {
	    title: "Мультимедиа: возможности браузера",
	    start: "2017-07-11T16:00:00.000Z",
	    end: "2017-07-11T18:00:00.000Z",
	    place: "Синяя аудитория",
	    lecturer: {
	        id: 'lecturer-1',
	        name: "Максим Васильев",
	        description: "Во фронтенд-разработке с 2007 года. До 2013-го, когда пришёл в Яндекс, работал технологом в студии Лебедева и других компаниях.",
	        photo: {
	            '1x': '/images/lecturer-1-1x.jpg',
	            '2x': '/images/lecturer-1-2x.jpg'
	        }
	    },
	    school: [{
	        id: 'school-0',
	        name: "Школа разработки интерфейсов"
	    }],
	    links: []
	}, {
	    title: "Git & Workflow",
	    start: "2017-07-12T16:00:00.000Z",
	    end: "2017-07-12T18:00:00.000Z",
	    place: "Зеленая большая аудитория",
	    lecturer: {
	        id: 'lecturer-3',
	        name: "Дмитрий Складнов",
	        description: "Окончил факультет ИТ Московского Технического Университета. В Яндексе с 2015 года, разрабатывает приложение Auto.ru для Android.",
	        photo: {
	            '1x': '/images/lecturer-3-1x.jpg',
	            '2x': '/images/lecturer-3-2x.jpg'
	        }
	    },
	    school: [{
	        id: 'school-0',
	        name: "Школа разработки интерфейсов"
	    }, {
	        id: 'school-1',
	        name: "Школа мобильной разработки"
	    }, {
	        id: 'school-2',
	        name: "Школа мобильного дизайна"
	    }],
	    links: []
	}, {
	    title: "Java Blitz (Часть 2)",
	    start: "2017-07-13T16:00:00.000Z",
	    end: "2017-07-13T18:00:00.000Z",
	    place: "Желтая аудитория",
	    lecturer: {
	        id: 'lecturer-2',
	        name: "Эдуард Мацуков",
	        description: "Разрабатываю приложения для Android с 2010 года. В 2014 делал высоконагруженное финансовое приложение. Тогда же начал осваивать АОП, внедряя язык в продакшн. В 2015 разрабатывал инструменты для Android Studio, позволяющие использовать aspectJ в своих проектах. В Яндексе занят на проекте Авто.ру.",
	        photo: {
	            '1x': '/images/lecturer-2-1x.jpg',
	            '2x': '/images/lecturer-2-2x.jpg'
	        }
	    },
	    school: [{
	        id: 'school-1',
	        name: "Школа мобильной разработки"
	    }],
	    links: []
	}, {
	    title: "Анимации",
	    start: "2017-07-15T16:00:00.000Z",
	    end: "2017-07-15T18:00:00.000Z",
	    place: "Красная аудитория",
	    lecturer: {
	        id: 'lecturer-4',
	        name: "Антон Тен",
	        description: "В Яндексе с 2014 года. Ведущий дизайнер продукта в сервисах Переводчик, Расписания и Видео.",
	        photo: {
	            '1x': '/images/lecturer-4-1x.jpg',
	            '2x': '/images/lecturer-4-2x.jpg'
	        }
	    },
	    school: [{
	        id: 'school-0',
	        name: "Школа разработки интерфейсов"
	    }, {
	        id: 'school-1',
	        name: "Школа мобильной разработки"
	    }, {
	        id: 'school-2',
	        name: "Школа мобильного дизайна"
	    }],
	    links: []
	}];

		exports.default = SCHEDULE_DATA;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @module Sticky
	 * @description Set the block to sticky positioning
	 */

	var Sticky = function () {
	    function Sticky(el) {
	        _classCallCheck(this, Sticky);

	        this.element = el;
	        this.isSticky = false;
	    }

	    _createClass(Sticky, [{
	        key: "init",
	        value: function init() {
	            this.top = this.element.getBoundingClientRect().top;
	            window.addEventListener('scroll', this.onScrollHandler.bind(this));
	        }
	    }, {
	        key: "onScrollHandler",
	        value: function onScrollHandler() {
	            var scrollTop = window.pageYOffset;

	            if (scrollTop >= this.top && !this.isSticky) {
	                this.stick();
	            } else if (scrollTop < this.top && this.isSticky) {
	                this.unstick();
	            }
	        }
	    }, {
	        key: "stick",
	        value: function stick() {
	            this.element.classList.add("sticky");
	            this.isSticky = true;
	        }
	    }, {
	        key: "unstick",
	        value: function unstick() {
	            this.element.classList.remove("sticky");
	            this.isSticky = false;
	        }
	    }]);

	    return Sticky;
	}();

		exports.default = Sticky;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkZGU2YWZjODU1NzIzY2NiMTQ4MyIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9tb2R1bGVzL0RhdGVQaWNrZXIuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9tb2R1bGVzL3VhLmpzIiwid2VicGFjazovLy9zcmMvanMvbW9kdWxlcy9kYXRlVXRpbHMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9tb2R1bGVzL3ZlbmRvci9waWthZGF5LmpzIiwid2VicGFjazovLy8uL21vZHVsZXMvdmVuZG9yIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9tb2R1bGVzL3NjaGVkdWxlLmpzIiwid2VicGFjazovLy9zcmMvanMvZGF0YS5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL21vZHVsZXMvc3RpY2t5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRkZTZhZmM4NTU3MjNjY2IxNDgzIiwiaW1wb3J0IERhdGVQaWNrZXIgZnJvbSAnLi9tb2R1bGVzL0RhdGVQaWNrZXInO1xuaW1wb3J0IHNjaGVkdWxlIGZyb20gJy4vbW9kdWxlcy9zY2hlZHVsZSc7XG5pbXBvcnQgU3RpY2t5IGZyb20gJy4vbW9kdWxlcy9zdGlja3knO1xuXG5mdW5jdGlvbiBmaWx0ZXJDaGFuZ2VIYW5kbGVyKCkge1xuICAgIGxldCBmaWx0ZXJWYWx1ZXMgPSB7XG4gICAgICAgIHNjaG9vbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXIgc2VsZWN0W25hbWU9c2Nob29sXVwiKS52YWx1ZSxcbiAgICAgICAgbGVjdHVyZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyIHNlbGVjdFtuYW1lPWxlY3R1cmVyXVwiKS52YWx1ZSxcbiAgICAgICAgZGF0ZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXIgaW5wdXRbbmFtZT1kYXRlXVwiKS52YWx1ZVxuICAgIH07XG4gICAgc2NoZWR1bGUuZmlsdGVySXRlbXMoZmlsdGVyVmFsdWVzKTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBzdGlja3lGaWx0ZXIgPSBuZXcgU3RpY2t5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyXCIpKTtcbiAgICBzdGlja3lGaWx0ZXIuaW5pdCgpO1xuXG4gICAgbGV0IGNhbGVuZGFyID0gbmV3IERhdGVQaWNrZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZXh0ZmllbGRcIikpO1xuICAgIGNhbGVuZGFyLmluaXQoKTtcblxuICAgIHNjaGVkdWxlLmluaXQoKTtcblxuICAgIFtdLmZvckVhY2guY2FsbChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXJfX2NvbnRyb2xcIiksXG4gICAgICAgIGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZpbHRlckNoYW5nZUhhbmRsZXIpXG4gICAgKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ZnLWxpYlwiKS5pbm5lckhUTUwgPSBTVkdfU1BSSVRFO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwiLyoqXG4gKiBAbW9kdWxlIGNhbGVuZGFyXG4gKiBAZGVzY3JpcHRpb24gaW5pdGlhbGl6ZSBjdXN0b20gb3IgbmF0aXZlIGRhdGUgcGlja2VyXG4gKi9cblxuaW1wb3J0IHVhIGZyb20gJy4vdWEnO1xuaW1wb3J0IGRhdGVVdGlscyBmcm9tICcuL2RhdGVVdGlscyc7XG5pbXBvcnQgUGlrYWRheSBmcm9tICcuL3ZlbmRvci9waWthZGF5JztcblxuZnVuY3Rpb24gaXNOYXRpdmVEYXRlU3VwcG9ydCgpIHtcbiAgICBsZXQgaW5jb3JyZWN0VmFsdWUgPSBcIm5vdC1hLWRhdGVcIixcbiAgICAgICAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiZGF0ZVwiKTtcbiAgICBpbnB1dC52YWx1ZSA9IGluY29ycmVjdFZhbHVlO1xuXG4gICAgcmV0dXJuIGlucHV0LnZhbHVlICE9PSBpbmNvcnJlY3RWYWx1ZTtcbn1cblxuZnVuY3Rpb24gdXNlTmF0aXZlRGF0ZVBpY2tlcigpIHtcbiAgICByZXR1cm4gKGlzTmF0aXZlRGF0ZVN1cHBvcnQoKSAmJiAodWEucGxhdGZvcm0uaW9zIHx8IHVhLnBsYXRmb3JtLmFuZHJvaWQpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVBpY2tlciB7XG4gICAgY29uc3RydWN0b3IoZWwpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgICAgICB0aGlzLmRhdGVDb250cm9sID0gZWwucXVlcnlTZWxlY3RvcignW25hbWU9ZGF0ZV0nKTtcbiAgICAgICAgdGhpcy5waWNrZXJJY29uID0gZWwucXVlcnlTZWxlY3RvcihcIi50ZXh0ZmllbGRfX2ljb25fY2FsZW5kYXJcIik7XG4gICAgICAgIHRoaXMuY2xlYXJJY29uID0gZWwucXVlcnlTZWxlY3RvcihcIi50ZXh0ZmllbGRfX2ljb25fY2xlYXJcIik7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKCF1c2VOYXRpdmVEYXRlUGlja2VyKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUNvbnRyb2wuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEN1c3RvbURhdGVQaWNrZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUNvbnRyb2wuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRWYWx1ZShkYXRlUGlja2VyKSB7XG4gICAgICAgIHRoaXMuZGF0ZUNvbnRyb2wudmFsdWUgPSBkYXRlVXRpbHMuZm9ybWF0RGF0ZShkYXRlUGlja2VyLmdldERhdGUoKSk7XG4gICAgICAgIHRoaXMucGlja2VySWNvbi5jbGFzc0xpc3QuYWRkKFwidGV4dGZpZWxkX19pY29uX2hpZGRlblwiKTtcbiAgICAgICAgdGhpcy5jbGVhckljb24uY2xhc3NMaXN0LnJlbW92ZShcInRleHRmaWVsZF9faWNvbl9oaWRkZW5cIik7XG4gICAgfVxuXG4gICAgY2xlYXJWYWx1ZShkYXRlUGlja2VyKSB7XG4gICAgICAgIGRhdGVQaWNrZXIuc2V0RGF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5jbGVhckljb24uY2xhc3NMaXN0LmFkZChcInRleHRmaWVsZF9faWNvbl9oaWRkZW5cIik7XG4gICAgICAgIHRoaXMucGlja2VySWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwidGV4dGZpZWxkX19pY29uX2hpZGRlblwiKTtcbiAgICB9XG5cbiAgICBpbml0Q3VzdG9tRGF0ZVBpY2tlcigpIHtcbiAgICAgICAgbGV0IGRhdGVQaWNrZXIgPSBuZXcgUGlrYWRheSh7XG4gICAgICAgICAgICBmaWVsZDogdGhpcy5kYXRlQ29udHJvbCxcbiAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxuICAgICAgICAgICAgaTE4bjoge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzTW9udGg6ICfQn9GA0LXQtNGL0LTRg9GJ0LjQuScsXG4gICAgICAgICAgICAgICAgbmV4dE1vbnRoOiAn0KHQu9C10LTRg9GO0YnQuNC5JyxcbiAgICAgICAgICAgICAgICBtb250aHM6IFsn0K/QvdCy0LDRgNGMJywgJ9Ck0LXQstGA0LDQu9GMJywgJ9Cc0LDRgNGCJywgJ9CQ0L/RgNC10LvRjCcsICfQnNCw0LknLCAn0JjRjtC90YwnLCAn0JjRjtC70YwnLCAn0JDQstCz0YPRgdGCJywgJ9Ch0LXQvdGC0Y/QsdGA0YwnLCAn0J7QutGC0Y/QsdGA0YwnLCAn0J3QvtGP0LHRgNGMJywgJ9CU0LXQutCw0LHRgNGMJ10sXG4gICAgICAgICAgICAgICAgd2Vla2RheXM6IFsn0JLQvtGB0LrRgNC10YHQtdC90YzQtScsICfQn9C+0L3QtdC00LXQu9GM0L3QuNC6JywgJ9CS0YLQvtGA0L3QuNC6JywgJ9Ch0YDQtdC00LAnLCAn0KfQtdGC0LLQtdGA0LMnLCAn0J/Rj9GC0L3QuNGG0LAnLCAn0KHRg9Cx0LHQvtGC0LAnXSxcbiAgICAgICAgICAgICAgICB3ZWVrZGF5c1Nob3J0OiBbJ9CS0YEnLCAn0J/QvScsICfQktGCJywgJ9Ch0YAnLCAn0KfRgicsICfQn9GCJywgJ9Ch0LEnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU2VsZWN0OiAoKSA9PiB0aGlzLnNldFZhbHVlKGRhdGVQaWNrZXIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGlja2VySWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZGF0ZVBpY2tlci5zaG93KCkpO1xuICAgICAgICB0aGlzLmNsZWFySWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jbGVhclZhbHVlKGRhdGVQaWNrZXIpKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tb2R1bGVzL0RhdGVQaWNrZXIuanMiLCIvKipcbiAqIEBtb2R1bGUgdWFcbiAqIEBkZXNjcmlwdGlvbiBEZXRlY3QgdXNlciBwbGF0Zm9ybVxuICovXG5cbi8vdGhhbmtzIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW0vYmVtLWNvcmUvYmxvYi92NC90b3VjaC5ibG9ja3MvdWEvdWEuanNcbmxldCB1YSA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICBwbGF0Zm9ybSA9IHt9LFxuICAgICAgICBtYXRjaDtcblxuICAgIGlmKG1hdGNoID0gdWEubWF0Y2goL0FuZHJvaWRcXHMrKFtcXGQuXSspLykpIHtcbiAgICAgICAgcGxhdGZvcm0uYW5kcm9pZCA9IG1hdGNoWzFdO1xuICAgIH0gZWxzZSBpZih1YS5tYXRjaCgvXFxzSFRDW1xcc19dLipBcHBsZVdlYktpdC8pKSB7XG4gICAgICAgIC8vINGE0Y3QudC60L7QstGL0Lkg0LTQtdGB0LrRgtC+0L/QvdGL0LkgVUEg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0YMg0L3QtdC60L7RgtC+0YDRi9GFIEhUQyAo0L3QsNC/0YDQuNC80LXRgCwgSFRDIFNlbnNhdGlvbilcbiAgICAgICAgcGxhdGZvcm0uYW5kcm9pZCA9ICcyLjMnO1xuICAgIH0gZWxzZSBpZihtYXRjaCA9IHVhLm1hdGNoKC9pUGhvbmVcXHNPU1xccyhbXFxkX10rKS8pKSB7XG4gICAgICAgIHBsYXRmb3JtLmlvcyA9IG1hdGNoWzFdLnJlcGxhY2UoL18vZywgJy4nKTtcbiAgICB9IGVsc2UgaWYobWF0Y2ggPSB1YS5tYXRjaCgvaVBhZC4qT1NcXHMoW1xcZF9dKykvKSkge1xuICAgICAgICBwbGF0Zm9ybS5pb3MgPSBtYXRjaFsxXS5yZXBsYWNlKC9fL2csICcuJyk7XG4gICAgfSBlbHNlIGlmKG1hdGNoID0gdWEubWF0Y2goL0JhZGFcXC8oW1xcZC5dKykvKSkge1xuICAgICAgICBwbGF0Zm9ybS5iYWRhID0gbWF0Y2hbMV07XG4gICAgfSBlbHNlIGlmKG1hdGNoID0gdWEubWF0Y2goL1dpbmRvd3NcXHNQaG9uZS4qXFxzKFtcXGQuXSspLykpIHtcbiAgICAgICAgcGxhdGZvcm0ud3AgPSBtYXRjaFsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwbGF0Zm9ybS5vdGhlciA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxhdGZvcm06IHBsYXRmb3JtXG4gICAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdWE7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tb2R1bGVzL3VhLmpzIiwiLyoqXG4gKiBAbW9kdWxlIGRhdGVVdGlsc1xuICogQGRlc2NyaXB0aW9uIEhlbHBlcnMgZm9yIGRhdGUgZm9ybWF0dGluZ1xuICovXG5cbmZ1bmN0aW9uIGxlYWRaZXJvKG51bSkge1xuICAgIHJldHVybiBudW0gPCAxMCA/ICcwJyArIG51bSA6IG51bTtcbn1cblxuZnVuY3Rpb24gZ2V0VGltZShkYXRlKSB7XG4gICAgcmV0dXJuIGxlYWRaZXJvKGRhdGUuZ2V0VVRDSG91cnMoKSkgKyBcIjpcIiArIGxlYWRaZXJvKGRhdGUuZ2V0VVRDTWludXRlcygpKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlKSB7XG4gICAgbGV0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSxcbiAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG5cbiAgICByZXR1cm4gW2xlYWRaZXJvKGRheSksIGxlYWRaZXJvKG1vbnRoKSwgeWVhcl0uam9pbignLicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7Z2V0VGltZSwgZm9ybWF0RGF0ZX07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tb2R1bGVzL2RhdGVVdGlscy5qcyIsIi8qIVxuICogUGlrYWRheVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0IERhdmlkIEJ1c2hlbGwgfCBCU0QgJiBNSVQgbGljZW5zZSB8IGh0dHBzOi8vZ2l0aHViLmNvbS9kYnVzaGVsbC9QaWthZGF5XG4gKi9cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KVxue1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBtb21lbnQ7XG4gICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBDb21tb25KUyBtb2R1bGVcbiAgICAgICAgLy8gTG9hZCBtb21lbnQuanMgYXMgYW4gb3B0aW9uYWwgZGVwZW5kZW5jeVxuICAgICAgICB0cnkgeyBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTsgfSBjYXRjaCAoZSkge31cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KG1vbWVudCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKHJlcSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTG9hZCBtb21lbnQuanMgYXMgYW4gb3B0aW9uYWwgZGVwZW5kZW5jeVxuICAgICAgICAgICAgdmFyIGlkID0gJ21vbWVudCc7XG4gICAgICAgICAgICB0cnkgeyBtb21lbnQgPSByZXEoaWQpOyB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkobW9tZW50KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5QaWthZGF5ID0gZmFjdG9yeShyb290Lm1vbWVudCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAobW9tZW50KVxue1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qKlxuICAgICAqIGZlYXR1cmUgZGV0ZWN0aW9uIGFuZCBoZWxwZXIgZnVuY3Rpb25zXG4gICAgICovXG4gICAgdmFyIGhhc01vbWVudCA9IHR5cGVvZiBtb21lbnQgPT09ICdmdW5jdGlvbicsXG5cbiAgICBoYXNFdmVudExpc3RlbmVycyA9ICEhd2luZG93LmFkZEV2ZW50TGlzdGVuZXIsXG5cbiAgICBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcblxuICAgIHN0byA9IHdpbmRvdy5zZXRUaW1lb3V0LFxuXG4gICAgYWRkRXZlbnQgPSBmdW5jdGlvbihlbCwgZSwgY2FsbGJhY2ssIGNhcHR1cmUpXG4gICAge1xuICAgICAgICBpZiAoaGFzRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZSwgY2FsbGJhY2ssICEhY2FwdHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC5hdHRhY2hFdmVudCgnb24nICsgZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZWwsIGUsIGNhbGxiYWNrLCBjYXB0dXJlKVxuICAgIHtcbiAgICAgICAgaWYgKGhhc0V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIGNhbGxiYWNrLCAhIWNhcHR1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBmaXJlRXZlbnQgPSBmdW5jdGlvbihlbCwgZXZlbnROYW1lLCBkYXRhKVxuICAgIHtcbiAgICAgICAgdmFyIGV2O1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgICAgICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgICAgICAgZXYuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgZXYgPSBleHRlbmQoZXYsIGRhdGEpO1xuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICAgICAgICAgIGV2ID0gZXh0ZW5kKGV2LCBkYXRhKTtcbiAgICAgICAgICAgIGVsLmZpcmVFdmVudCgnb24nICsgZXZlbnROYW1lLCBldik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdHJpbSA9IGZ1bmN0aW9uKHN0cilcbiAgICB7XG4gICAgICAgIHJldHVybiBzdHIudHJpbSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywnJyk7XG4gICAgfSxcblxuICAgIGhhc0NsYXNzID0gZnVuY3Rpb24oZWwsIGNuKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgnICcgKyBlbC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyAnICsgY24gKyAnICcpICE9PSAtMTtcbiAgICB9LFxuXG4gICAgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgY24pXG4gICAge1xuICAgICAgICBpZiAoIWhhc0NsYXNzKGVsLCBjbikpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IChlbC5jbGFzc05hbWUgPT09ICcnKSA/IGNuIDogZWwuY2xhc3NOYW1lICsgJyAnICsgY247XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY24pXG4gICAge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSB0cmltKCgnICcgKyBlbC5jbGFzc05hbWUgKyAnICcpLnJlcGxhY2UoJyAnICsgY24gKyAnICcsICcgJykpO1xuICAgIH0sXG5cbiAgICBpc0FycmF5ID0gZnVuY3Rpb24ob2JqKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgvQXJyYXkvKS50ZXN0KE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKTtcbiAgICB9LFxuXG4gICAgaXNEYXRlID0gZnVuY3Rpb24ob2JqKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICgvRGF0ZS8pLnRlc3QoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpICYmICFpc05hTihvYmouZ2V0VGltZSgpKTtcbiAgICB9LFxuXG4gICAgaXNXZWVrZW5kID0gZnVuY3Rpb24oZGF0ZSlcbiAgICB7XG4gICAgICAgIHZhciBkYXkgPSBkYXRlLmdldERheSgpO1xuICAgICAgICByZXR1cm4gZGF5ID09PSAwIHx8IGRheSA9PT0gNjtcbiAgICB9LFxuXG4gICAgaXNMZWFwWWVhciA9IGZ1bmN0aW9uKHllYXIpXG4gICAge1xuICAgICAgICAvLyBzb2x1dGlvbiBieSBNYXR0aSBWaXJra3VuZW46IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ4ODE5NTFcbiAgICAgICAgcmV0dXJuIHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDAgfHwgeWVhciAlIDQwMCA9PT0gMDtcbiAgICB9LFxuXG4gICAgZ2V0RGF5c0luTW9udGggPSBmdW5jdGlvbih5ZWFyLCBtb250aClcbiAgICB7XG4gICAgICAgIHJldHVybiBbMzEsIGlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV1bbW9udGhdO1xuICAgIH0sXG5cbiAgICBzZXRUb1N0YXJ0T2ZEYXkgPSBmdW5jdGlvbihkYXRlKVxuICAgIHtcbiAgICAgICAgaWYgKGlzRGF0ZShkYXRlKSkgZGF0ZS5zZXRIb3VycygwLDAsMCwwKTtcbiAgICB9LFxuXG4gICAgY29tcGFyZURhdGVzID0gZnVuY3Rpb24oYSxiKVxuICAgIHtcbiAgICAgICAgLy8gd2VhayBkYXRlIGNvbXBhcmlzb24gKHVzZSBzZXRUb1N0YXJ0T2ZEYXkoZGF0ZSkgdG8gZW5zdXJlIGNvcnJlY3QgcmVzdWx0KVxuICAgICAgICByZXR1cm4gYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpO1xuICAgIH0sXG5cbiAgICBleHRlbmQgPSBmdW5jdGlvbih0bywgZnJvbSwgb3ZlcndyaXRlKVxuICAgIHtcbiAgICAgICAgdmFyIHByb3AsIGhhc1Byb3A7XG4gICAgICAgIGZvciAocHJvcCBpbiBmcm9tKSB7XG4gICAgICAgICAgICBoYXNQcm9wID0gdG9bcHJvcF0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChoYXNQcm9wICYmIHR5cGVvZiBmcm9tW3Byb3BdID09PSAnb2JqZWN0JyAmJiBmcm9tW3Byb3BdICE9PSBudWxsICYmIGZyb21bcHJvcF0ubm9kZU5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RhdGUoZnJvbVtwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSBuZXcgRGF0ZShmcm9tW3Byb3BdLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNBcnJheShmcm9tW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGZyb21bcHJvcF0uc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b1twcm9wXSA9IGV4dGVuZCh7fSwgZnJvbVtwcm9wXSwgb3ZlcndyaXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG92ZXJ3cml0ZSB8fCAhaGFzUHJvcCkge1xuICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gZnJvbVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG87XG4gICAgfSxcblxuICAgIGFkanVzdENhbGVuZGFyID0gZnVuY3Rpb24oY2FsZW5kYXIpIHtcbiAgICAgICAgaWYgKGNhbGVuZGFyLm1vbnRoIDwgMCkge1xuICAgICAgICAgICAgY2FsZW5kYXIueWVhciAtPSBNYXRoLmNlaWwoTWF0aC5hYnMoY2FsZW5kYXIubW9udGgpLzEyKTtcbiAgICAgICAgICAgIGNhbGVuZGFyLm1vbnRoICs9IDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxlbmRhci5tb250aCA+IDExKSB7XG4gICAgICAgICAgICBjYWxlbmRhci55ZWFyICs9IE1hdGguZmxvb3IoTWF0aC5hYnMoY2FsZW5kYXIubW9udGgpLzEyKTtcbiAgICAgICAgICAgIGNhbGVuZGFyLm1vbnRoIC09IDEyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxlbmRhcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZGVmYXVsdHMgYW5kIGxvY2FsaXNhdGlvblxuICAgICAqL1xuICAgIGRlZmF1bHRzID0ge1xuXG4gICAgICAgIC8vIGJpbmQgdGhlIHBpY2tlciB0byBhIGZvcm0gZmllbGRcbiAgICAgICAgZmllbGQ6IG51bGwsXG5cbiAgICAgICAgLy8gYXV0b21hdGljYWxseSBzaG93L2hpZGUgdGhlIHBpY2tlciBvbiBgZmllbGRgIGZvY3VzIChkZWZhdWx0IGB0cnVlYCBpZiBgZmllbGRgIGlzIHNldClcbiAgICAgICAgYm91bmQ6IHVuZGVmaW5lZCxcblxuICAgICAgICAvLyBwb3NpdGlvbiBvZiB0aGUgZGF0ZXBpY2tlciwgcmVsYXRpdmUgdG8gdGhlIGZpZWxkIChkZWZhdWx0IHRvIGJvdHRvbSAmIGxlZnQpXG4gICAgICAgIC8vICgnYm90dG9tJyAmICdsZWZ0JyBrZXl3b3JkcyBhcmUgbm90IHVzZWQsICd0b3AnICYgJ3JpZ2h0JyBhcmUgbW9kaWZpZXIgb24gdGhlIGJvdHRvbS9sZWZ0IHBvc2l0aW9uKVxuICAgICAgICBwb3NpdGlvbjogJ2JvdHRvbSBsZWZ0JyxcblxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGZpdCBpbiB0aGUgdmlld3BvcnQgZXZlbiBpZiBpdCBtZWFucyByZXBvc2l0aW9uaW5nIGZyb20gdGhlIHBvc2l0aW9uIG9wdGlvblxuICAgICAgICByZXBvc2l0aW9uOiB0cnVlLFxuXG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IG91dHB1dCBmb3JtYXQgZm9yIGAudG9TdHJpbmcoKWAgYW5kIGBmaWVsZGAgdmFsdWVcbiAgICAgICAgZm9ybWF0OiAnWVlZWS1NTS1ERCcsXG5cbiAgICAgICAgLy8gdGhlIGluaXRpYWwgZGF0ZSB0byB2aWV3IHdoZW4gZmlyc3Qgb3BlbmVkXG4gICAgICAgIGRlZmF1bHREYXRlOiBudWxsLFxuXG4gICAgICAgIC8vIG1ha2UgdGhlIGBkZWZhdWx0RGF0ZWAgdGhlIGluaXRpYWwgc2VsZWN0ZWQgdmFsdWVcbiAgICAgICAgc2V0RGVmYXVsdERhdGU6IGZhbHNlLFxuXG4gICAgICAgIC8vIGZpcnN0IGRheSBvZiB3ZWVrICgwOiBTdW5kYXksIDE6IE1vbmRheSBldGMpXG4gICAgICAgIGZpcnN0RGF5OiAwLFxuXG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IGZsYWcgZm9yIG1vbWVudCdzIHN0cmljdCBkYXRlIHBhcnNpbmdcbiAgICAgICAgZm9ybWF0U3RyaWN0OiBmYWxzZSxcblxuICAgICAgICAvLyB0aGUgbWluaW11bS9lYXJsaWVzdCBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkXG4gICAgICAgIG1pbkRhdGU6IG51bGwsXG4gICAgICAgIC8vIHRoZSBtYXhpbXVtL2xhdGVzdCBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkXG4gICAgICAgIG1heERhdGU6IG51bGwsXG5cbiAgICAgICAgLy8gbnVtYmVyIG9mIHllYXJzIGVpdGhlciBzaWRlLCBvciBhcnJheSBvZiB1cHBlci9sb3dlciByYW5nZVxuICAgICAgICB5ZWFyUmFuZ2U6IDEwLFxuXG4gICAgICAgIC8vIHNob3cgd2VlayBudW1iZXJzIGF0IGhlYWQgb2Ygcm93XG4gICAgICAgIHNob3dXZWVrTnVtYmVyOiBmYWxzZSxcblxuICAgICAgICAvLyB1c2VkIGludGVybmFsbHkgKGRvbid0IGNvbmZpZyBvdXRzaWRlKVxuICAgICAgICBtaW5ZZWFyOiAwLFxuICAgICAgICBtYXhZZWFyOiA5OTk5LFxuICAgICAgICBtaW5Nb250aDogdW5kZWZpbmVkLFxuICAgICAgICBtYXhNb250aDogdW5kZWZpbmVkLFxuXG4gICAgICAgIHN0YXJ0UmFuZ2U6IG51bGwsXG4gICAgICAgIGVuZFJhbmdlOiBudWxsLFxuXG4gICAgICAgIGlzUlRMOiBmYWxzZSxcblxuICAgICAgICAvLyBBZGRpdGlvbmFsIHRleHQgdG8gYXBwZW5kIHRvIHRoZSB5ZWFyIGluIHRoZSBjYWxlbmRhciB0aXRsZVxuICAgICAgICB5ZWFyU3VmZml4OiAnJyxcblxuICAgICAgICAvLyBSZW5kZXIgdGhlIG1vbnRoIGFmdGVyIHllYXIgaW4gdGhlIGNhbGVuZGFyIHRpdGxlXG4gICAgICAgIHNob3dNb250aEFmdGVyWWVhcjogZmFsc2UsXG5cbiAgICAgICAgLy8gUmVuZGVyIGRheXMgb2YgdGhlIGNhbGVuZGFyIGdyaWQgdGhhdCBmYWxsIGluIHRoZSBuZXh0IG9yIHByZXZpb3VzIG1vbnRoXG4gICAgICAgIHNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IGZhbHNlLFxuXG4gICAgICAgIC8vIGhvdyBtYW55IG1vbnRocyBhcmUgdmlzaWJsZVxuICAgICAgICBudW1iZXJPZk1vbnRoczogMSxcblxuICAgICAgICAvLyB3aGVuIG51bWJlck9mTW9udGhzIGlzIHVzZWQsIHRoaXMgd2lsbCBoZWxwIHlvdSB0byBjaG9vc2Ugd2hlcmUgdGhlIG1haW4gY2FsZW5kYXIgd2lsbCBiZSAoZGVmYXVsdCBgbGVmdGAsIGNhbiBiZSBzZXQgdG8gYHJpZ2h0YClcbiAgICAgICAgLy8gb25seSB1c2VkIGZvciB0aGUgZmlyc3QgZGlzcGxheSBvciB3aGVuIGEgc2VsZWN0ZWQgZGF0ZSBpcyBub3QgdmlzaWJsZVxuICAgICAgICBtYWluQ2FsZW5kYXI6ICdsZWZ0JyxcblxuICAgICAgICAvLyBTcGVjaWZ5IGEgRE9NIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBjYWxlbmRhciBpblxuICAgICAgICBjb250YWluZXI6IHVuZGVmaW5lZCxcblxuICAgICAgICAvLyBCbHVyIGZpZWxkIHdoZW4gZGF0ZSBpcyBzZWxlY3RlZFxuICAgICAgICBibHVyRmllbGRPblNlbGVjdCA6IHRydWUsXG5cbiAgICAgICAgLy8gaW50ZXJuYXRpb25hbGl6YXRpb25cbiAgICAgICAgaTE4bjoge1xuICAgICAgICAgICAgcHJldmlvdXNNb250aCA6ICdQcmV2aW91cyBNb250aCcsXG4gICAgICAgICAgICBuZXh0TW9udGggICAgIDogJ05leHQgTW9udGgnLFxuICAgICAgICAgICAgbW9udGhzICAgICAgICA6IFsnSmFudWFyeScsJ0ZlYnJ1YXJ5JywnTWFyY2gnLCdBcHJpbCcsJ01heScsJ0p1bmUnLCdKdWx5JywnQXVndXN0JywnU2VwdGVtYmVyJywnT2N0b2JlcicsJ05vdmVtYmVyJywnRGVjZW1iZXInXSxcbiAgICAgICAgICAgIHdlZWtkYXlzICAgICAgOiBbJ1N1bmRheScsJ01vbmRheScsJ1R1ZXNkYXknLCdXZWRuZXNkYXknLCdUaHVyc2RheScsJ0ZyaWRheScsJ1NhdHVyZGF5J10sXG4gICAgICAgICAgICB3ZWVrZGF5c1Nob3J0IDogWydTdW4nLCdNb24nLCdUdWUnLCdXZWQnLCdUaHUnLCdGcmknLCdTYXQnXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoZW1lIENsYXNzbmFtZVxuICAgICAgICB0aGVtZTogbnVsbCxcblxuICAgICAgICAvLyBldmVudHMgYXJyYXlcbiAgICAgICAgZXZlbnRzOiBbXSxcblxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICBvblNlbGVjdDogbnVsbCxcbiAgICAgICAgb25PcGVuOiBudWxsLFxuICAgICAgICBvbkNsb3NlOiBudWxsLFxuICAgICAgICBvbkRyYXc6IG51bGxcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiB0ZW1wbGF0aW5nIGZ1bmN0aW9ucyB0byBhYnN0cmFjdCBIVE1MIHJlbmRlcmluZ1xuICAgICAqL1xuICAgIHJlbmRlckRheU5hbWUgPSBmdW5jdGlvbihvcHRzLCBkYXksIGFiYnIpXG4gICAge1xuICAgICAgICBkYXkgKz0gb3B0cy5maXJzdERheTtcbiAgICAgICAgd2hpbGUgKGRheSA+PSA3KSB7XG4gICAgICAgICAgICBkYXkgLT0gNztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWJiciA/IG9wdHMuaTE4bi53ZWVrZGF5c1Nob3J0W2RheV0gOiBvcHRzLmkxOG4ud2Vla2RheXNbZGF5XTtcbiAgICB9LFxuXG4gICAgcmVuZGVyRGF5ID0gZnVuY3Rpb24ob3B0cylcbiAgICB7XG4gICAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgICAgdmFyIGFyaWFTZWxlY3RlZCA9ICdmYWxzZSc7XG4gICAgICAgIGlmIChvcHRzLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHMpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCgnaXMtb3V0c2lkZS1jdXJyZW50LW1vbnRoJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnPHRkIGNsYXNzPVwiaXMtZW1wdHlcIj48L3RkPic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLWRpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNUb2RheSkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXRvZGF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgYXJyLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICBhcmlhU2VsZWN0ZWQgPSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaGFzRXZlbnQpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdoYXMtZXZlbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5pc0luUmFuZ2UpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1pbnJhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMuaXNTdGFydFJhbmdlKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnaXMtc3RhcnRyYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLmlzRW5kUmFuZ2UpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKCdpcy1lbmRyYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnPHRkIGRhdGEtZGF5PVwiJyArIG9wdHMuZGF5ICsgJ1wiIGNsYXNzPVwiJyArIGFyci5qb2luKCcgJykgKyAnXCIgYXJpYS1zZWxlY3RlZD1cIicgKyBhcmlhU2VsZWN0ZWQgKyAnXCI+JyArXG4gICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwicGlrYS1idXR0b24gcGlrYS1kYXlcIiB0eXBlPVwiYnV0dG9uXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICdkYXRhLXBpa2EteWVhcj1cIicgKyBvcHRzLnllYXIgKyAnXCIgZGF0YS1waWthLW1vbnRoPVwiJyArIG9wdHMubW9udGggKyAnXCIgZGF0YS1waWthLWRheT1cIicgKyBvcHRzLmRheSArICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZGF5ICtcbiAgICAgICAgICAgICAgICAgJzwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgJzwvdGQ+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyV2VlayA9IGZ1bmN0aW9uIChkLCBtLCB5KSB7XG4gICAgICAgIC8vIExpZnRlZCBmcm9tIGh0dHA6Ly9qYXZhc2NyaXB0LmFib3V0LmNvbS9saWJyYXJ5L2Jsd2Vla3llYXIuaHRtLCBsaWdodGx5IG1vZGlmaWVkLlxuICAgICAgICB2YXIgb25lamFuID0gbmV3IERhdGUoeSwgMCwgMSksXG4gICAgICAgICAgICB3ZWVrTnVtID0gTWF0aC5jZWlsKCgoKG5ldyBEYXRlKHksIG0sIGQpIC0gb25lamFuKSAvIDg2NDAwMDAwKSArIG9uZWphbi5nZXREYXkoKSsxKS83KTtcbiAgICAgICAgcmV0dXJuICc8dGQgY2xhc3M9XCJwaWthLXdlZWtcIj4nICsgd2Vla051bSArICc8L3RkPic7XG4gICAgfSxcblxuICAgIHJlbmRlclJvdyA9IGZ1bmN0aW9uKGRheXMsIGlzUlRMKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICc8dHI+JyArIChpc1JUTCA/IGRheXMucmV2ZXJzZSgpIDogZGF5cykuam9pbignJykgKyAnPC90cj4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJCb2R5ID0gZnVuY3Rpb24ocm93cylcbiAgICB7XG4gICAgICAgIHJldHVybiAnPHRib2R5PicgKyByb3dzLmpvaW4oJycpICsgJzwvdGJvZHk+JztcbiAgICB9LFxuXG4gICAgcmVuZGVySGVhZCA9IGZ1bmN0aW9uKG9wdHMpXG4gICAge1xuICAgICAgICB2YXIgaSwgYXJyID0gW107XG4gICAgICAgIGlmIChvcHRzLnNob3dXZWVrTnVtYmVyKSB7XG4gICAgICAgICAgICBhcnIucHVzaCgnPHRoPjwvdGg+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgYXJyLnB1c2goJzx0aCBzY29wZT1cImNvbFwiPjxhYmJyIHRpdGxlPVwiJyArIHJlbmRlckRheU5hbWUob3B0cywgaSkgKyAnXCI+JyArIHJlbmRlckRheU5hbWUob3B0cywgaSwgdHJ1ZSkgKyAnPC9hYmJyPjwvdGg+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICc8dGhlYWQ+PHRyPicgKyAob3B0cy5pc1JUTCA/IGFyci5yZXZlcnNlKCkgOiBhcnIpLmpvaW4oJycpICsgJzwvdHI+PC90aGVhZD4nO1xuICAgIH0sXG5cbiAgICByZW5kZXJUaXRsZSA9IGZ1bmN0aW9uKGluc3RhbmNlLCBjLCB5ZWFyLCBtb250aCwgcmVmWWVhciwgcmFuZElkKVxuICAgIHtcbiAgICAgICAgdmFyIGksIGosIGFycixcbiAgICAgICAgICAgIG9wdHMgPSBpbnN0YW5jZS5fbyxcbiAgICAgICAgICAgIGlzTWluWWVhciA9IHllYXIgPT09IG9wdHMubWluWWVhcixcbiAgICAgICAgICAgIGlzTWF4WWVhciA9IHllYXIgPT09IG9wdHMubWF4WWVhcixcbiAgICAgICAgICAgIGh0bWwgPSAnPGRpdiBpZD1cIicgKyByYW5kSWQgKyAnXCIgY2xhc3M9XCJwaWthLXRpdGxlXCIgcm9sZT1cImhlYWRpbmdcIiBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIj4nLFxuICAgICAgICAgICAgbW9udGhIdG1sLFxuICAgICAgICAgICAgeWVhckh0bWwsXG4gICAgICAgICAgICBwcmV2ID0gdHJ1ZSxcbiAgICAgICAgICAgIG5leHQgPSB0cnVlO1xuXG4gICAgICAgIGZvciAoYXJyID0gW10sIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgYXJyLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgKHllYXIgPT09IHJlZlllYXIgPyBpIC0gYyA6IDEyICsgaSAtIGMpICsgJ1wiJyArXG4gICAgICAgICAgICAgICAgKGkgPT09IG1vbnRoID8gJyBzZWxlY3RlZD1cInNlbGVjdGVkXCInOiAnJykgK1xuICAgICAgICAgICAgICAgICgoaXNNaW5ZZWFyICYmIGkgPCBvcHRzLm1pbk1vbnRoKSB8fCAoaXNNYXhZZWFyICYmIGkgPiBvcHRzLm1heE1vbnRoKSA/ICdkaXNhYmxlZD1cImRpc2FibGVkXCInIDogJycpICsgJz4nICtcbiAgICAgICAgICAgICAgICBvcHRzLmkxOG4ubW9udGhzW2ldICsgJzwvb3B0aW9uPicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9udGhIdG1sID0gJzxkaXYgY2xhc3M9XCJwaWthLWxhYmVsXCI+JyArIG9wdHMuaTE4bi5tb250aHNbbW9udGhdICsgJzxzZWxlY3QgY2xhc3M9XCJwaWthLXNlbGVjdCBwaWthLXNlbGVjdC1tb250aFwiIHRhYmluZGV4PVwiLTFcIj4nICsgYXJyLmpvaW4oJycpICsgJzwvc2VsZWN0PjwvZGl2Pic7XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob3B0cy55ZWFyUmFuZ2UpKSB7XG4gICAgICAgICAgICBpID0gb3B0cy55ZWFyUmFuZ2VbMF07XG4gICAgICAgICAgICBqID0gb3B0cy55ZWFyUmFuZ2VbMV0gKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaSA9IHllYXIgLSBvcHRzLnllYXJSYW5nZTtcbiAgICAgICAgICAgIGogPSAxICsgeWVhciArIG9wdHMueWVhclJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChhcnIgPSBbXTsgaSA8IGogJiYgaSA8PSBvcHRzLm1heFllYXI7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPj0gb3B0cy5taW5ZZWFyKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgaSArICdcIicgKyAoaSA9PT0geWVhciA/ICcgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJzogJycpICsgJz4nICsgKGkpICsgJzwvb3B0aW9uPicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHllYXJIdG1sID0gJzxkaXYgY2xhc3M9XCJwaWthLWxhYmVsXCI+JyArIHllYXIgKyBvcHRzLnllYXJTdWZmaXggKyAnPHNlbGVjdCBjbGFzcz1cInBpa2Etc2VsZWN0IHBpa2Etc2VsZWN0LXllYXJcIiB0YWJpbmRleD1cIi0xXCI+JyArIGFyci5qb2luKCcnKSArICc8L3NlbGVjdD48L2Rpdj4nO1xuXG4gICAgICAgIGlmIChvcHRzLnNob3dNb250aEFmdGVyWWVhcikge1xuICAgICAgICAgICAgaHRtbCArPSB5ZWFySHRtbCArIG1vbnRoSHRtbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGh0bWwgKz0gbW9udGhIdG1sICsgeWVhckh0bWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNaW5ZZWFyICYmIChtb250aCA9PT0gMCB8fCBvcHRzLm1pbk1vbnRoID49IG1vbnRoKSkge1xuICAgICAgICAgICAgcHJldiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTWF4WWVhciAmJiAobW9udGggPT09IDExIHx8IG9wdHMubWF4TW9udGggPD0gbW9udGgpKSB7XG4gICAgICAgICAgICBuZXh0ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA9PT0gMCkge1xuICAgICAgICAgICAgaHRtbCArPSAnPGJ1dHRvbiBjbGFzcz1cInBpa2EtcHJldicgKyAocHJldiA/ICcnIDogJyBpcy1kaXNhYmxlZCcpICsgJ1wiIHR5cGU9XCJidXR0b25cIj4nICsgb3B0cy5pMThuLnByZXZpb3VzTW9udGggKyAnPC9idXR0b24+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gKGluc3RhbmNlLl9vLm51bWJlck9mTW9udGhzIC0gMSkgKSB7XG4gICAgICAgICAgICBodG1sICs9ICc8YnV0dG9uIGNsYXNzPVwicGlrYS1uZXh0JyArIChuZXh0ID8gJycgOiAnIGlzLWRpc2FibGVkJykgKyAnXCIgdHlwZT1cImJ1dHRvblwiPicgKyBvcHRzLmkxOG4ubmV4dE1vbnRoICsgJzwvYnV0dG9uPic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaHRtbCArPSAnPC9kaXY+JztcbiAgICB9LFxuXG4gICAgcmVuZGVyVGFibGUgPSBmdW5jdGlvbihvcHRzLCBkYXRhLCByYW5kSWQpXG4gICAge1xuICAgICAgICByZXR1cm4gJzx0YWJsZSBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBjbGFzcz1cInBpa2EtdGFibGVcIiByb2xlPVwiZ3JpZFwiIGFyaWEtbGFiZWxsZWRieT1cIicgKyByYW5kSWQgKyAnXCI+JyArIHJlbmRlckhlYWQob3B0cykgKyByZW5kZXJCb2R5KGRhdGEpICsgJzwvdGFibGU+JztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBQaWthZGF5IGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgUGlrYWRheSA9IGZ1bmN0aW9uKG9wdGlvbnMpXG4gICAge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBvcHRzID0gc2VsZi5jb25maWcob3B0aW9ucyk7XG5cbiAgICAgICAgc2VsZi5fb25Nb3VzZURvd24gPSBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuX3YpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaGFzQ2xhc3ModGFyZ2V0LCAnaXMtZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0YXJnZXQsICdwaWthLWJ1dHRvbicpICYmICFoYXNDbGFzcyh0YXJnZXQsICdpcy1lbXB0eScpICYmICFoYXNDbGFzcyh0YXJnZXQucGFyZW50Tm9kZSwgJ2lzLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKG5ldyBEYXRlKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGlrYS15ZWFyJyksIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGlrYS1tb250aCcpLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBpa2EtZGF5JykpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuYm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0byhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5ibHVyRmllbGRPblNlbGVjdCAmJiBvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZmllbGQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1wcmV2JykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wcmV2TW9udGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1uZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXh0TW9udGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIHRvdWNoIGV2ZW50IHByZXZlbnQgbW91c2UgZXZlbnRzIGVtdWxhdGlvblxuICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuX2MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uQ2hhbmdlID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHRhcmdldCwgJ3Bpa2Etc2VsZWN0LW1vbnRoJykpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9Nb250aCh0YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QteWVhcicpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb3RvWWVhcih0YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uS2V5Q2hhbmdlID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5pc1Zpc2libGUoKSkge1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoKGUua2V5Q29kZSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZmllbGQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkanVzdERhdGUoJ3N1YnRyYWN0JywgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0RGF0ZSgnc3VidHJhY3QnLCA3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdhZGQnLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGp1c3REYXRlKCdhZGQnLCA3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Q2hhbmdlID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGRhdGU7XG5cbiAgICAgICAgICAgIGlmIChlLmZpcmVkQnkgPT09IHNlbGYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzTW9tZW50KSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG1vbWVudChvcHRzLmZpZWxkLnZhbHVlLCBvcHRzLmZvcm1hdCwgb3B0cy5mb3JtYXRTdHJpY3QpO1xuICAgICAgICAgICAgICAgIGRhdGUgPSAoZGF0ZSAmJiBkYXRlLmlzVmFsaWQoKSkgPyBkYXRlLnRvRGF0ZSgpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKG9wdHMuZmllbGQudmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0RhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKGRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzZWxmLl92KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5fb25JbnB1dEZvY3VzID0gZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbklucHV0Q2xpY2sgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX29uSW5wdXRCbHVyID0gZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBJRSBhbGxvd3MgcGlrYSBkaXYgdG8gZ2FpbiBmb2N1czsgY2F0Y2ggYmx1ciB0aGUgaW5wdXQgZmllbGRcbiAgICAgICAgICAgIHZhciBwRWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyhwRWwsICdwaWthLXNpbmdsZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoKHBFbCA9IHBFbC5wYXJlbnROb2RlKSk7XG5cbiAgICAgICAgICAgIGlmICghc2VsZi5fYykge1xuICAgICAgICAgICAgICAgIHNlbGYuX2IgPSBzdG8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuX2MgPSBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLl9vbkNsaWNrID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCxcbiAgICAgICAgICAgICAgICBwRWwgPSB0YXJnZXQ7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaGFzRXZlbnRMaXN0ZW5lcnMgJiYgaGFzQ2xhc3ModGFyZ2V0LCAncGlrYS1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0Lm9uY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ29uY2hhbmdlJywgJ3JldHVybjsnKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkRXZlbnQodGFyZ2V0LCAnY2hhbmdlJywgc2VsZi5fb25DaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3MocEVsLCAncGlrYS1zaW5nbGUnKSB8fCBwRWwgPT09IG9wdHMudHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKChwRWwgPSBwRWwucGFyZW50Tm9kZSkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuX3YgJiYgdGFyZ2V0ICE9PSBvcHRzLnRyaWdnZXIgJiYgcEVsICE9PSBvcHRzLnRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNlbGYuZWwuY2xhc3NOYW1lID0gJ3Bpa2Etc2luZ2xlJyArIChvcHRzLmlzUlRMID8gJyBpcy1ydGwnIDogJycpICsgKG9wdHMudGhlbWUgPyAnICcgKyBvcHRzLnRoZW1lIDogJycpO1xuXG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICdtb3VzZWRvd24nLCBzZWxmLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgIGFkZEV2ZW50KHNlbGYuZWwsICd0b3VjaGVuZCcsIHNlbGYuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgYWRkRXZlbnQoc2VsZi5lbCwgJ2NoYW5nZScsIHNlbGYuX29uQ2hhbmdlKTtcbiAgICAgICAgYWRkRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJywgc2VsZi5fb25LZXlDaGFuZ2UpO1xuXG4gICAgICAgIGlmIChvcHRzLmZpZWxkKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5jb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VsZi5lbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMuZmllbGQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VsZi5lbCwgb3B0cy5maWVsZC5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRFdmVudChvcHRzLmZpZWxkLCAnY2hhbmdlJywgc2VsZi5fb25JbnB1dENoYW5nZSk7XG5cbiAgICAgICAgICAgIGlmICghb3B0cy5kZWZhdWx0RGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNNb21lbnQgJiYgb3B0cy5maWVsZC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRlZmF1bHREYXRlID0gbW9tZW50KG9wdHMuZmllbGQudmFsdWUsIG9wdHMuZm9ybWF0KS50b0RhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmRlZmF1bHREYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShvcHRzLmZpZWxkLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdHMuc2V0RGVmYXVsdERhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlZkRhdGUgPSBvcHRzLmRlZmF1bHREYXRlO1xuXG4gICAgICAgIGlmIChpc0RhdGUoZGVmRGF0ZSkpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnNldERlZmF1bHREYXRlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKGRlZkRhdGUsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdvdG9EYXRlKGRlZkRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5nb3RvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzLmJvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIHNlbGYuZWwuY2xhc3NOYW1lICs9ICcgaXMtYm91bmQnO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnY2xpY2snLCBzZWxmLl9vbklucHV0Q2xpY2spO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnZm9jdXMnLCBzZWxmLl9vbklucHV0Rm9jdXMpO1xuICAgICAgICAgICAgYWRkRXZlbnQob3B0cy50cmlnZ2VyLCAnYmx1cicsIHNlbGYuX29uSW5wdXRCbHVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogcHVibGljIFBpa2FkYXkgQVBJXG4gICAgICovXG4gICAgUGlrYWRheS5wcm90b3R5cGUgPSB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogY29uZmlndXJlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICovXG4gICAgICAgIGNvbmZpZzogZnVuY3Rpb24ob3B0aW9ucylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9vKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbyA9IGV4dGVuZCh7fSwgZGVmYXVsdHMsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb3B0cyA9IGV4dGVuZCh0aGlzLl9vLCBvcHRpb25zLCB0cnVlKTtcblxuICAgICAgICAgICAgb3B0cy5pc1JUTCA9ICEhb3B0cy5pc1JUTDtcblxuICAgICAgICAgICAgb3B0cy5maWVsZCA9IChvcHRzLmZpZWxkICYmIG9wdHMuZmllbGQubm9kZU5hbWUpID8gb3B0cy5maWVsZCA6IG51bGw7XG5cbiAgICAgICAgICAgIG9wdHMudGhlbWUgPSAodHlwZW9mIG9wdHMudGhlbWUpID09PSAnc3RyaW5nJyAmJiBvcHRzLnRoZW1lID8gb3B0cy50aGVtZSA6IG51bGw7XG5cbiAgICAgICAgICAgIG9wdHMuYm91bmQgPSAhIShvcHRzLmJvdW5kICE9PSB1bmRlZmluZWQgPyBvcHRzLmZpZWxkICYmIG9wdHMuYm91bmQgOiBvcHRzLmZpZWxkKTtcblxuICAgICAgICAgICAgb3B0cy50cmlnZ2VyID0gKG9wdHMudHJpZ2dlciAmJiBvcHRzLnRyaWdnZXIubm9kZU5hbWUpID8gb3B0cy50cmlnZ2VyIDogb3B0cy5maWVsZDtcblxuICAgICAgICAgICAgb3B0cy5kaXNhYmxlV2Vla2VuZHMgPSAhIW9wdHMuZGlzYWJsZVdlZWtlbmRzO1xuXG4gICAgICAgICAgICBvcHRzLmRpc2FibGVEYXlGbiA9ICh0eXBlb2Ygb3B0cy5kaXNhYmxlRGF5Rm4pID09PSAnZnVuY3Rpb24nID8gb3B0cy5kaXNhYmxlRGF5Rm4gOiBudWxsO1xuXG4gICAgICAgICAgICB2YXIgbm9tID0gcGFyc2VJbnQob3B0cy5udW1iZXJPZk1vbnRocywgMTApIHx8IDE7XG4gICAgICAgICAgICBvcHRzLm51bWJlck9mTW9udGhzID0gbm9tID4gNCA/IDQgOiBub207XG5cbiAgICAgICAgICAgIGlmICghaXNEYXRlKG9wdHMubWluRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1pbkRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNEYXRlKG9wdHMubWF4RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvcHRzLm1heERhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob3B0cy5taW5EYXRlICYmIG9wdHMubWF4RGF0ZSkgJiYgb3B0cy5tYXhEYXRlIDwgb3B0cy5taW5EYXRlKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5tYXhEYXRlID0gb3B0cy5taW5EYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5taW5EYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNaW5EYXRlKG9wdHMubWluRGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5tYXhEYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNYXhEYXRlKG9wdHMubWF4RGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5KG9wdHMueWVhclJhbmdlKSkge1xuICAgICAgICAgICAgICAgIHZhciBmYWxsYmFjayA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIDEwO1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlWzBdID0gcGFyc2VJbnQob3B0cy55ZWFyUmFuZ2VbMF0sIDEwKSB8fCBmYWxsYmFjaztcbiAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZVsxXSA9IHBhcnNlSW50KG9wdHMueWVhclJhbmdlWzFdLCAxMCkgfHwgZmFsbGJhY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMueWVhclJhbmdlID0gTWF0aC5hYnMocGFyc2VJbnQob3B0cy55ZWFyUmFuZ2UsIDEwKSkgfHwgZGVmYXVsdHMueWVhclJhbmdlO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnllYXJSYW5nZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLnllYXJSYW5nZSA9IDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvcHRzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAodXNpbmcgTW9tZW50LmpzIGlmIGF2YWlsYWJsZSlcbiAgICAgICAgICovXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbihmb3JtYXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiAhaXNEYXRlKHRoaXMuX2QpID8gJycgOiBoYXNNb21lbnQgPyBtb21lbnQodGhpcy5fZCkuZm9ybWF0KGZvcm1hdCB8fCB0aGlzLl9vLmZvcm1hdCkgOiB0aGlzLl9kLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm4gYSBNb21lbnQuanMgb2JqZWN0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAoaWYgYXZhaWxhYmxlKVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0TW9tZW50OiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBoYXNNb21lbnQgPyBtb21lbnQodGhpcy5fZCkgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGZyb20gYSBNb21lbnQuanMgb2JqZWN0IChpZiBhdmFpbGFibGUpXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNb21lbnQ6IGZ1bmN0aW9uKGRhdGUsIHByZXZlbnRPblNlbGVjdClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGhhc01vbWVudCAmJiBtb21lbnQuaXNNb21lbnQoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoZGF0ZS50b0RhdGUoKSwgcHJldmVudE9uU2VsZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJuIGEgRGF0ZSBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBnZXREYXRlOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBpc0RhdGUodGhpcy5fZCkgPyBuZXcgRGF0ZSh0aGlzLl9kLmdldFRpbWUoKSkgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBzZXREYXRlOiBmdW5jdGlvbihkYXRlLCBwcmV2ZW50T25TZWxlY3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2QgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX28uZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5maWVsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQodGhpcy5fby5maWVsZCwgJ2NoYW5nZScsIHsgZmlyZWRCeTogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoZGF0ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0RhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtaW4gPSB0aGlzLl9vLm1pbkRhdGUsXG4gICAgICAgICAgICAgICAgbWF4ID0gdGhpcy5fby5tYXhEYXRlO1xuXG4gICAgICAgICAgICBpZiAoaXNEYXRlKG1pbikgJiYgZGF0ZSA8IG1pbikge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBtaW47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShtYXgpICYmIGRhdGUgPiBtYXgpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbWF4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHRoaXMuX2QpO1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZSh0aGlzLl9kKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX28uZmllbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLmZpZWxkLnZhbHVlID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudCh0aGlzLl9vLmZpZWxkLCAnY2hhbmdlJywgeyBmaXJlZEJ5OiB0aGlzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwcmV2ZW50T25TZWxlY3QgJiYgdHlwZW9mIHRoaXMuX28ub25TZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm9uU2VsZWN0LmNhbGwodGhpcywgdGhpcy5nZXREYXRlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdmlldyB0byBhIHNwZWNpZmljIGRhdGVcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9EYXRlOiBmdW5jdGlvbihkYXRlKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbmV3Q2FsZW5kYXIgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpcnN0VmlzaWJsZURhdGUgPSBuZXcgRGF0ZSh0aGlzLmNhbGVuZGFyc1swXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1swXS5tb250aCwgMSksXG4gICAgICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZSA9IG5ldyBEYXRlKHRoaXMuY2FsZW5kYXJzW3RoaXMuY2FsZW5kYXJzLmxlbmd0aC0xXS55ZWFyLCB0aGlzLmNhbGVuZGFyc1t0aGlzLmNhbGVuZGFycy5sZW5ndGgtMV0ubW9udGgsIDEpLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlRGF0ZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgZW5kIG9mIHRoZSBtb250aFxuICAgICAgICAgICAgICAgIGxhc3RWaXNpYmxlRGF0ZS5zZXRNb250aChsYXN0VmlzaWJsZURhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAgICAgICAgICAgICBsYXN0VmlzaWJsZURhdGUuc2V0RGF0ZShsYXN0VmlzaWJsZURhdGUuZ2V0RGF0ZSgpLTEpO1xuICAgICAgICAgICAgICAgIG5ld0NhbGVuZGFyID0gKHZpc2libGVEYXRlIDwgZmlyc3RWaXNpYmxlRGF0ZS5nZXRUaW1lKCkgfHwgbGFzdFZpc2libGVEYXRlLmdldFRpbWUoKSA8IHZpc2libGVEYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0NhbGVuZGFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnMgPSBbe1xuICAgICAgICAgICAgICAgICAgICBtb250aDogZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5tYWluQ2FsZW5kYXIgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggKz0gMSAtIHRoaXMuX28ubnVtYmVyT2ZNb250aHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkanVzdERhdGU6IGZ1bmN0aW9uKHNpZ24sIGRheXMpIHtcblxuICAgICAgICAgICAgdmFyIGRheSA9IHRoaXMuZ2V0RGF0ZSgpIHx8IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IHBhcnNlSW50KGRheXMpKjI0KjYwKjYwKjEwMDA7XG5cbiAgICAgICAgICAgIHZhciBuZXdEYXk7XG5cbiAgICAgICAgICAgIGlmIChzaWduID09PSAnYWRkJykge1xuICAgICAgICAgICAgICAgIG5ld0RheSA9IG5ldyBEYXRlKGRheS52YWx1ZU9mKCkgKyBkaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2lnbiA9PT0gJ3N1YnRyYWN0Jykge1xuICAgICAgICAgICAgICAgIG5ld0RheSA9IG5ldyBEYXRlKGRheS52YWx1ZU9mKCkgLSBkaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhhc01vbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChzaWduID09PSAnYWRkJykge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXkgPSBtb21lbnQoZGF5KS5hZGQoZGF5cywgXCJkYXlzXCIpLnRvRGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2lnbiA9PT0gJ3N1YnRyYWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXkgPSBtb21lbnQoZGF5KS5zdWJ0cmFjdChkYXlzLCBcImRheXNcIikudG9EYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldERhdGUobmV3RGF5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGp1c3RDYWxlbmRhcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0gPSBhZGp1c3RDYWxlbmRhcih0aGlzLmNhbGVuZGFyc1swXSk7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMTsgYyA8IHRoaXMuX28ubnVtYmVyT2ZNb250aHM7IGMrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzW2NdID0gYWRqdXN0Q2FsZW5kYXIoe1xuICAgICAgICAgICAgICAgICAgICBtb250aDogdGhpcy5jYWxlbmRhcnNbMF0ubW9udGggKyBjLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiB0aGlzLmNhbGVuZGFyc1swXS55ZWFyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnb3RvVG9kYXk6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5nb3RvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHZpZXcgdG8gYSBzcGVjaWZpYyBtb250aCAoemVyby1pbmRleCwgZS5nLiAwOiBKYW51YXJ5KVxuICAgICAgICAgKi9cbiAgICAgICAgZ290b01vbnRoOiBmdW5jdGlvbihtb250aClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFpc05hTihtb250aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyc1swXS5tb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RDYWxlbmRhcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBuZXh0TW9udGg6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ubW9udGgrKztcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0Q2FsZW5kYXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJldk1vbnRoOiBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJzWzBdLm1vbnRoLS07XG4gICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdmlldyB0byBhIHNwZWNpZmljIGZ1bGwgeWVhciAoZS5nLiBcIjIwMTJcIilcbiAgICAgICAgICovXG4gICAgICAgIGdvdG9ZZWFyOiBmdW5jdGlvbih5ZWFyKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHllYXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhcnNbMF0ueWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkanVzdENhbGVuZGFycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGFuZ2UgdGhlIG1pbkRhdGVcbiAgICAgICAgICovXG4gICAgICAgIHNldE1pbkRhdGU6IGZ1bmN0aW9uKHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBzZXRUb1N0YXJ0T2ZEYXkodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluRGF0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluWWVhciAgPSB2YWx1ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluTW9udGggPSB2YWx1ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1pbkRhdGUgPSBkZWZhdWx0cy5taW5EYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluWWVhciAgPSBkZWZhdWx0cy5taW5ZZWFyO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWluTW9udGggPSBkZWZhdWx0cy5taW5Nb250aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLnN0YXJ0UmFuZ2UgPSBkZWZhdWx0cy5zdGFydFJhbmdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIHRoZSBtYXhEYXRlXG4gICAgICAgICAqL1xuICAgICAgICBzZXRNYXhEYXRlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgc2V0VG9TdGFydE9mRGF5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heERhdGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heFllYXIgPSB2YWx1ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4TW9udGggPSB2YWx1ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vLm1heERhdGUgPSBkZWZhdWx0cy5tYXhEYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuX28ubWF4WWVhciA9IGRlZmF1bHRzLm1heFllYXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fby5tYXhNb250aCA9IGRlZmF1bHRzLm1heE1vbnRoO1xuICAgICAgICAgICAgICAgIHRoaXMuX28uZW5kUmFuZ2UgPSBkZWZhdWx0cy5lbmRSYW5nZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0U3RhcnRSYW5nZTogZnVuY3Rpb24odmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX28uc3RhcnRSYW5nZSA9IHZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldEVuZFJhbmdlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fby5lbmRSYW5nZSA9IHZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZWZyZXNoIHRoZSBIVE1MXG4gICAgICAgICAqL1xuICAgICAgICBkcmF3OiBmdW5jdGlvbihmb3JjZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl92ICYmICFmb3JjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvcHRzID0gdGhpcy5fbyxcbiAgICAgICAgICAgICAgICBtaW5ZZWFyID0gb3B0cy5taW5ZZWFyLFxuICAgICAgICAgICAgICAgIG1heFllYXIgPSBvcHRzLm1heFllYXIsXG4gICAgICAgICAgICAgICAgbWluTW9udGggPSBvcHRzLm1pbk1vbnRoLFxuICAgICAgICAgICAgICAgIG1heE1vbnRoID0gb3B0cy5tYXhNb250aCxcbiAgICAgICAgICAgICAgICBodG1sID0gJycsXG4gICAgICAgICAgICAgICAgcmFuZElkO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5feSA8PSBtaW5ZZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IG1pblllYXI7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihtaW5Nb250aCkgJiYgdGhpcy5fbSA8IG1pbk1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX20gPSBtaW5Nb250aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5feSA+PSBtYXhZZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IG1heFllYXI7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihtYXhNb250aCkgJiYgdGhpcy5fbSA+IG1heE1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX20gPSBtYXhNb250aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJhbmRJZCA9ICdwaWthLXRpdGxlLScgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5yZXBsYWNlKC9bXmEtel0rL2csICcnKS5zdWJzdHIoMCwgMik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgb3B0cy5udW1iZXJPZk1vbnRoczsgYysrKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInBpa2EtbGVuZGFyXCI+JyArIHJlbmRlclRpdGxlKHRoaXMsIGMsIHRoaXMuY2FsZW5kYXJzW2NdLnllYXIsIHRoaXMuY2FsZW5kYXJzW2NdLm1vbnRoLCB0aGlzLmNhbGVuZGFyc1swXS55ZWFyLCByYW5kSWQpICsgdGhpcy5yZW5kZXIodGhpcy5jYWxlbmRhcnNbY10ueWVhciwgdGhpcy5jYWxlbmRhcnNbY10ubW9udGgsIHJhbmRJZCkgKyAnPC9kaXY+JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSBodG1sO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIGlmKG9wdHMuZmllbGQudHlwZSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy50cmlnZ2VyLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vLm9uRHJhdyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX28ub25EcmF3KHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5ib3VuZCkge1xuICAgICAgICAgICAgICAgIC8vIGxldCB0aGUgc2NyZWVuIHJlYWRlciB1c2VyIGtub3cgdG8gdXNlIGFycm93IGtleXNcbiAgICAgICAgICAgICAgICBvcHRzLmZpZWxkLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdVc2UgdGhlIGFycm93IGtleXMgdG8gcGljayBhIGRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBhZGp1c3RQb3NpdGlvbjogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZmllbGQsIHBFbCwgd2lkdGgsIGhlaWdodCwgdmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQsIHNjcm9sbFRvcCwgbGVmdCwgdG9wLCBjbGllbnRSZWN0O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fby5jb250YWluZXIpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICAgICAgICAgIGZpZWxkID0gdGhpcy5fby50cmlnZ2VyO1xuICAgICAgICAgICAgcEVsID0gZmllbGQ7XG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2xpZW50UmVjdCA9IGZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIGxlZnQgPSBjbGllbnRSZWN0LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgdG9wID0gY2xpZW50UmVjdC5ib3R0b20gKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBwRWwub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICB0b3AgID0gcEVsLm9mZnNldFRvcCArIHBFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgd2hpbGUoKHBFbCA9IHBFbC5vZmZzZXRQYXJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgKz0gcEVsLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgICAgIHRvcCAgKz0gcEVsLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQgcG9zaXRpb24gaXMgYm90dG9tICYgbGVmdFxuICAgICAgICAgICAgaWYgKCh0aGlzLl9vLnJlcG9zaXRpb24gJiYgbGVmdCArIHdpZHRoID4gdmlld3BvcnRXaWR0aCkgfHxcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX28ucG9zaXRpb24uaW5kZXhPZigncmlnaHQnKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgLSB3aWR0aCArIGZpZWxkLm9mZnNldFdpZHRoID4gMFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBsZWZ0IC0gd2lkdGggKyBmaWVsZC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy5fby5yZXBvc2l0aW9uICYmIHRvcCArIGhlaWdodCA+IHZpZXdwb3J0SGVpZ2h0ICsgc2Nyb2xsVG9wKSB8fFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5wb3NpdGlvbi5pbmRleE9mKCd0b3AnKSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIHRvcCAtIGhlaWdodCAtIGZpZWxkLm9mZnNldEhlaWdodCA+IDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSB0b3AgLSBoZWlnaHQgLSBmaWVsZC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW5kZXIgSFRNTCBmb3IgYSBwYXJ0aWN1bGFyIG1vbnRoXG4gICAgICAgICAqL1xuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKHllYXIsIG1vbnRoLCByYW5kSWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRzICAgPSB0aGlzLl9vLFxuICAgICAgICAgICAgICAgIG5vdyAgICA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgZGF5cyAgID0gZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpLFxuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBkYXRhICAgPSBbXSxcbiAgICAgICAgICAgICAgICByb3cgICAgPSBbXTtcbiAgICAgICAgICAgIHNldFRvU3RhcnRPZkRheShub3cpO1xuICAgICAgICAgICAgaWYgKG9wdHMuZmlyc3REYXkgPiAwKSB7XG4gICAgICAgICAgICAgICAgYmVmb3JlIC09IG9wdHMuZmlyc3REYXk7XG4gICAgICAgICAgICAgICAgaWYgKGJlZm9yZSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlICs9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByZXZpb3VzTW9udGggPSBtb250aCA9PT0gMCA/IDExIDogbW9udGggLSAxLFxuICAgICAgICAgICAgICAgIG5leHRNb250aCA9IG1vbnRoID09PSAxMSA/IDAgOiBtb250aCArIDEsXG4gICAgICAgICAgICAgICAgeWVhck9mUHJldmlvdXNNb250aCA9IG1vbnRoID09PSAwID8geWVhciAtIDEgOiB5ZWFyLFxuICAgICAgICAgICAgICAgIHllYXJPZk5leHRNb250aCA9IG1vbnRoID09PSAxMSA/IHllYXIgKyAxIDogeWVhcixcbiAgICAgICAgICAgICAgICBkYXlzSW5QcmV2aW91c01vbnRoID0gZ2V0RGF5c0luTW9udGgoeWVhck9mUHJldmlvdXNNb250aCwgcHJldmlvdXNNb250aCk7XG4gICAgICAgICAgICB2YXIgY2VsbHMgPSBkYXlzICsgYmVmb3JlLFxuICAgICAgICAgICAgICAgIGFmdGVyID0gY2VsbHM7XG4gICAgICAgICAgICB3aGlsZShhZnRlciA+IDcpIHtcbiAgICAgICAgICAgICAgICBhZnRlciAtPSA3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2VsbHMgKz0gNyAtIGFmdGVyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHIgPSAwOyBpIDwgY2VsbHM7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEgKyAoaSAtIGJlZm9yZSkpLFxuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID0gaXNEYXRlKHRoaXMuX2QpID8gY29tcGFyZURhdGVzKGRheSwgdGhpcy5fZCkgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaXNUb2RheSA9IGNvbXBhcmVEYXRlcyhkYXksIG5vdyksXG4gICAgICAgICAgICAgICAgICAgIGhhc0V2ZW50ID0gb3B0cy5ldmVudHMuaW5kZXhPZihkYXkudG9EYXRlU3RyaW5nKCkpICE9PSAtMSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaXNFbXB0eSA9IGkgPCBiZWZvcmUgfHwgaSA+PSAoZGF5cyArIGJlZm9yZSksXG4gICAgICAgICAgICAgICAgICAgIGRheU51bWJlciA9IDEgKyAoaSAtIGJlZm9yZSksXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTnVtYmVyID0gbW9udGgsXG4gICAgICAgICAgICAgICAgICAgIHllYXJOdW1iZXIgPSB5ZWFyLFxuICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0UmFuZ2UgPSBvcHRzLnN0YXJ0UmFuZ2UgJiYgY29tcGFyZURhdGVzKG9wdHMuc3RhcnRSYW5nZSwgZGF5KSxcbiAgICAgICAgICAgICAgICAgICAgaXNFbmRSYW5nZSA9IG9wdHMuZW5kUmFuZ2UgJiYgY29tcGFyZURhdGVzKG9wdHMuZW5kUmFuZ2UsIGRheSksXG4gICAgICAgICAgICAgICAgICAgIGlzSW5SYW5nZSA9IG9wdHMuc3RhcnRSYW5nZSAmJiBvcHRzLmVuZFJhbmdlICYmIG9wdHMuc3RhcnRSYW5nZSA8IGRheSAmJiBkYXkgPCBvcHRzLmVuZFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkID0gKG9wdHMubWluRGF0ZSAmJiBkYXkgPCBvcHRzLm1pbkRhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0cy5tYXhEYXRlICYmIGRheSA+IG9wdHMubWF4RGF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLmRpc2FibGVXZWVrZW5kcyAmJiBpc1dlZWtlbmQoZGF5KSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLmRpc2FibGVEYXlGbiAmJiBvcHRzLmRpc2FibGVEYXlGbihkYXkpKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIgPSBkYXlzSW5QcmV2aW91c01vbnRoICsgZGF5TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBwcmV2aW91c01vbnRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhck51bWJlciA9IHllYXJPZlByZXZpb3VzTW9udGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlOdW1iZXIgPSBkYXlOdW1iZXIgLSBkYXlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhOdW1iZXIgPSBuZXh0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyTnVtYmVyID0geWVhck9mTmV4dE1vbnRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRheUNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogZGF5TnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6IG1vbnRoTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogeWVhck51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0V2ZW50OiBoYXNFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGlzU2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RvZGF5OiBpc1RvZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEaXNhYmxlZDogaXNEaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW1wdHk6IGlzRW1wdHksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0UmFuZ2U6IGlzU3RhcnRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5kUmFuZ2U6IGlzRW5kUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0luUmFuZ2U6IGlzSW5SYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dEYXlzSW5OZXh0QW5kUHJldmlvdXNNb250aHM6IG9wdHMuc2hvd0RheXNJbk5leHRBbmRQcmV2aW91c01vbnRoc1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcm93LnB1c2gocmVuZGVyRGF5KGRheUNvbmZpZykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCsrciA9PT0gNykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5zaG93V2Vla051bWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LnVuc2hpZnQocmVuZGVyV2VlayhpIC0gYmVmb3JlLCBtb250aCwgeWVhcikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChyZW5kZXJSb3cocm93LCBvcHRzLmlzUlRMKSk7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICByID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyVGFibGUob3B0cywgZGF0YSwgcmFuZElkKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc1Zpc2libGU6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Y7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdzogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRFdmVudChkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbCwgJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fby5vbk9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5vbk9wZW4uY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZTogZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdiA9IHRoaXMuX3Y7XG4gICAgICAgICAgICBpZiAodiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fby5ib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudChkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJzsgLy8gcmVzZXRcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5lbCwgJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3YgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB0aGlzLl9vLm9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fby5vbkNsb3NlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHQU1FIE9WRVJcbiAgICAgICAgICovXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLmVsLCAnbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5lbCwgJ3RvdWNoZW5kJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5lbCwgJ2NoYW5nZScsIHRoaXMuX29uQ2hhbmdlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5fby5maWVsZCwgJ2NoYW5nZScsIHRoaXMuX29uSW5wdXRDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vLmJvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KHRoaXMuX28udHJpZ2dlciwgJ2NsaWNrJywgdGhpcy5fb25JbnB1dENsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnQodGhpcy5fby50cmlnZ2VyLCAnZm9jdXMnLCB0aGlzLl9vbklucHV0Rm9jdXMpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudCh0aGlzLl9vLnRyaWdnZXIsICdibHVyJywgdGhpcy5fb25JbnB1dEJsdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICByZXR1cm4gUGlrYWRheTtcblxufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tb2R1bGVzL3ZlbmRvci9waWthZGF5LmpzIiwidmFyIG1hcCA9IHtcblx0XCIuL3Bpa2FkYXlcIjogNCxcblx0XCIuL3Bpa2FkYXkuanNcIjogNFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRyZXR1cm4gbWFwW3JlcV0gfHwgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKSB9KCkpO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA1O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tb2R1bGVzL3ZlbmRvciBeXFwuXFwvLiokXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQG1vZHVsZSBzY2hlZHVsZVxuICovXG5cbmltcG9ydCBkYXRlVXRpbHMgZnJvbSAnLi9kYXRlVXRpbHMnO1xuaW1wb3J0IFNDSEVEVUxFX0RBVEEgZnJvbSAnLi4vZGF0YSc7XG5cbmxldCBsZWN0dXJlRGF0YSA9IFtdLFxuICAgIHNjaGVkdWxlQ29udGFpbmVyO1xuXG5mdW5jdGlvbiBvbkNsaWNrSGFuZGxlcihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2NoZWR1bGUtaXRlbV9fbGVjdHVyZXJcIikpIHtcbiAgICAgICAgJChldmVudC50YXJnZXQpLnNpYmxpbmdzKFwiLnNjaGVkdWxlLWxlY3R1cmVyXCIpLnNsaWRlVG9nZ2xlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcmVwYXJlTGVjdHVyZURhdGEoaXRlbSkge1xuICAgIGxldCBzdGFydERhdGUgPSBuZXcgRGF0ZShpdGVtLnN0YXJ0KSxcbiAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKGl0ZW0uZW5kKSxcbiAgICAgICAgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgaXRlbS5jb21wbGV0ZWQgPSAoRGF0ZS5wYXJzZShpdGVtLnN0YXJ0KSA8IHRvZGF5KTtcbiAgICBpdGVtLmRhdGUgPSBkYXRlVXRpbHMuZm9ybWF0RGF0ZShzdGFydERhdGUpO1xuICAgIGl0ZW0udGltZSA9IGRhdGVVdGlscy5nZXRUaW1lKHN0YXJ0RGF0ZSkgKyAnIC0gJyArIGRhdGVVdGlscy5nZXRUaW1lKGVuZERhdGUpO1xuICAgIGl0ZW0uc2Nob29sTGlzdCA9IGl0ZW0uc2Nob29sLm1hcCgoc2Nob29sRGF0YSkgPT4gc2Nob29sRGF0YS5uYW1lKS5qb2luKFwiLCBcIik7XG5cbiAgICByZXR1cm4gaXRlbTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyKGxlY3R1cmUpIHtcbiAgICBzY2hlZHVsZUNvbnRhaW5lci5pbm5lckhUTUwgPSBTY2hlZHVsZUFwcC50ZW1wbGF0ZXMuc2NoZWR1bGUuaXRlbSh7aXRlbXM6IGxlY3R1cmV9KTtcbn1cblxuZnVuY3Rpb24gZmlsdGVySXRlbXMoZmlsdGVyVmFsdWVzKSB7XG4gICAgbGV0IGZpbHRlcmVkTGVjdHVyZSA9IFtdO1xuXG4gICAgZmlsdGVyVmFsdWVzLmRhdGUgPSBmaWx0ZXJWYWx1ZXMuZGF0ZSA/IGRhdGVVdGlscy5mb3JtYXREYXRlKG5ldyBEYXRlKGZpbHRlclZhbHVlcy5kYXRlKSkgOiBmYWxzZTtcblxuICAgIGxlY3R1cmVEYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgbGV0IGxlY3R1cmUgPSAkLmV4dGVuZCh0cnVlLCB7fSwgaXRlbSksXG4gICAgICAgICAgICB2YWxpZCA9IHRydWU7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGZpbHRlclZhbHVlcykge1xuICAgICAgICAgICAgaWYgKGZpbHRlclZhbHVlcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGZpbHRlclZhbHVlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJWYWx1ZXNba2V5XSAhPT0gbGVjdHVyZS5kYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2Nob29sXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbGVjdHVyZVtrZXldLmV2ZXJ5KChpdGVtKSA9PiBpdGVtLmlkICE9PSBmaWx0ZXJWYWx1ZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGVjdHVyZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWN0dXJlW2tleV0uaWQgIT09IGZpbHRlclZhbHVlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZExlY3R1cmUucHVzaChsZWN0dXJlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVuZGVyKGZpbHRlcmVkTGVjdHVyZSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc2NoZWR1bGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjaGVkdWxlXCIpO1xuXG4gICAgU0NIRURVTEVfREFUQS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGxldCBkYXRhID0gJC5leHRlbmQodHJ1ZSwge30sIGl0ZW0pO1xuICAgICAgICBsZWN0dXJlRGF0YS5wdXNoKHByZXBhcmVMZWN0dXJlRGF0YShkYXRhKSk7XG4gICAgfSk7XG4gICAgcmVuZGVyKGxlY3R1cmVEYXRhKTtcbiAgICBzY2hlZHVsZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGlja0hhbmRsZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7ZmlsdGVySXRlbXMsIGluaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvbW9kdWxlcy9zY2hlZHVsZS5qcyIsImxldCBTQ0hFRFVMRV9EQVRBID0gW1xuICAgIHtcbiAgICAgICAgdGl0bGU6IFwi0JDQtNCw0L/RgtC40LLQvdCw0Y8g0LLRkdGA0YHRgtC60LBcIixcbiAgICAgICAgc3RhcnQ6IFwiMjAxNy0wNC0xMVQxNjowMDowMC4wMDBaXCIsXG4gICAgICAgIGVuZDogXCIyMDE3LTA0LTExVDE4OjAwOjAwLjAwMFpcIixcbiAgICAgICAgcGxhY2U6IFwi0JrRgNCw0YHQvdCw0Y8g0LDRg9C00LjRgtC+0YDQuNGPXCIsXG4gICAgICAgIGxlY3R1cmVyOiB7XG4gICAgICAgICAgICBpZDogJ2xlY3R1cmVyLTAnLFxuICAgICAgICAgICAgbmFtZTogXCLQlNC80LjRgtGA0LjQuSDQlNGD0YjQutC40L1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcItCa0LDQvdC00LjQtNCw0YIg0YLQtdGF0L3QuNGH0LXRgdC60LjRhSDQvdCw0YPQuiwg0L3QsNGD0YfQvdGL0Lkg0YHQvtGC0YDRg9C00L3QuNC6INCY0J/QoyDQoNCQ0J0g0YEgMjAwOCDQv9C+IDIwMTMuINCf0YDQuNGI0ZHQuyDQsiDQr9C90LTQtdC60YEu0JrQsNGA0YLQuNC90LrQuCDQsiAyMDE0INCz0L7QtNGDLCDQvtGC0LLQtdGH0LDQuyDQt9CwINC80L7QsdC40LvRjNC90YPRjiDQstC10YDRgdC40Y4g0Lgg0YDQvtGB0YIg0L/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70YzQvdC+0YHRgtC4INGB0LXRgNCy0LjRgdCwLiDQkiAyMDE2INC/0LXRgNC10YjRkdC7INCyIFlhbmRleCBEYXRhIEZhY3RvcnksINCz0LTQtSDRgNCw0LfRgNCw0LHQsNGC0YvQstCw0LXRgiDQuNC90YLQtdGA0YTQtdC50YHRiyDQuCDQtNC40LfQsNC50L0g0LLQtdCxLdC/0YDQuNC70L7QttC10L3QuNC5INC00LvRjyBCMkIuXCIsXG4gICAgICAgICAgICBwaG90bzoge1xuICAgICAgICAgICAgICAgICcxeCc6ICcvaW1hZ2VzL2xlY3R1cmVyLTAtMXguanBnJyxcbiAgICAgICAgICAgICAgICAnMngnOiAnL2ltYWdlcy9sZWN0dXJlci0wLTJ4LmpwZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2Nob29sOiBbe1xuICAgICAgICAgICAgaWQ6ICdzY2hvb2wtMCcsXG4gICAgICAgICAgICBuYW1lOiBcItCo0LrQvtC70LAg0YDQsNC30YDQsNCx0L7RgtC60Lgg0LjQvdGC0LXRgNGE0LXQudGB0L7QslwiXG4gICAgICAgIH1dLFxuICAgICAgICBsaW5rczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwi0JzQsNGC0LXRgNC40LDQu9GLXCIsXG4gICAgICAgICAgICAgICAgbGluazogXCIjXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCLQktC40LTQtdC+0LfQsNC/0LjRgdGMXCIsXG4gICAgICAgICAgICAgICAgbGluazogXCIjXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICB0aXRsZTogXCLQmNC00LXRjywg0LjRgdGB0LvQtdC00L7QstCw0L3QuNC1LCDQutC+0L3RhtC10L/RgiAo0KfQsNGB0YLRjCAxKVwiLFxuICAgICAgICBzdGFydDogXCIyMDE3LTA0LTExVDE4OjAwOjAwLjAwMFpcIixcbiAgICAgICAgZW5kOiBcIjIwMTctMDQtMTFUMjA6MzA6MDAuMDAwWlwiLFxuICAgICAgICBwbGFjZTogXCLQltC10LvRgtCw0Y8g0LDRg9C00LjRgtC+0YDQuNGPXCIsXG4gICAgICAgIGxlY3R1cmVyOiB7XG4gICAgICAgICAgICBpZDogJ2xlY3R1cmVyLTQnLFxuICAgICAgICAgICAgbmFtZTogXCLQkNC90YLQvtC9INCi0LXQvVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwi0JIg0K/QvdC00LXQutGB0LUg0YEgMjAxNCDQs9C+0LTQsC4g0JLQtdC00YPRidC40Lkg0LTQuNC30LDQudC90LXRgCDQv9GA0L7QtNGD0LrRgtCwINCyINGB0LXRgNCy0LjRgdCw0YUg0J/QtdGA0LXQstC+0LTRh9C40LosINCg0LDRgdC/0LjRgdCw0L3QuNGPINC4INCS0LjQtNC10L4uXCIsXG4gICAgICAgICAgICBwaG90bzoge1xuICAgICAgICAgICAgICAgICcxeCc6ICcvaW1hZ2VzL2xlY3R1cmVyLTQtMXguanBnJyxcbiAgICAgICAgICAgICAgICAnMngnOiAnL2ltYWdlcy9sZWN0dXJlci00LTJ4LmpwZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2Nob29sOiBbe1xuICAgICAgICAgICAgaWQ6ICdzY2hvb2wtMicsXG4gICAgICAgICAgICBuYW1lOiBcItCo0LrQvtC70LAg0LzQvtCx0LjQu9GM0L3QvtCz0L4g0LTQuNC30LDQudC90LBcIlxuICAgICAgICB9XSxcbiAgICAgICAgbGlua3M6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcItCc0LDRgtC10YDQuNCw0LvRi1wiLFxuICAgICAgICAgICAgICAgIGxpbms6IFwiI1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwi0JLQuNC00LXQvtC30LDQv9C40YHRjFwiLFxuICAgICAgICAgICAgICAgIGxpbms6IFwiI1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGl0bGU6IFwi0KDQsNCx0L7RgtCwINGBINGB0LXQvdGB0L7RgNC90YvQvCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQvCDQstCy0L7QtNC+0LxcIixcbiAgICAgICAgc3RhcnQ6IFwiMjAxNy0wNC0xMlQxNjowMDowMC4wMDBaXCIsXG4gICAgICAgIGVuZDogXCIyMDE3LTA0LTEyVDE3OjMwOjAwLjAwMFpcIixcbiAgICAgICAgcGxhY2U6IFwi0KHQuNC90Y/RjyDQsNGD0LTQuNGC0L7RgNC40Y9cIixcbiAgICAgICAgbGVjdHVyZXI6IHtcbiAgICAgICAgICAgIGlkOiAnbGVjdHVyZXItMCcsXG4gICAgICAgICAgICBuYW1lOiBcItCU0LzQuNGC0YDQuNC5INCU0YPRiNC60LjQvVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwi0JrQsNC90LTQuNC00LDRgiDRgtC10YXQvdC40YfQtdGB0LrQuNGFINC90LDRg9C6LCDQvdCw0YPRh9C90YvQuSDRgdC+0YLRgNGD0LTQvdC40Log0JjQn9CjINCg0JDQnSDRgSAyMDA4INC/0L4gMjAxMy4g0J/RgNC40YjRkdC7INCyINCv0L3QtNC10LrRgS7QmtCw0YDRgtC40L3QutC4INCyIDIwMTQg0LPQvtC00YMsINC+0YLQstC10YfQsNC7INC30LAg0LzQvtCx0LjQu9GM0L3Rg9GOINCy0LXRgNGB0LjRjiDQuCDRgNC+0YHRgiDQv9GA0L7QuNC30LLQvtC00LjRgtC10LvRjNC90L7RgdGC0Lgg0YHQtdGA0LLQuNGB0LAuINCSIDIwMTYg0L/QtdGA0LXRiNGR0Lsg0LIgWWFuZGV4IERhdGEgRmFjdG9yeSwg0LPQtNC1INGA0LDQt9GA0LDQsdCw0YLRi9Cy0LDQtdGCINC40L3RgtC10YDRhNC10LnRgdGLINC4INC00LjQt9Cw0LnQvSDQstC10LEt0L/RgNC40LvQvtC20LXQvdC40Lkg0LTQu9GPIEIyQi5cIixcbiAgICAgICAgICAgIHBob3RvOiB7XG4gICAgICAgICAgICAgICAgJzF4JzogJy9pbWFnZXMvbGVjdHVyZXItMC0xeC5qcGcnLFxuICAgICAgICAgICAgICAgICcyeCc6ICcvaW1hZ2VzL2xlY3R1cmVyLTAtMnguanBnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzY2hvb2w6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3NjaG9vbC0wJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBcItCo0LrQvtC70LAg0YDQsNC30YDQsNCx0L7RgtC60Lgg0LjQvdGC0LXRgNGE0LXQudGB0L7QslwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnc2Nob29sLTEnLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwi0KjQutC+0LvQsCDQvNC+0LHQuNC70YzQvdC+0Lkg0YDQsNC30YDQsNCx0L7RgtC60LhcIlxuICAgICAgICAgICAgfV0sXG4gICAgICAgIGxpbmtzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCLQnNCw0YLQtdGA0LjQsNC70YtcIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcIiNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcItCS0LjQtNC10L7Qt9Cw0L/QuNGB0YxcIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcIiNcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRpdGxlOiBcIkphdmEgQmxpdHogKNCn0LDRgdGC0YwgMSlcIixcbiAgICAgICAgc3RhcnQ6IFwiMjAxNy0wNy0wOVQxNjowMDowMC4wMDBaXCIsXG4gICAgICAgIGVuZDogXCIyMDE3LTA3LTA5VDE4OjAwOjAwLjAwMFpcIixcbiAgICAgICAgcGxhY2U6IFwi0JbQtdC70YLQsNGPINCw0YPQtNC40YLQvtGA0LjRj1wiLFxuICAgICAgICBsZWN0dXJlcjoge1xuICAgICAgICAgICAgaWQ6ICdsZWN0dXJlci0yJyxcbiAgICAgICAgICAgIG5hbWU6IFwi0K3QtNGD0LDRgNC0INCc0LDRhtGD0LrQvtCyXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCLQoNCw0LfRgNCw0LHQsNGC0YvQstCw0Y4g0L/RgNC40LvQvtC20LXQvdC40Y8g0LTQu9GPIEFuZHJvaWQg0YEgMjAxMCDQs9C+0LTQsC4g0JIgMjAxNCDQtNC10LvQsNC7INCy0YvRgdC+0LrQvtC90LDQs9GA0YPQttC10L3QvdC+0LUg0YTQuNC90LDQvdGB0L7QstC+0LUg0L/RgNC40LvQvtC20LXQvdC40LUuINCi0L7Qs9C00LAg0LbQtSDQvdCw0YfQsNC7INC+0YHQstCw0LjQstCw0YLRjCDQkNCe0J8sINCy0L3QtdC00YDRj9GPINGP0LfRi9C6INCyINC/0YDQvtC00LDQutGI0L0uINCSIDIwMTUg0YDQsNC30YDQsNCx0LDRgtGL0LLQsNC7INC40L3RgdGC0YDRg9C80LXQvdGC0Ysg0LTQu9GPIEFuZHJvaWQgU3R1ZGlvLCDQv9C+0LfQstC+0LvRj9GO0YnQuNC1INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCBhc3BlY3RKINCyINGB0LLQvtC40YUg0L/RgNC+0LXQutGC0LDRhS4g0JIg0K/QvdC00LXQutGB0LUg0LfQsNC90Y/RgiDQvdCwINC/0YDQvtC10LrRgtC1INCQ0LLRgtC+LtGA0YMuXCIsXG4gICAgICAgICAgICBwaG90bzoge1xuICAgICAgICAgICAgICAgICcxeCc6ICcvaW1hZ2VzL2xlY3R1cmVyLTItMXguanBnJyxcbiAgICAgICAgICAgICAgICAnMngnOiAnL2ltYWdlcy9sZWN0dXJlci0yLTJ4LmpwZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2Nob29sOiBbe1xuICAgICAgICAgICAgaWQ6ICdzY2hvb2wtMScsXG4gICAgICAgICAgICBuYW1lOiBcItCo0LrQvtC70LAg0LzQvtCx0LjQu9GM0L3QvtC5INGA0LDQt9GA0LDQsdC+0YLQutC4XCJcbiAgICAgICAgfV0sXG4gICAgICAgIGxpbmtzOiBbXVxuICAgIH0sXG4gICAge1xuICAgICAgICB0aXRsZTogXCLQmNC00LXRjywg0LjRgdGB0LvQtdC00L7QstCw0L3QuNC1LCDQutC+0L3RhtC10L/RgiAo0KfQsNGB0YLRjCAyKVwiLFxuICAgICAgICBzdGFydDogXCIyMDE3LTA3LTA5VDE2OjAwOjAwLjAwMFpcIixcbiAgICAgICAgZW5kOiBcIjIwMTctMDctMDlUMTg6MDA6MDAuMDAwWlwiLFxuICAgICAgICBwbGFjZTogXCLQmtGA0LDRgdC90LDRjyDQsNGD0LTQuNGC0L7RgNC40Y9cIixcbiAgICAgICAgbGVjdHVyZXI6IHtcbiAgICAgICAgICAgIGlkOiAnbGVjdHVyZXItNCcsXG4gICAgICAgICAgICBuYW1lOiBcItCQ0L3RgtC+0L0g0KLQtdC9XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCLQkiDQr9C90LTQtdC60YHQtSDRgSAyMDE0INCz0L7QtNCwLiDQktC10LTRg9GJ0LjQuSDQtNC40LfQsNC50L3QtdGAINC/0YDQvtC00YPQutGC0LAg0LIg0YHQtdGA0LLQuNGB0LDRhSDQn9C10YDQtdCy0L7QtNGH0LjQuiwg0KDQsNGB0L/QuNGB0LDQvdC40Y8g0Lgg0JLQuNC00LXQvi5cIixcbiAgICAgICAgICAgIHBob3RvOiB7XG4gICAgICAgICAgICAgICAgJzF4JzogJy9pbWFnZXMvbGVjdHVyZXItNC0xeC5qcGcnLFxuICAgICAgICAgICAgICAgICcyeCc6ICcvaW1hZ2VzL2xlY3R1cmVyLTQtMnguanBnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzY2hvb2w6IFt7XG4gICAgICAgICAgICBpZDogJ3NjaG9vbC0yJyxcbiAgICAgICAgICAgIG5hbWU6IFwi0KjQutC+0LvQsCDQvNC+0LHQuNC70YzQvdC+0LPQviDQtNC40LfQsNC50L3QsFwiXG4gICAgICAgIH1dLFxuICAgICAgICBsaW5rczogW11cbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGl0bGU6IFwi0JzRg9C70YzRgtC40LzQtdC00LjQsDog0LLQvtC30LzQvtC20L3QvtGB0YLQuCDQsdGA0LDRg9C30LXRgNCwXCIsXG4gICAgICAgIHN0YXJ0OiBcIjIwMTctMDctMTFUMTY6MDA6MDAuMDAwWlwiLFxuICAgICAgICBlbmQ6IFwiMjAxNy0wNy0xMVQxODowMDowMC4wMDBaXCIsXG4gICAgICAgIHBsYWNlOiBcItCh0LjQvdGP0Y8g0LDRg9C00LjRgtC+0YDQuNGPXCIsXG4gICAgICAgIGxlY3R1cmVyOiB7XG4gICAgICAgICAgICBpZDogJ2xlY3R1cmVyLTEnLFxuICAgICAgICAgICAgbmFtZTogXCLQnNCw0LrRgdC40Lwg0JLQsNGB0LjQu9GM0LXQslwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwi0JLQviDRhNGA0L7QvdGC0LXQvdC0LdGA0LDQt9GA0LDQsdC+0YLQutC1INGBIDIwMDcg0LPQvtC00LAuINCU0L4gMjAxMy3Qs9C+LCDQutC+0LPQtNCwINC/0YDQuNGI0ZHQuyDQsiDQr9C90LTQtdC60YEsINGA0LDQsdC+0YLQsNC7INGC0LXRhdC90L7Qu9C+0LPQvtC8INCyINGB0YLRg9C00LjQuCDQm9C10LHQtdC00LXQstCwINC4INC00YDRg9Cz0LjRhSDQutC+0LzQv9Cw0L3QuNGP0YUuXCIsXG4gICAgICAgICAgICBwaG90bzoge1xuICAgICAgICAgICAgICAgICcxeCc6ICcvaW1hZ2VzL2xlY3R1cmVyLTEtMXguanBnJyxcbiAgICAgICAgICAgICAgICAnMngnOiAnL2ltYWdlcy9sZWN0dXJlci0xLTJ4LmpwZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2Nob29sOiBbe1xuICAgICAgICAgICAgaWQ6ICdzY2hvb2wtMCcsXG4gICAgICAgICAgICBuYW1lOiBcItCo0LrQvtC70LAg0YDQsNC30YDQsNCx0L7RgtC60Lgg0LjQvdGC0LXRgNGE0LXQudGB0L7QslwiXG4gICAgICAgIH1dLFxuICAgICAgICBsaW5rczogW11cbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGl0bGU6IFwiR2l0ICYgV29ya2Zsb3dcIixcbiAgICAgICAgc3RhcnQ6IFwiMjAxNy0wNy0xMlQxNjowMDowMC4wMDBaXCIsXG4gICAgICAgIGVuZDogXCIyMDE3LTA3LTEyVDE4OjAwOjAwLjAwMFpcIixcbiAgICAgICAgcGxhY2U6IFwi0JfQtdC70LXQvdCw0Y8g0LHQvtC70YzRiNCw0Y8g0LDRg9C00LjRgtC+0YDQuNGPXCIsXG4gICAgICAgIGxlY3R1cmVyOiB7XG4gICAgICAgICAgICBpZDogJ2xlY3R1cmVyLTMnLFxuICAgICAgICAgICAgbmFtZTogXCLQlNC80LjRgtGA0LjQuSDQodC60LvQsNC00L3QvtCyXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCLQntC60L7QvdGH0LjQuyDRhNCw0LrRg9C70YzRgtC10YIg0JjQoiDQnNC+0YHQutC+0LLRgdC60L7Qs9C+INCi0LXRhdC90LjRh9C10YHQutC+0LPQviDQo9C90LjQstC10YDRgdC40YLQtdGC0LAuINCSINCv0L3QtNC10LrRgdC1INGBIDIwMTUg0LPQvtC00LAsINGA0LDQt9GA0LDQsdCw0YLRi9Cy0LDQtdGCINC/0YDQuNC70L7QttC10L3QuNC1IEF1dG8ucnUg0LTQu9GPIEFuZHJvaWQuXCIsXG4gICAgICAgICAgICBwaG90bzoge1xuICAgICAgICAgICAgICAgICcxeCc6ICcvaW1hZ2VzL2xlY3R1cmVyLTMtMXguanBnJyxcbiAgICAgICAgICAgICAgICAnMngnOiAnL2ltYWdlcy9sZWN0dXJlci0zLTJ4LmpwZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2Nob29sOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdzY2hvb2wtMCcsXG4gICAgICAgICAgICAgICAgbmFtZTogXCLQqNC60L7Qu9CwINGA0LDQt9GA0LDQsdC+0YLQutC4INC40L3RgtC10YDRhNC10LnRgdC+0LJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3NjaG9vbC0xJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBcItCo0LrQvtC70LAg0LzQvtCx0LjQu9GM0L3QvtC5INGA0LDQt9GA0LDQsdC+0YLQutC4XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdzY2hvb2wtMicsXG4gICAgICAgICAgICAgICAgbmFtZTogXCLQqNC60L7Qu9CwINC80L7QsdC40LvRjNC90L7Qs9C+INC00LjQt9Cw0LnQvdCwXCJcbiAgICAgICAgICAgIH1dLFxuICAgICAgICBsaW5rczogW11cbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGl0bGU6IFwiSmF2YSBCbGl0eiAo0KfQsNGB0YLRjCAyKVwiLFxuICAgICAgICBzdGFydDogXCIyMDE3LTA3LTEzVDE2OjAwOjAwLjAwMFpcIixcbiAgICAgICAgZW5kOiBcIjIwMTctMDctMTNUMTg6MDA6MDAuMDAwWlwiLFxuICAgICAgICBwbGFjZTogXCLQltC10LvRgtCw0Y8g0LDRg9C00LjRgtC+0YDQuNGPXCIsXG4gICAgICAgIGxlY3R1cmVyOiB7XG4gICAgICAgICAgICBpZDogJ2xlY3R1cmVyLTInLFxuICAgICAgICAgICAgbmFtZTogXCLQrdC00YPQsNGA0LQg0JzQsNGG0YPQutC+0LJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcItCg0LDQt9GA0LDQsdCw0YLRi9Cy0LDRjiDQv9GA0LjQu9C+0LbQtdC90LjRjyDQtNC70Y8gQW5kcm9pZCDRgSAyMDEwINCz0L7QtNCwLiDQkiAyMDE0INC00LXQu9Cw0Lsg0LLRi9GB0L7QutC+0L3QsNCz0YDRg9C20LXQvdC90L7QtSDRhNC40L3QsNC90YHQvtCy0L7QtSDQv9GA0LjQu9C+0LbQtdC90LjQtS4g0KLQvtCz0LTQsCDQttC1INC90LDRh9Cw0Lsg0L7RgdCy0LDQuNCy0LDRgtGMINCQ0J7Qnywg0LLQvdC10LTRgNGP0Y8g0Y/Qt9GL0Log0LIg0L/RgNC+0LTQsNC60YjQvS4g0JIgMjAxNSDRgNCw0LfRgNCw0LHQsNGC0YvQstCw0Lsg0LjQvdGB0YLRgNGD0LzQtdC90YLRiyDQtNC70Y8gQW5kcm9pZCBTdHVkaW8sINC/0L7Qt9Cy0L7Qu9GP0Y7RidC40LUg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMIGFzcGVjdEog0LIg0YHQstC+0LjRhSDQv9GA0L7QtdC60YLQsNGFLiDQkiDQr9C90LTQtdC60YHQtSDQt9Cw0L3Rj9GCINC90LAg0L/RgNC+0LXQutGC0LUg0JDQstGC0L4u0YDRgy5cIixcbiAgICAgICAgICAgIHBob3RvOiB7XG4gICAgICAgICAgICAgICAgJzF4JzogJy9pbWFnZXMvbGVjdHVyZXItMi0xeC5qcGcnLFxuICAgICAgICAgICAgICAgICcyeCc6ICcvaW1hZ2VzL2xlY3R1cmVyLTItMnguanBnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzY2hvb2w6IFt7XG4gICAgICAgICAgICBpZDogJ3NjaG9vbC0xJyxcbiAgICAgICAgICAgIG5hbWU6IFwi0KjQutC+0LvQsCDQvNC+0LHQuNC70YzQvdC+0Lkg0YDQsNC30YDQsNCx0L7RgtC60LhcIlxuICAgICAgICB9XSxcbiAgICAgICAgbGlua3M6IFtdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRpdGxlOiBcItCQ0L3QuNC80LDRhtC40LhcIixcbiAgICAgICAgc3RhcnQ6IFwiMjAxNy0wNy0xNVQxNjowMDowMC4wMDBaXCIsXG4gICAgICAgIGVuZDogXCIyMDE3LTA3LTE1VDE4OjAwOjAwLjAwMFpcIixcbiAgICAgICAgcGxhY2U6IFwi0JrRgNCw0YHQvdCw0Y8g0LDRg9C00LjRgtC+0YDQuNGPXCIsXG4gICAgICAgIGxlY3R1cmVyOiB7XG4gICAgICAgICAgICBpZDogJ2xlY3R1cmVyLTQnLFxuICAgICAgICAgICAgbmFtZTogXCLQkNC90YLQvtC9INCi0LXQvVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwi0JIg0K/QvdC00LXQutGB0LUg0YEgMjAxNCDQs9C+0LTQsC4g0JLQtdC00YPRidC40Lkg0LTQuNC30LDQudC90LXRgCDQv9GA0L7QtNGD0LrRgtCwINCyINGB0LXRgNCy0LjRgdCw0YUg0J/QtdGA0LXQstC+0LTRh9C40LosINCg0LDRgdC/0LjRgdCw0L3QuNGPINC4INCS0LjQtNC10L4uXCIsXG4gICAgICAgICAgICBwaG90bzoge1xuICAgICAgICAgICAgICAgICcxeCc6ICcvaW1hZ2VzL2xlY3R1cmVyLTQtMXguanBnJyxcbiAgICAgICAgICAgICAgICAnMngnOiAnL2ltYWdlcy9sZWN0dXJlci00LTJ4LmpwZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2Nob29sOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdzY2hvb2wtMCcsXG4gICAgICAgICAgICAgICAgbmFtZTogXCLQqNC60L7Qu9CwINGA0LDQt9GA0LDQsdC+0YLQutC4INC40L3RgtC10YDRhNC10LnRgdC+0LJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiAnc2Nob29sLTEnLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwi0KjQutC+0LvQsCDQvNC+0LHQuNC70YzQvdC+0Lkg0YDQsNC30YDQsNCx0L7RgtC60LhcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ3NjaG9vbC0yJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBcItCo0LrQvtC70LAg0LzQvtCx0LjQu9GM0L3QvtCz0L4g0LTQuNC30LDQudC90LBcIlxuICAgICAgICAgICAgfV0sXG4gICAgICAgIGxpbmtzOiBbXVxuICAgIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IFNDSEVEVUxFX0RBVEE7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9kYXRhLmpzIiwiLyoqXG4gKiBAbW9kdWxlIFN0aWNreVxuICogQGRlc2NyaXB0aW9uIFNldCB0aGUgYmxvY2sgdG8gc3RpY2t5IHBvc2l0aW9uaW5nXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RpY2t5IHtcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgICAgICAgdGhpcy5pc1N0aWNreSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMudG9wID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGxIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG9uU2Nyb2xsSGFuZGxlcigpIHtcbiAgICAgICAgbGV0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICBpZiAoc2Nyb2xsVG9wID49IHRoaXMudG9wICYmICF0aGlzLmlzU3RpY2t5KSB7XG4gICAgICAgICAgICB0aGlzLnN0aWNrKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsVG9wIDwgdGhpcy50b3AgJiYgdGhpcy5pc1N0aWNreSkge1xuICAgICAgICAgICAgdGhpcy51bnN0aWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGljaygpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzdGlja3lcIik7XG4gICAgICAgIHRoaXMuaXNTdGlja3kgPSB0cnVlO1xuICAgIH1cblxuICAgIHVuc3RpY2soKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic3RpY2t5XCIpO1xuICAgICAgICB0aGlzLmlzU3RpY2t5ID0gZmFsc2U7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvbW9kdWxlcy9zdGlja3kuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7QUMzQkE7Ozs7O0FBS0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUFBO0FBQUE7QUFWQTtBQUNBO0FBWUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7Ozs7OztBQTdDQTs7Ozs7Ozs7Ozs7QUN2QkE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwQkE7Ozs7OztBQU1BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7O0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZBO0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXhCQTtBQTRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXhDQTtBQTRDQTtBQUNBO0FBN0NBO0FBaURBO0FBQ0E7QUFsREE7QUFzREE7QUFDQTtBQUNBO0FBQ0E7QUF6REE7QUE2REE7QUFDQTtBQTlEQTtBQWtFQTtBQUFBO0FBQ0E7QUFuRUE7QUF1RUE7QUFBQTtBQUNBO0FBeEVBO0FBNEVBO0FBQ0E7QUFDQTtBQTlFQTtBQWtGQTtBQUNBO0FBQ0E7QUFwRkE7QUF3RkE7QUFDQTtBQXpGQTtBQTZGQTtBQUNBO0FBOUZBO0FBa0dBO0FBQ0E7QUFDQTtBQXBHQTtBQXdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE3SEE7QUFnSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBN0ZBO0FBQ0E7QUFDQTtBQStGQTs7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF6UEE7QUE2UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBbFNBO0FBcVNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUF6U0E7QUE2U0E7QUFDQTtBQTlTQTtBQWtUQTtBQUNBO0FBblRBO0FBdVRBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL1RBO0FBbVVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQVNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzWEE7QUErWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFuQkE7QUFxQkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBRUE7OztBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWkE7QUFDQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdmlCQTtBQUNBO0FBeWlCQTtBQUVBOzs7Ozs7QUNyckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFOQTs7OztBQU9BO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZBO0FBaUJBO0FBdkJBO0FBQ0E7QUFHQTtBQUFBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pGQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUpBO0FBU0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQXZCQTtBQThCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQVNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUF2QkE7QUE4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSkE7QUFTQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUlBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBNUJBO0FBbUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUpBO0FBU0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQWxCQTtBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQVNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFsQkE7QUFxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSkE7QUFTQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBbEJBO0FBcUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUpBO0FBU0E7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFJQTtBQTNCQTtBQThCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQVNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFsQkE7QUFxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSkE7QUFTQTtBQUVBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUlBO0FBMUJBO0FBQ0E7QUE2QkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4T0E7Ozs7O0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUE3QkE7OzsiLCJzb3VyY2VSb290IjoiIn0=