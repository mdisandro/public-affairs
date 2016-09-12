(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*global document, require*/
var ParallaxImg = require('./globals/modules/ParallaxImage');

(function () {
    'use strict';

    var header = document.getElementsByClassName('navbar'),
        headerHeight = header.length ? header[0].clientHeight : 0;

    new ParallaxImg(headerHeight);
})();

},{"./globals/modules/ParallaxImage":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint -W032 */ /* ignore unnecessary semicolon */

var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [{
        key: 'hasClass',
        value: function hasClass(el, className) {
            if (el.classList) return el.classList.contains(className);else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }, {
        key: 'addClass',
        value: function addClass(el, className) {
            if (el.classList) el.classList.add(className);else if (!this.hasClass(el, className)) el.className += ' ' + className;
        }
    }, {
        key: 'removeClass',
        value: function removeClass(el, className) {
            if (el.classList) el.classList.remove(className);else if (this.hasClass(el, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                el.className = el.className.replace(reg, ' ');
            }
        }
    }, {
        key: 'toggleClass',
        value: function toggleClass(el, className) {
            if (this.hasClass(el, className)) this.removeClass(el, className);else this.addClass(el, className);
        }
    }]);

    return Helper;
}();

;

exports.default = Helper;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint -W032 */ /* ignore unnecessary semicolon */
var Helper = require('./Helper');

/**
 * Parallax image
 */

var FullWidthParallax = function () {
    /*
     * Creates FullWidthParallax object
     * @param {obj} elem - parallax container object
     */

    function FullWidthParallax(elem, topMargin) {
        _classCallCheck(this, FullWidthParallax);

        var context = this,
            fwi;

        this.imgCont = elem;
        fwi = elem.getElementsByClassName('full-width-image');
        this.img = fwi.length ? fwi[0].getElementsByTagName('img') : [];
        this.topVal = 0;
        this.longPage = false;
        this.isBanner = Helper.hasClass(elem, 'page-banner');
        this.toTop = Helper.hasClass(elem, 'image-to-top');
        this.centered = 0;
        if (this.img.length) {
            // there are images, so set as first
            this.img = this.img[0];
            this.scrollPos = -1;
            this.topMargin = topMargin ? topMargin : 0;

            window.addEventListener('scroll', function () {
                context.runOnScroll();
            });
            window.addEventListener('resize', function () {
                context.runOnResize();
            });
            this.img.addEventListener('load', function () {
                context.runOnResize();
            });

            this.runOnResize();
        }
    }

    /**
     * Get updated window dimensions and update right column box if switched
     * between desktop and mobile
     */


    _createClass(FullWidthParallax, [{
        key: 'runOnResize',
        value: function runOnResize() {
            var de = document.documentElement,
                maxPos,
                absTop,
                minTop;

            this.imgH = this.img.clientHeight;
            this.contH = this.imgCont.clientHeight;
            this.centered = Math.round((this.imgH - this.contH) / 2) * -1;
            this.winW = Math.max(de.clientWidth, window.innerWidth || 0);
            this.winH = Math.max(de.clientHeight, window.innerHeight || 0);

            if (this.toTop || !this.isBanner || this.centered >= 0) {
                this.centered = 0;
            }
            // if desktop size and container visible
            if (this.winW > 769 && this.contH > 0) {
                // top position of container, when touching bottom of viewport
                maxPos = this.winH - this.contH;
                // top position of image within container at lowest point
                absTop = Math.round((this.topMargin - maxPos) / 2);
                // lowest value for top of image
                minTop = this.contH - this.imgH;
                // image does not stay within bounds, with standard
                // calculation (taller viewport)
                this.longPage = absTop < minTop;
                this.runOnScroll();
                // if mobile size reset image to top
            } else if (this.topVal !== this.centered && this.contH > 0) {
                    this.img.style.top = this.centered + 'px';
                    this.topVal = this.centered;
                }
        }

        /*
         * Called using onscroll event
         * Checks if scrolled up or down, then calls setPosition
         */

    }, {
        key: 'runOnScroll',
        value: function runOnScroll() {
            var viewPos = this.imgCont.getBoundingClientRect(),
                imgContPos = this.topMargin - viewPos.top,
                imgTop = Math.round(imgContPos / 2),
                minView = this.winH - viewPos.top,
                pPos,
                minPos,
                minTop = this.contH - this.imgH,
                percent;

            // do nothing if it's a smaller window or not in view
            if (this.winW > 769 && minView > 0 && imgContPos <= this.contH) {
                if (this.longPage && !this.isBanner) {
                    // percent container has moved within viewport
                    // (between top margin and bottom of screen)
                    percent = (viewPos.top - this.topMargin) * 100;
                    percent = percent / (this.winH - this.contH - this.topMargin);
                    // apply percent to top position of image
                    // (based on min top value)
                    imgTop = percent * (this.contH - this.imgH) / 100;
                } else if (this.isBanner) {
                    pPos = window.pageYOffset || document.documentElement.scrollTop;
                    minPos = this.topMargin - (pPos + viewPos.top);
                    imgTop -= Math.round(minPos / 2);
                }
                imgTop += this.centered;
                this.img.style.top = imgTop + 'px';
                this.topVal = imgTop;
            } else if (this.topVal !== this.centered) {
                this.img.style.top = this.centered + 'px';
                this.topVal = this.centered;
            }
        }
    }, {
        key: 'updateParallax',
        value: function updateParallax() {
            this.runOnResize();
        }
    }]);

    return FullWidthParallax;
}();

;

var ParallaxImage = function () {
    /*
     * Creates FullWidthParallax object(s)
     * @param {int} topMargin - margin to top of full width image object
     */

    function ParallaxImage(topMargin) {
        _classCallCheck(this, ParallaxImage);

        var banners = document.getElementsByClassName('parallax-image'),
            i;

        this.parallaxes = [];
        for (i = 0; i < banners.length; i++) {
            this.parallaxes.push(new FullWidthParallax(banners[i], topMargin));
        }
    }

    _createClass(ParallaxImage, [{
        key: 'runUpdate',
        value: function runUpdate() {
            var i;

            for (i = 0; i < this.parallaxes.length; i++) {
                this.parallaxes[i].updateParallax();
            }
        }
    }]);

    return ParallaxImage;
}();

;

exports.default = ParallaxImage;
module.exports = exports['default'];

},{"./Helper":2}]},{},[1]);
