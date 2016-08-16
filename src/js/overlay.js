(function (global) {
    'use strict';

    var Overlay = (function() {

        var defaults = {
            html: '',
            onAppend: function() {},
            onRemove: function() {}
        };

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
                stage.firstChild.insertAdjacentHTML('beforeend', this.settings.html);

                close.addEventListener('click', function(event) {
                    event.preventDefault();
                    this.remove(stage);
                }.bind(this));

                this.append(stage);
            },
            append: function(stage) {
                document.body.appendChild(stage);
                return this.settings.onAppend(); // callback fn
            },
            remove: function(stage) {
                document.body.removeChild(stage);
                return this.settings.onRemove(); // callback fn
            }
        }

        /**
         * merge defaults with user options
         * @param {Object} defaults Default settings
         * @param {Object} options User options
         * @returns {Object} Merged values of defaults and options
         *
         */
         function extend(defaults, options) {
             var a = Object.create(defaults);
             Object.keys(options).map(function (prop) {
                 prop in a && (a[prop] = options[prop]);
             });
             return a;
         }

         /**
          * constructor
          * @param {Object} options
          *
          */
        function Overlay(options) {
            var settings = extend(defaults, options || {});
            var _ = Object.create(methods, {
                settings: { value: settings }
            })
            _.compile();
        }

        return Overlay;
    }());

    // AMD
    if ( typeof define === "function" && define.amd ) {
        define('Overlay', function() {
            return Overlay;
        });
    }

    // CommonJS
    else if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = Overlay;
    }

    // Window {}
    else {
        global.Overlay = Overlay;
    }
})(this);