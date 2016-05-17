(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*global document, require*/
var Header = require('./modules/Header');
var ScrollNav = require('./modules/ScrollNav');

(function () {
   'use strict';

   var navbar = document.getElementsByClassName('navbar')[0].parentNode;
   new Header('menu');
   new Header('search');
   Header.addSubmenu();
   new ScrollNav(navbar, 150);
})();

},{"./modules/Header":2,"./modules/ScrollNav":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint -W032 */ /* ignore unnecessary semicolon */
var Helper = require('./Helper');

var Header = function () {
    function Header(section) {
        _classCallCheck(this, Header);

        //This is for main navbar
        this.section = section;
        this.sectionBtn = document.getElementsByClassName(section + '-button')[0];
        this.sectionWin = document.getElementsByClassName(section + '-window')[0];
        this.headerElem = document.getElementsByTagName('header')[0];
        this.navbtns = document.getElementsByClassName('nav-button');
        this.navwins = document.getElementsByClassName('nav-window');
        this.sectionBtn.addEventListener('click', this.toggleNavOption.bind(this), false);
    }

    _createClass(Header, [{
        key: 'toggleNavOption',
        value: function toggleNavOption() {
            var body = document.getElementsByTagName('body')[0],
                html = document.getElementsByTagName('html')[0],
                i = 0,
                secClass = this.sectionBtn.className,
                sectionOpen = secClass.indexOf('close-button') === -1;

            for (i = 0; i < this.navbtns.length; i++) {
                Helper.removeClass(this.navbtns[i], 'close-button');
                Helper.removeClass(this.navwins[i], 'open-window');
                Helper.removeClass(html, 'menu-open');
                Helper.removeClass(body, 'menu-open');
            }
            if (sectionOpen) {
                Helper.addClass(this.sectionBtn, 'close-button');
                Helper.addClass(this.sectionWin, 'open-window');
                if (this.section === 'search') {
                    document.getElementById('query').focus();
                } else {
                    Helper.addClass(html, 'menu-open');
                    Helper.addClass(body, 'menu-open');
                }
            }
        }
    }], [{
        key: 'addSubmenu',
        value: function addSubmenu() {
            var items = document.getElementsByClassName('menu-item'),
                i = 0,
                lastClass,
                li;
            for (i; i < items.length; i++) {
                // function is inside loop because it would not work outside
                // -- you need to add the event listener to each menu item
                items[i].addEventListener('click', function () {
                    // a click on the span shouldn't register since we only add the event listener to the anchors
                    li = this.parentNode;
                    lastClass = Helper.hasClass(li, 'social') ? 'social ' : '';
                    li.className = !Helper.hasClass(li, 'expanded') ? lastClass + 'expanded' : lastClass;
                }, false);
            }
        }
    }]);

    return Header;
}();

;

exports.default = Header;
module.exports = exports['default'];

},{"./Helper":3}],3:[function(require,module,exports){
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
    }]);

    return Helper;
}();

;

exports.default = Helper;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint -W032 */ /* ignore unnecessary semicolon */
var Helper = require('./Helper');
/**
 * Toggle class name on element as user scrolls page
 */

var ScrollNav = function () {

    /**
     * elem {obj}           - DOM element to add scroll class to
     * minTop {int}         - minimum px distance from top of page to start
                              adding scroll class
     */

    function ScrollNav(elem, minTop) {
        _classCallCheck(this, ScrollNav);

        this.navElem = elem;
        // window.pageYOffset for all browsers, except IE9 and lower
        this.scrollPos = window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop;
        this.minTop = !minTop ? 0 : minTop;
        this.minScroll = 25; // minimum scrolling distance before transitioning
        window.addEventListener('scroll', this.runOnScroll.bind(this));
        this.runOnScroll(this);
    }

    _createClass(ScrollNav, [{
        key: 'runOnScroll',
        value: function runOnScroll(e) {
            var newPos = window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop,
                navOpen = document.getElementsByClassName('open-window');

            if (!navOpen.length) {
                // scrolling down
                if (this.scrollPos + this.minScroll <= newPos && newPos > this.minTop) {
                    Helper.addClass(this.navElem, 'scrolled-down');
                    this.scrollPos = newPos;
                    // scrolling up
                } else if (this.scrollPos - this.minScroll >= newPos) {
                        Helper.removeClass(this.navElem, 'scrolled-down');
                        this.scrollPos = newPos;
                    }
            }
        }
    }]);

    return ScrollNav;
}();

;

exports.default = ScrollNav;
module.exports = exports['default'];

},{"./Helper":3}]},{},[1]);
