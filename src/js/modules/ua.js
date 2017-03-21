/**
 * @module ua
 * @description Detect user platform
 */

//thanks https://github.com/bem/bem-core/blob/v4/touch.blocks/ua/ua.js
let ua = (function() {
    let ua = navigator.userAgent,
        platform = {},
        match;

    if(match = ua.match(/Android\s+([\d.]+)/)) {
        platform.android = match[1];
    } else if(ua.match(/\sHTC[\s_].*AppleWebKit/)) {
        // фэйковый десктопный UA по умолчанию у некоторых HTC (например, HTC Sensation)
        platform.android = '2.3';
    } else if(match = ua.match(/iPhone\sOS\s([\d_]+)/)) {
        platform.ios = match[1].replace(/_/g, '.');
    } else if(match = ua.match(/iPad.*OS\s([\d_]+)/)) {
        platform.ios = match[1].replace(/_/g, '.');
    } else if(match = ua.match(/Bada\/([\d.]+)/)) {
        platform.bada = match[1];
    } else if(match = ua.match(/Windows\sPhone.*\s([\d.]+)/)) {
        platform.wp = match[1];
    } else {
        platform.other = true;
    }

    return {
        platform: platform
    }
})();

export default ua;