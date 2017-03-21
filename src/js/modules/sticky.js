/**
 * @module Sticky
 * @description Set the block to sticky positioning
 */

export default class Sticky {
    constructor(el) {
        this.element = el;
        this.isSticky = false;
    }

    init() {
        this.top = this.element.getBoundingClientRect().top;
        window.addEventListener('scroll', this.onScrollHandler.bind(this));
    }

    onScrollHandler() {
        let scrollTop = window.pageYOffset;

        if (scrollTop >= this.top && !this.isSticky) {
            this.stick();
        } else if (scrollTop < this.top && this.isSticky) {
            this.unstick();
        }
    }

    stick() {
        this.element.classList.add("sticky");
        this.isSticky = true;
    }

    unstick() {
        this.element.classList.remove("sticky");
        this.isSticky = false;
    }
}