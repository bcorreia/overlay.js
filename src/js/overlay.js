(function (global) {
    'use strict';

    var Overlay = (function() {

        var defaults = {
            html: '', // html string or node type
            close: {
                default: true,  // use default close button (boolean)
                onstage: false, // close on click event. `.stage` element
                text: "Close" // innerHTML
            },
            onAppend: function() {},
            onRemove: function() {}
        };

        var methods = {
            compile: function() {
                var stage = document.createElement('div'),
                    close = document.createElement('a');

                close.setAttribute('href', '#');
                close.classList.add('-close');
                close.innerHTML = this.settings.close.text;

                stage.classList.add('overlay');
                stage.innerHTML = '<div class="-inner"></div>';

                if ( this.settings.close.default ) {
                    stage.firstChild.appendChild(close);
                }

                if ( typeof this.settings.html === "string" ) {
                    stage.firstChild.insertAdjacentHTML('beforeend', this.settings.html);
                }
                else {
                    stage.firstChild.appendChild(this.settings.html);
                }

                close.addEventListener('click', function(event) {
                    event.preventDefault();
                    this.remove(stage);
                }.bind(this));

                if ( this.settings.close.onstage ) {
                    stage.addEventListener('click', function(event) {
                        event.stopPropagation();
                        this.remove(stage);
                    }.bind(this));
                }

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
         function extend() {
            var extended = {},
                deep = true,
                i = 0,
                length = arguments.length;

            // check if a deep merge
            if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
                deep = arguments[0];
                i++;
            }

            // merge the object into the extended object
            var merge = function (obj) {
                for ( var prop in obj ) {
                    if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {

                        // if deep merge and property is an object, merge properties
                        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                            extended[prop] = extend( true, extended[prop], obj[prop] );
                        }
                        else {
                            extended[prop] = obj[prop];
                        }
                    }
                }
            };

            // loop through each object and conduct a merge
            for ( ; i < length; i++ ) {
                var obj = arguments[i];
                merge(obj);
            }

            return extended;
        };

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

            // alias: public method
            this.remove = function() {
                _.remove();
            }
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