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

var Overlay = function () {
    'use strict';

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

/**
 * CommonJS module is defined
 *
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Overlay;
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL292ZXJsYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0EsSUFBSSxVQUFVLFFBQVEsY0FBUixDQUFkOztBQUVBLElBQUksS0FBSyxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVDtBQUFBLElBQ0ksUUFBUSxHQUFHLFlBQUgsQ0FBZ0IsWUFBaEIsQ0FEWjs7QUFHQSxHQUFHLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFlBQVc7QUFDcEMsUUFBSSxRQUFRLElBQUksT0FBSixDQUFZO0FBQ3BCLGNBQU0seUVBQXdFLEtBQXhFLEdBQStFLDZDQURqRTtBQUVwQixrQkFBVSxvQkFBVztBQUNqQixvQkFBUSxHQUFSLENBQVksbUJBQVo7QUFDSCxTQUptQjtBQUtwQixrQkFBVSxvQkFBVztBQUNqQixvQkFBUSxHQUFSLENBQVksbUJBQVo7QUFDSDtBQVBtQixLQUFaLENBQVo7QUFTSCxDQVZEOzs7OztBQ05BLElBQUksVUFBVyxZQUFXO0FBQ3RCOztBQUVBLFFBQUksV0FBVztBQUNYLGNBQU0sRUFESztBQUVYLGtCQUFVLG9CQUFXLENBQUUsQ0FGWjtBQUdYLGtCQUFVLG9CQUFXLENBQUU7QUFIWixLQUFmOztBQU1BLFFBQUksVUFBVTtBQUNWLGlCQUFTLG1CQUFXO0FBQ2hCLGdCQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFBQSxnQkFDSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQURaOztBQUdBLGtCQUFNLFlBQU4sQ0FBbUIsTUFBbkIsRUFBMkIsR0FBM0I7QUFDQSxrQkFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLFFBQXBCO0FBQ0Esa0JBQU0sU0FBTixHQUFrQixPQUFsQjs7QUFFQSxrQkFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLFNBQXBCO0FBQ0Esa0JBQU0sU0FBTixHQUFrQiw0QkFBbEI7QUFDQSxrQkFBTSxVQUFOLENBQWlCLFdBQWpCLENBQTZCLEtBQTdCO0FBQ0Esa0JBQU0sVUFBTixDQUFpQixrQkFBakIsQ0FBb0MsV0FBcEMsRUFBaUQsS0FBSyxRQUFMLENBQWMsSUFBL0Q7O0FBRUEsa0JBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBUyxLQUFULEVBQWdCO0FBQzVDLHNCQUFNLGNBQU47QUFDQSxxQkFBSyxNQUFMLENBQVksS0FBWjtBQUNILGFBSCtCLENBRzlCLElBSDhCLENBR3pCLElBSHlCLENBQWhDOztBQUtBLGlCQUFLLE1BQUwsQ0FBWSxLQUFaO0FBQ0gsU0FwQlM7QUFxQlYsZ0JBQVEsZ0JBQVMsS0FBVCxFQUFnQjtBQUNwQixxQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUExQjtBQUNBLG1CQUFPLEtBQUssUUFBTCxDQUFjLFFBQWQsRUFBUCxDQUZvQixDQUVhO0FBQ3BDLFNBeEJTO0FBeUJWLGdCQUFRLGdCQUFTLEtBQVQsRUFBZ0I7QUFDcEIscUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBMUI7QUFDQSxtQkFBTyxLQUFLLFFBQUwsQ0FBYyxRQUFkLEVBQVAsQ0FGb0IsQ0FFYTtBQUNwQztBQTVCUyxLQUFkOztBQStCQTs7Ozs7OztBQU9DLGFBQVMsTUFBVCxDQUFnQixRQUFoQixFQUEwQixPQUExQixFQUFtQztBQUMvQixZQUFJLElBQUksT0FBTyxNQUFQLENBQWMsUUFBZCxDQUFSO0FBQ0EsZUFBTyxJQUFQLENBQVksT0FBWixFQUFxQixHQUFyQixDQUF5QixVQUFVLElBQVYsRUFBZ0I7QUFDckMsb0JBQVEsQ0FBUixLQUFjLEVBQUUsSUFBRixJQUFVLFFBQVEsSUFBUixDQUF4QjtBQUNILFNBRkQ7QUFHQSxlQUFPLENBQVA7QUFDSDs7QUFFRDs7Ozs7QUFLRCxhQUFTLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEI7QUFDdEIsWUFBSSxXQUFXLE9BQU8sUUFBUCxFQUFpQixXQUFXLEVBQTVCLENBQWY7QUFDQSxZQUFJLElBQUksT0FBTyxNQUFQLENBQWMsT0FBZCxFQUF1QjtBQUMzQixzQkFBVSxFQUFFLE9BQU8sUUFBVDtBQURpQixTQUF2QixDQUFSO0FBR0EsVUFBRSxPQUFGO0FBQ0g7O0FBRUQsV0FBTyxPQUFQO0FBQ0gsQ0FyRWMsRUFBZjs7QUF1RUE7Ozs7QUFJQSxJQUFLLE9BQU8sTUFBUCxLQUFrQixXQUFsQixJQUFpQyxPQUFPLE9BQTdDLEVBQXVEO0FBQ25ELFdBQU8sT0FBUCxHQUFpQixPQUFqQjtBQUNIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICcuL292ZXJsYXkuanMnO1xudmFyIE92ZXJsYXkgPSByZXF1aXJlKCcuL292ZXJsYXkuanMnKTtcblxudmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8gPiBhJyksXG4gICAgdmlkZW8gPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmlkZW8nKTtcblxuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGF5ZXIgPSBuZXcgT3ZlcmxheSh7XG4gICAgICAgIGh0bWw6ICc8aWZyYW1lIHdpZHRoPVwiODUzXCIgaGVpZ2h0PVwiNDgwXCIgc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJysgdmlkZW8gKydcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+JyxcbiAgICAgICAgb25BcHBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uQXBwZW5kIGNhbGxiYWNrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvblJlbW92ZSBjYWxsYmFjaycpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCJ2YXIgT3ZlcmxheSA9IChmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIGh0bWw6ICcnLFxuICAgICAgICBvbkFwcGVuZDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgb25SZW1vdmU6IGZ1bmN0aW9uKCkge31cbiAgICB9O1xuXG4gICAgdmFyIG1ldGhvZHMgPSB7XG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHN0YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICAgICAgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgICAgICAgIGNsb3NlLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICAgICAgICBjbG9zZS5jbGFzc0xpc3QuYWRkKCctY2xvc2UnKTtcbiAgICAgICAgICAgIGNsb3NlLmlubmVySFRNTCA9ICdDbG9zZSc7XG5cbiAgICAgICAgICAgIHN0YWdlLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXknKTtcbiAgICAgICAgICAgIHN0YWdlLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiLWlubmVyXCI+PC9kaXY+JztcbiAgICAgICAgICAgIHN0YWdlLmZpcnN0Q2hpbGQuYXBwZW5kQ2hpbGQoY2xvc2UpO1xuICAgICAgICAgICAgc3RhZ2UuZmlyc3RDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRoaXMuc2V0dGluZ3MuaHRtbCk7XG5cbiAgICAgICAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHN0YWdlKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHRoaXMuYXBwZW5kKHN0YWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgYXBwZW5kOiBmdW5jdGlvbihzdGFnZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGFnZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5vbkFwcGVuZCgpOyAvLyBjYWxsYmFjayBmblxuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHN0YWdlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLm9uUmVtb3ZlKCk7IC8vIGNhbGxiYWNrIGZuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBtZXJnZSBkZWZhdWx0cyB3aXRoIHVzZXIgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0cyBEZWZhdWx0IHNldHRpbmdzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVXNlciBvcHRpb25zXG4gICAgICogQHJldHVybnMge09iamVjdH0gTWVyZ2VkIHZhbHVlcyBvZiBkZWZhdWx0cyBhbmQgb3B0aW9uc1xuICAgICAqXG4gICAgICovXG4gICAgIGZ1bmN0aW9uIGV4dGVuZChkZWZhdWx0cywgb3B0aW9ucykge1xuICAgICAgICAgdmFyIGEgPSBPYmplY3QuY3JlYXRlKGRlZmF1bHRzKTtcbiAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgIHByb3AgaW4gYSAmJiAoYVtwcm9wXSA9IG9wdGlvbnNbcHJvcF0pO1xuICAgICAgICAgfSk7XG4gICAgICAgICByZXR1cm4gYTtcbiAgICAgfVxuXG4gICAgIC8qKlxuICAgICAgKiBjb25zdHJ1Y3RvclxuICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgKlxuICAgICAgKi9cbiAgICBmdW5jdGlvbiBPdmVybGF5KG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNldHRpbmdzID0gZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgdmFyIF8gPSBPYmplY3QuY3JlYXRlKG1ldGhvZHMsIHtcbiAgICAgICAgICAgIHNldHRpbmdzOiB7IHZhbHVlOiBzZXR0aW5ncyB9XG4gICAgICAgIH0pXG4gICAgICAgIF8uY29tcGlsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBPdmVybGF5O1xufSgpKTtcblxuLyoqXG4gKiBDb21tb25KUyBtb2R1bGUgaXMgZGVmaW5lZFxuICpcbiAqL1xuaWYgKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IE92ZXJsYXk7XG59Il19
