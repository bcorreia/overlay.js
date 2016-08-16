(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// import { Overlay } from './overlay.js';
var Overlay = require('./overlay.js');

var el = document.querySelector('.demo > a'),
    video = el.getAttribute('data-video');

el.addEventListener('click', function () {
    var layer = new Overlay({
        html: '<iframe width="853" height="480" src="https://www.youtube.com/embed/' + video + '" frameborder="0" allowfullscreen></iframe>',
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
            html: '',
            onAppend: function onAppend() {},
            onRemove: function onRemove() {}
        };

        var methods = {
            compile: function compile() {
                var stage = document.createElement('div'),
                    close = document.createElement('a');

                close.setAttribute('href', '#');
                close.classList.add('-close');
                close.innerHTML = 'Close';

                stage.classList.add('overlay');
                stage.innerHTML = '<div class="-inner"></div>';
                stage.firstChild.appendChild(close);
                stage.firstChild.insertAdjacentHTML('beforeend', this.settings.html);

                close.addEventListener('click', function (event) {
                    event.preventDefault();
                    this.remove(stage);
                }.bind(this));

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
            });
            _.compile();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL292ZXJsYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0EsSUFBSSxVQUFVLFFBQVEsY0FBUixDQUFkOztBQUVBLElBQUksS0FBSyxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVDtBQUFBLElBQ0ksUUFBUSxHQUFHLFlBQUgsQ0FBZ0IsWUFBaEIsQ0FEWjs7QUFHQSxHQUFHLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFlBQVc7QUFDcEMsUUFBSSxRQUFRLElBQUksT0FBSixDQUFZO0FBQ3BCLGNBQU0seUVBQXdFLEtBQXhFLEdBQStFLDZDQURqRTtBQUVwQixrQkFBVSxvQkFBVztBQUNqQixvQkFBUSxHQUFSLENBQVksbUJBQVo7QUFDSCxTQUptQjtBQUtwQixrQkFBVSxvQkFBVztBQUNqQixvQkFBUSxHQUFSLENBQVksbUJBQVo7QUFDSDtBQVBtQixLQUFaLENBQVo7QUFTSCxDQVZEOzs7OztBQ05BLENBQUMsVUFBVSxNQUFWLEVBQWtCO0FBQ2Y7O0FBRUEsUUFBSSxVQUFXLFlBQVc7O0FBRXRCLFlBQUksV0FBVztBQUNYLGtCQUFNLEVBREs7QUFFWCxzQkFBVSxvQkFBVyxDQUFFLENBRlo7QUFHWCxzQkFBVSxvQkFBVyxDQUFFO0FBSFosU0FBZjs7QUFNQSxZQUFJLFVBQVU7QUFDVixxQkFBUyxtQkFBVztBQUNoQixvQkFBSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQUEsb0JBQ0ksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FEWjs7QUFHQSxzQkFBTSxZQUFOLENBQW1CLE1BQW5CLEVBQTJCLEdBQTNCO0FBQ0Esc0JBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixRQUFwQjtBQUNBLHNCQUFNLFNBQU4sR0FBa0IsT0FBbEI7O0FBRUEsc0JBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixTQUFwQjtBQUNBLHNCQUFNLFNBQU4sR0FBa0IsNEJBQWxCO0FBQ0Esc0JBQU0sVUFBTixDQUFpQixXQUFqQixDQUE2QixLQUE3QjtBQUNBLHNCQUFNLFVBQU4sQ0FBaUIsa0JBQWpCLENBQW9DLFdBQXBDLEVBQWlELEtBQUssUUFBTCxDQUFjLElBQS9EOztBQUVBLHNCQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQVMsS0FBVCxFQUFnQjtBQUM1QywwQkFBTSxjQUFOO0FBQ0EseUJBQUssTUFBTCxDQUFZLEtBQVo7QUFDSCxpQkFIK0IsQ0FHOUIsSUFIOEIsQ0FHekIsSUFIeUIsQ0FBaEM7O0FBS0EscUJBQUssTUFBTCxDQUFZLEtBQVo7QUFDSCxhQXBCUztBQXFCVixvQkFBUSxnQkFBUyxLQUFULEVBQWdCO0FBQ3BCLHlCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEtBQTFCO0FBQ0EsdUJBQU8sS0FBSyxRQUFMLENBQWMsUUFBZCxFQUFQLENBRm9CLENBRWE7QUFDcEMsYUF4QlM7QUF5QlYsb0JBQVEsZ0JBQVMsS0FBVCxFQUFnQjtBQUNwQix5QkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUExQjtBQUNBLHVCQUFPLEtBQUssUUFBTCxDQUFjLFFBQWQsRUFBUCxDQUZvQixDQUVhO0FBQ3BDO0FBNUJTLFNBQWQ7O0FBK0JBOzs7Ozs7O0FBT0MsaUJBQVMsTUFBVCxDQUFnQixRQUFoQixFQUEwQixPQUExQixFQUFtQztBQUMvQixnQkFBSSxJQUFJLE9BQU8sTUFBUCxDQUFjLFFBQWQsQ0FBUjtBQUNBLG1CQUFPLElBQVAsQ0FBWSxPQUFaLEVBQXFCLEdBQXJCLENBQXlCLFVBQVUsSUFBVixFQUFnQjtBQUNyQyx3QkFBUSxDQUFSLEtBQWMsRUFBRSxJQUFGLElBQVUsUUFBUSxJQUFSLENBQXhCO0FBQ0gsYUFGRDtBQUdBLG1CQUFPLENBQVA7QUFDSDs7QUFFRDs7Ozs7QUFLRCxpQkFBUyxPQUFULENBQWlCLE9BQWpCLEVBQTBCO0FBQ3RCLGdCQUFJLFdBQVcsT0FBTyxRQUFQLEVBQWlCLFdBQVcsRUFBNUIsQ0FBZjtBQUNBLGdCQUFJLElBQUksT0FBTyxNQUFQLENBQWMsT0FBZCxFQUF1QjtBQUMzQiwwQkFBVSxFQUFFLE9BQU8sUUFBVDtBQURpQixhQUF2QixDQUFSO0FBR0EsY0FBRSxPQUFGO0FBQ0g7O0FBRUQsZUFBTyxPQUFQO0FBQ0gsS0FwRWMsRUFBZjs7QUFzRUE7QUFDQSxRQUFLLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLEdBQTVDLEVBQWtEO0FBQzlDLGVBQU8sU0FBUCxFQUFrQixZQUFXO0FBQ3pCLG1CQUFPLE9BQVA7QUFDSCxTQUZEO0FBR0g7O0FBRUQ7QUFOQSxTQU9LLElBQUssT0FBTyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDLE9BQU8sT0FBN0MsRUFBdUQ7QUFDeEQsbUJBQU8sT0FBUCxHQUFpQixPQUFqQjtBQUNIOztBQUVEO0FBSkssYUFLQTtBQUNELHVCQUFPLE9BQVAsR0FBaUIsT0FBakI7QUFDSDtBQUNKLENBekZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICcuL292ZXJsYXkuanMnO1xudmFyIE92ZXJsYXkgPSByZXF1aXJlKCcuL292ZXJsYXkuanMnKTtcblxudmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8gPiBhJyksXG4gICAgdmlkZW8gPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmlkZW8nKTtcblxuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGF5ZXIgPSBuZXcgT3ZlcmxheSh7XG4gICAgICAgIGh0bWw6ICc8aWZyYW1lIHdpZHRoPVwiODUzXCIgaGVpZ2h0PVwiNDgwXCIgc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJysgdmlkZW8gKydcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+JyxcbiAgICAgICAgb25BcHBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uQXBwZW5kIGNhbGxiYWNrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvblJlbW92ZSBjYWxsYmFjaycpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCIoZnVuY3Rpb24gKGdsb2JhbCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBPdmVybGF5ID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGh0bWw6ICcnLFxuICAgICAgICAgICAgb25BcHBlbmQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtZXRob2RzID0ge1xuICAgICAgICAgICAgY29tcGlsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICAgICAgICAgICAgY2xvc2Uuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICAgICAgICAgICAgICBjbG9zZS5jbGFzc0xpc3QuYWRkKCctY2xvc2UnKTtcbiAgICAgICAgICAgICAgICBjbG9zZS5pbm5lckhUTUwgPSAnQ2xvc2UnO1xuXG4gICAgICAgICAgICAgICAgc3RhZ2UuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheScpO1xuICAgICAgICAgICAgICAgIHN0YWdlLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiLWlubmVyXCI+PC9kaXY+JztcbiAgICAgICAgICAgICAgICBzdGFnZS5maXJzdENoaWxkLmFwcGVuZENoaWxkKGNsb3NlKTtcbiAgICAgICAgICAgICAgICBzdGFnZS5maXJzdENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGhpcy5zZXR0aW5ncy5odG1sKTtcblxuICAgICAgICAgICAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoc3RhZ2UpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZChzdGFnZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXBwZW5kOiBmdW5jdGlvbihzdGFnZSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3RhZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLm9uQXBwZW5kKCk7IC8vIGNhbGxiYWNrIGZuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbihzdGFnZSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc3RhZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLm9uUmVtb3ZlKCk7IC8vIGNhbGxiYWNrIGZuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogbWVyZ2UgZGVmYXVsdHMgd2l0aCB1c2VyIG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzIERlZmF1bHQgc2V0dGluZ3NcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVXNlciBvcHRpb25zXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IE1lcmdlZCB2YWx1ZXMgb2YgZGVmYXVsdHMgYW5kIG9wdGlvbnNcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgICBmdW5jdGlvbiBleHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICB2YXIgYSA9IE9iamVjdC5jcmVhdGUoZGVmYXVsdHMpO1xuICAgICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgICAgICBwcm9wIGluIGEgJiYgKGFbcHJvcF0gPSBvcHRpb25zW3Byb3BdKTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgIH1cblxuICAgICAgICAgLyoqXG4gICAgICAgICAgKiBjb25zdHJ1Y3RvclxuICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICAqXG4gICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gT3ZlcmxheShvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBleHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuICAgICAgICAgICAgdmFyIF8gPSBPYmplY3QuY3JlYXRlKG1ldGhvZHMsIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogeyB2YWx1ZTogc2V0dGluZ3MgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF8uY29tcGlsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE92ZXJsYXk7XG4gICAgfSgpKTtcblxuICAgIC8vIEFNRFxuICAgIGlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG4gICAgICAgIGRlZmluZSgnT3ZlcmxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE92ZXJsYXk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIENvbW1vbkpTXG4gICAgZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IE92ZXJsYXk7XG4gICAgfVxuXG4gICAgLy8gV2luZG93IHt9XG4gICAgZWxzZSB7XG4gICAgICAgIGdsb2JhbC5PdmVybGF5ID0gT3ZlcmxheTtcbiAgICB9XG59KSh0aGlzKTsiXX0=
