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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL292ZXJsYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0EsSUFBSSxVQUFVLFFBQVEsY0FBUixDQUFkOztBQUVBLElBQUksS0FBSyxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVDtBQUFBLElBQ0ksUUFBUSxHQUFHLFlBQUgsQ0FBZ0IsWUFBaEIsQ0FEWjs7QUFHQSxHQUFHLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFlBQVc7QUFDcEMsUUFBSSxRQUFRLElBQUksT0FBSixDQUFZO0FBQ3BCLGNBQU0seUVBQXdFLEtBQXhFLEdBQStFLDZDQURqRSxFQUNnSDtBQUNwSSxlQUFPO0FBQ0gscUJBQVMsSUFETixFQUNZO0FBQ2Ysa0JBQU07QUFGSCxTQUZhO0FBTXBCLGtCQUFVLG9CQUFXO0FBQ2pCLG9CQUFRLEdBQVIsQ0FBWSxtQkFBWjtBQUNILFNBUm1CO0FBU3BCLGtCQUFVLG9CQUFXO0FBQ2pCLG9CQUFRLEdBQVIsQ0FBWSxtQkFBWjtBQUNIO0FBWG1CLEtBQVosQ0FBWjtBQWFILENBZEQ7Ozs7O0FDTkEsQ0FBQyxVQUFVLE1BQVYsRUFBa0I7QUFDZjs7QUFFQSxRQUFJLFVBQVcsWUFBVzs7QUFFdEIsWUFBSSxXQUFXO0FBQ1gsa0JBQU0sRUFESyxFQUNEO0FBQ1YsbUJBQU87QUFDSCx5QkFBUyxJQUROLEVBQ2E7QUFDaEIsc0JBQU0sT0FGSCxDQUVXO0FBRlgsYUFGSTtBQU1YLHNCQUFVLG9CQUFXLENBQUUsQ0FOWjtBQU9YLHNCQUFVLG9CQUFXLENBQUU7QUFQWixTQUFmOztBQVVBLFlBQUksVUFBVTtBQUNWLHFCQUFTLG1CQUFXO0FBQ2hCLG9CQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFB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ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICcuL292ZXJsYXkuanMnO1xudmFyIE92ZXJsYXkgPSByZXF1aXJlKCcuL292ZXJsYXkuanMnKTtcblxudmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8gPiBhJyksXG4gICAgdmlkZW8gPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmlkZW8nKTtcblxuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGF5ZXIgPSBuZXcgT3ZlcmxheSh7XG4gICAgICAgIGh0bWw6ICc8aWZyYW1lIHdpZHRoPVwiODUzXCIgaGVpZ2h0PVwiNDgwXCIgc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJysgdmlkZW8gKydcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+JywgLy8gaHRtbCBzdHJpbmcgb3Igbm9kZSB0eXBlXG4gICAgICAgIGNsb3NlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLCAvLyB1c2UgZGVmYXVsdCBjbG9zZSBidXR0b24gKGJvb2xlYW4pXG4gICAgICAgICAgICB0ZXh0OiBcIkNsb3NlXCJcbiAgICAgICAgfSxcbiAgICAgICAgb25BcHBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uQXBwZW5kIGNhbGxiYWNrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvblJlbW92ZSBjYWxsYmFjaycpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCIoZnVuY3Rpb24gKGdsb2JhbCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBPdmVybGF5ID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGh0bWw6ICcnLCAvLyBodG1sIHN0cmluZyBvciBub2RlIHR5cGVcbiAgICAgICAgICAgIGNsb3NlOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSwgIC8vIHVzZSBkZWZhdWx0IGNsb3NlIGJ1dHRvbiAoYm9vbGVhbilcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkNsb3NlXCIgLy8gaW5uZXJIVE1MXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25BcHBlbmQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtZXRob2RzID0ge1xuICAgICAgICAgICAgY29tcGlsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICAgICAgICAgICAgY2xvc2Uuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICAgICAgICAgICAgICBjbG9zZS5jbGFzc0xpc3QuYWRkKCctY2xvc2UnKTtcbiAgICAgICAgICAgICAgICBjbG9zZS5pbm5lckhUTUwgPSB0aGlzLnNldHRpbmdzLmNsb3NlLnRleHQ7XG5cbiAgICAgICAgICAgICAgICBzdGFnZS5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgICAgICAgICAgICAgc3RhZ2UuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCItaW5uZXJcIj48L2Rpdj4nO1xuXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLnNldHRpbmdzLmNsb3NlLmRlZmF1bHQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLmZpcnN0Q2hpbGQuYXBwZW5kQ2hpbGQoY2xvc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIHRoaXMuc2V0dGluZ3MuaHRtbCA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhZ2UuZmlyc3RDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRoaXMuc2V0dGluZ3MuaHRtbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGFnZS5maXJzdENoaWxkLmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3MuaHRtbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShzdGFnZSk7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKHN0YWdlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhcHBlbmQ6IGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGFnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Mub25BcHBlbmQoKTsgLy8gY2FsbGJhY2sgZm5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzdGFnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Mub25SZW1vdmUoKTsgLy8gY2FsbGJhY2sgZm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBtZXJnZSBkZWZhdWx0cyB3aXRoIHVzZXIgb3B0aW9uc1xuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdHMgRGVmYXVsdCBzZXR0aW5nc1xuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBVc2VyIG9wdGlvbnNcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gTWVyZ2VkIHZhbHVlcyBvZiBkZWZhdWx0cyBhbmQgb3B0aW9uc1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgIGZ1bmN0aW9uIGV4dGVuZChkZWZhdWx0cywgb3B0aW9ucykge1xuICAgICAgICAgICAgIHZhciBhID0gT2JqZWN0LmNyZWF0ZShkZWZhdWx0cyk7XG4gICAgICAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykubWFwKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgIHByb3AgaW4gYSAmJiAoYVtwcm9wXSA9IG9wdGlvbnNbcHJvcF0pO1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgfVxuXG4gICAgICAgICAvKipcbiAgICAgICAgICAqIGNvbnN0cnVjdG9yXG4gICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICAgICpcbiAgICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBPdmVybGF5KG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IGV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG4gICAgICAgICAgICB2YXIgXyA9IE9iamVjdC5jcmVhdGUobWV0aG9kcywge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7IHZhbHVlOiBzZXR0aW5ncyB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXy5jb21waWxlKCk7XG5cbiAgICAgICAgICAgIC8vIGFsaWFzOiBwdWJsaWMgbWV0aG9kXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF8ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gT3ZlcmxheTtcbiAgICB9KCkpO1xuXG4gICAgLy8gQU1EXG4gICAgaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAgICAgZGVmaW5lKCdPdmVybGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gT3ZlcmxheTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQ29tbW9uSlNcbiAgICBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gT3ZlcmxheTtcbiAgICB9XG5cbiAgICAvLyBXaW5kb3cge31cbiAgICBlbHNlIHtcbiAgICAgICAgZ2xvYmFsLk92ZXJsYXkgPSBPdmVybGF5O1xuICAgIH1cbn0pKHRoaXMpOyJdfQ==
