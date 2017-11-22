(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// import { Overlay } from './overlay.js';
var Overlay = require('./overlay.js');

var el = document.querySelector('.demo > a'),
    video = el.getAttribute('data-video');

el.addEventListener('click', function () {
    var layer = new Overlay({
        html: '<iframe width="853" height="480" src="https://www.youtube.com/embed/' + video + '" frameborder="0" allowfullscreen></iframe>', // html string or node type
        close: {
            default: true, // use default close button (boolean)
            text: "Close"
        },
        onAppend: function onAppend() {
            console.log('onAppend callback');
        },
        onRemove: function onRemove() {
            console.log('onRemove callback');
        }
    });
});

},{"./overlay.js":2}],2:[function(require,module,exports){
'use strict';

(function (global) {
    'use strict';

    var Overlay = function () {

        var defaults = {
            html: '', // html string or node type
            close: {
                default: true, // use default close button (boolean)
                onstage: false, // close on click event. `.stage` element
                text: "Close" // innerHTML
            },
            onAppend: function onAppend() {},
            onRemove: function onRemove() {}
        };

        var methods = {
            compile: function compile() {
                var stage = document.createElement('div'),
                    close = document.createElement('a');

                close.setAttribute('href', '#');
                close.classList.add('-close');
                close.innerHTML = this.settings.close.text;

                stage.classList.add('overlay');
                stage.innerHTML = '<div class="-inner"></div>';

                if (this.settings.close.default) {
                    stage.firstChild.appendChild(close);
                }

                if (typeof this.settings.html === "string") {
                    stage.firstChild.insertAdjacentHTML('beforeend', this.settings.html);
                } else {
                    stage.firstChild.appendChild(this.settings.html);
                }

                close.addEventListener('click', function (event) {
                    event.preventDefault();
                    this.remove(stage);
                }.bind(this));

                if (this.settings.close.onstage) {
                    stage.addEventListener('click', function (event) {
                        event.stopPropagation();
                        this.remove(stage);
                    }.bind(this));
                }

                this.append(stage);
            },
            append: function append(stage) {
                document.body.appendChild(stage);
                return this.settings.onAppend(); // callback fn
            },
            remove: function remove(stage) {
                document.body.removeChild(stage);
                return this.settings.onRemove(); // callback fn
            }
        };

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
            if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
                deep = arguments[0];
                i++;
            }

            // merge the object into the extended object
            var merge = function merge(obj) {
                for (var prop in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, prop)) {

                        // if deep merge and property is an object, merge properties
                        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                            extended[prop] = extend(true, extended[prop], obj[prop]);
                        } else {
                            extended[prop] = obj[prop];
                        }
                    }
                }
            };

            // loop through each object and conduct a merge
            for (; i < length; i++) {
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
            });
            _.compile();

            // alias: public method
            this.remove = function () {
                _.remove();
            };
        }

        return Overlay;
    }();

    // AMD
    if (typeof define === "function" && define.amd) {
        define('Overlay', function () {
            return Overlay;
        });
    }

    // CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
            module.exports = Overlay;
        }

        // Window {}
        else {
                global.Overlay = Overlay;
            }
})(undefined);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL292ZXJsYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0EsSUFBSSxVQUFVLFFBQVEsY0FBUixDQUFkOztBQUVBLElBQUksS0FBSyxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVDtBQUFBLElBQ0ksUUFBUSxHQUFHLFlBQUgsQ0FBZ0IsWUFBaEIsQ0FEWjs7QUFHQSxHQUFHLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFlBQVc7QUFDcEMsUUFBSSxRQUFRLElBQUksT0FBSixDQUFZO0FBQ3BCLGNBQU0seUVBQXdFLEtBQXhFLEdBQStFLDZDQURqRSxFQUNnSDtBQUNwSSxlQUFPO0FBQ0gscUJBQVMsSUFETixFQUNZO0FBQ2Ysa0JBQU07QUFGSCxTQUZhO0FBTXBCLGtCQUFVLG9CQUFXO0FBQ2pCLG9CQUFRLEdBQVIsQ0FBWSxtQkFBWjtBQUNILFNBUm1CO0FBU3BCLGtCQUFVLG9CQUFXO0FBQ2pCLG9CQUFRLEdBQVIsQ0FBWSxtQkFBWjtBQUNIO0FBWG1CLEtBQVosQ0FBWjtBQWFILENBZEQ7Ozs7O0FDTkEsQ0FBQyxVQUFVLE1BQVYsRUFBa0I7QUFDZjs7QUFFQSxRQUFJLFVBQVcsWUFBVzs7QUFFdEIsWUFBSSxXQUFXO0FBQ1gsa0JBQU0sRUFESyxFQUNEO0FBQ1YsbUJBQU87QUFDSCx5QkFBUyxJQUROLEVBQ2E7QUFDaEIseUJBQVMsS0FGTixFQUVhO0FBQ2hCLHNCQUFNLE9BSEgsQ0FHVztBQUhYLGFBRkk7QUFPWCxzQkFBVSxvQkFBVyxDQUFFLENBUFo7QUFRWCxzQkFBVSxvQkFBVyxDQUFFO0FBUlosU0FBZjs7QUFXQSxZQUFJLFVBQVU7QUFDVixxQkFBUyxtQkFBVztBQUNoQixvQkFBSSxRQUFRLFNBQVMsYUFB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RCxNQUdLO0FBQ0QscUNBQVMsSUFBVCxJQUFpQixJQUFJLElBQUosQ0FBakI7QUFDSDtBQUNKO0FBQ0o7QUFDSixhQWJEOztBQWVBO0FBQ0EsbUJBQVEsSUFBSSxNQUFaLEVBQW9CLEdBQXBCLEVBQTBCO0FBQ3RCLG9CQUFJLE1BQU0sVUFBVSxDQUFWLENBQVY7QUFDQSxzQkFBTSxHQUFOO0FBQ0g7O0FBRUQsbUJBQU8sUUFBUDtBQUNIOztBQUVEOzs7OztBQUtBLGlCQUFTLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEI7QUFDdEIsZ0JBQUksV0FBVyxPQUFPLFFBQVAsRUFBaUIsV0FBVyxFQUE1QixDQUFmO0FBQ0EsZ0JBQUksSUFBSSxPQUFPLE1BQVAsQ0FBYyxPQUFkLEVBQXVCO0FBQzNCLDBCQUFVLEVBQUUsT0FBTyxRQUFUO0FBRGlCLGFBQXZCLENBQVI7QUFHQSxjQUFFLE9BQUY7O0FBRUE7QUFDQSxpQkFBSyxNQUFMLEdBQWMsWUFBVztBQUNyQixrQkFBRSxNQUFGO0FBQ0gsYUFGRDtBQUdIOztBQUVELGVBQU8sT0FBUDtBQUNILEtBM0hjLEVBQWY7O0FBNkhBO0FBQ0EsUUFBSyxPQUFPLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0MsT0FBTyxHQUE1QyxFQUFrRDtBQUM5QyxlQUFPLFNBQVAsRUFBa0IsWUFBVztBQUN6QixtQkFBTyxPQUFQO0FBQ0gsU0FGRDtBQUdIOztBQUVEO0FBTkEsU0FPSyxJQUFLLE9BQU8sTUFBUCxLQUFrQixXQUFsQixJQUFpQyxPQUFPLE9BQTdDLEVBQXVEO0FBQ3hELG1CQUFPLE9BQVAsR0FBaUIsT0FBakI7QUFDSDs7QUFFRDtBQUpLLGFBS0E7QUFDRCx1QkFBTyxPQUFQLEdBQWlCLE9BQWpCO0FBQ0g7QUFDSixDQWhKRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBpbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnLi9vdmVybGF5LmpzJztcbnZhciBPdmVybGF5ID0gcmVxdWlyZSgnLi9vdmVybGF5LmpzJyk7XG5cbnZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZW1vID4gYScpLFxuICAgIHZpZGVvID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXZpZGVvJyk7XG5cbmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxheWVyID0gbmV3IE92ZXJsYXkoe1xuICAgICAgICBodG1sOiAnPGlmcmFtZSB3aWR0aD1cIjg1M1wiIGhlaWdodD1cIjQ4MFwiIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycrIHZpZGVvICsnXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPicsIC8vIGh0bWwgc3RyaW5nIG9yIG5vZGUgdHlwZVxuICAgICAgICBjbG9zZToge1xuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSwgLy8gdXNlIGRlZmF1bHQgY2xvc2UgYnV0dG9uIChib29sZWFuKVxuICAgICAgICAgICAgdGV4dDogXCJDbG9zZVwiXG4gICAgICAgIH0sXG4gICAgICAgIG9uQXBwZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkFwcGVuZCBjYWxsYmFjaycpO1xuICAgICAgICB9LFxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb25SZW1vdmUgY2FsbGJhY2snKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IiwiKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgT3ZlcmxheSA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBodG1sOiAnJywgLy8gaHRtbCBzdHJpbmcgb3Igbm9kZSB0eXBlXG4gICAgICAgICAgICBjbG9zZToge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsICAvLyB1c2UgZGVmYXVsdCBjbG9zZSBidXR0b24gKGJvb2xlYW4pXG4gICAgICAgICAgICAgICAgb25zdGFnZTogZmFsc2UsIC8vIGNsb3NlIG9uIGNsaWNrIGV2ZW50LiBgLnN0YWdlYCBlbGVtZW50XG4gICAgICAgICAgICAgICAgdGV4dDogXCJDbG9zZVwiIC8vIGlubmVySFRNTFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQXBwZW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgb25SZW1vdmU6IGZ1bmN0aW9uKCkge31cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgICAgICAgICAgIGNsb3NlLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICAgICAgICAgICAgY2xvc2UuY2xhc3NMaXN0LmFkZCgnLWNsb3NlJyk7XG4gICAgICAgICAgICAgICAgY2xvc2UuaW5uZXJIVE1MID0gdGhpcy5zZXR0aW5ncy5jbG9zZS50ZXh0O1xuXG4gICAgICAgICAgICAgICAgc3RhZ2UuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheScpO1xuICAgICAgICAgICAgICAgIHN0YWdlLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiLWlubmVyXCI+PC9kaXY+JztcblxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5zZXR0aW5ncy5jbG9zZS5kZWZhdWx0ICkge1xuICAgICAgICAgICAgICAgICAgICBzdGFnZS5maXJzdENoaWxkLmFwcGVuZENoaWxkKGNsb3NlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiB0aGlzLnNldHRpbmdzLmh0bWwgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLmZpcnN0Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aGlzLnNldHRpbmdzLmh0bWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhZ2UuZmlyc3RDaGlsZC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzLmh0bWwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoc3RhZ2UpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuc2V0dGluZ3MuY2xvc2Uub25zdGFnZSApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShzdGFnZSk7XG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmQoc3RhZ2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFwcGVuZDogZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN0YWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5vbkFwcGVuZCgpOyAvLyBjYWxsYmFjayBmblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHN0YWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5vblJlbW92ZSgpOyAvLyBjYWxsYmFjayBmblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG1lcmdlIGRlZmF1bHRzIHdpdGggdXNlciBvcHRpb25zXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0cyBEZWZhdWx0IHNldHRpbmdzXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFVzZXIgb3B0aW9uc1xuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBNZXJnZWQgdmFsdWVzIG9mIGRlZmF1bHRzIGFuZCBvcHRpb25zXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICAgZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgICAgICAgICAgdmFyIGV4dGVuZGVkID0ge30sXG4gICAgICAgICAgICAgICAgZGVlcCA9IHRydWUsXG4gICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgYSBkZWVwIG1lcmdlXG4gICAgICAgICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggYXJndW1lbnRzWzBdICkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyApIHtcbiAgICAgICAgICAgICAgICBkZWVwID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWVyZ2UgdGhlIG9iamVjdCBpbnRvIHRoZSBleHRlbmRlZCBvYmplY3RcbiAgICAgICAgICAgIHZhciBtZXJnZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgcHJvcCBpbiBvYmogKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKCBvYmosIHByb3AgKSApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZGVlcCBtZXJnZSBhbmQgcHJvcGVydHkgaXMgYW4gb2JqZWN0LCBtZXJnZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGRlZXAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtwcm9wXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gZXh0ZW5kKCB0cnVlLCBleHRlbmRlZFtwcm9wXSwgb2JqW3Byb3BdICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG9ialtwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBlYWNoIG9iamVjdCBhbmQgY29uZHVjdCBhIG1lcmdlXG4gICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgIG1lcmdlKG9iaik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBleHRlbmRlZDtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY29uc3RydWN0b3JcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIE92ZXJsYXkob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgICAgIHZhciBfID0gT2JqZWN0LmNyZWF0ZShtZXRob2RzLCB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHsgdmFsdWU6IHNldHRpbmdzIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfLmNvbXBpbGUoKTtcblxuICAgICAgICAgICAgLy8gYWxpYXM6IHB1YmxpYyBtZXRob2RcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgXy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBPdmVybGF5O1xuICAgIH0oKSk7XG5cbiAgICAvLyBBTURcbiAgICBpZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xuICAgICAgICBkZWZpbmUoJ092ZXJsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBPdmVybGF5O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDb21tb25KU1xuICAgIGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBPdmVybGF5O1xuICAgIH1cblxuICAgIC8vIFdpbmRvdyB7fVxuICAgIGVsc2Uge1xuICAgICAgICBnbG9iYWwuT3ZlcmxheSA9IE92ZXJsYXk7XG4gICAgfVxufSkodGhpcyk7Il19
