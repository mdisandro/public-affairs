/*global document, require*/
var ParallaxImg = require('./globals/modules/ParallaxImage');

(function() {
    'use strict';
    var header = document.getElementsByClassName('navbar'),
        headerHeight = (header.length) ? header[0].clientHeight : 0;

    new ParallaxImg(headerHeight);
}());