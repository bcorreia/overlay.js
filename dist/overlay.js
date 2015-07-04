/**
 * overlay.js - version 1.0.0
 *
 * https://github.com/bcorreia/overlay.js.git
 * Bruno Correia - mail@bcorreia.com
 *
 */
var Overlay = (function() {
    'use strict';

    var methods = {
        compile: function() {
            var stage = document.createElement('div'),
                close = document.createElement('a');

            close.setAttribute('href', '#');
            close.classList.add('-close');
            close.innerHTML = 'Close';

            stage.classList.add('overlay');
            stage.innerHTML = '<div class="-inner"></div>';
            stage.firstChild.appendChild(close);
            stage.firstChild.insertAdjacentHTML('beforeend', this.html);

            close.addEventListener('click', function() {
                this.remove.call(stage);
            }.bind(this));

            this.append.call(stage);
        },
        append: function() {
            document.body.appendChild(this);
        },
        remove: function() {
            document.body.removeChild(this);
        }
    }

    function Overlay(obj) {
        var _ = Object.create(methods, {
            html: { value: obj.html }
        })
        _.compile();
    }

    return Overlay;
}());