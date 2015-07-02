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

// usage
var el = document.querySelector('.foobar'),
    video = el.getAttribute('data-video');

el.addEventListener('click', function() {
    var layer = new Overlay({
        html: '<iframe width="853" height="480" src="https://www.youtube.com/embed/'+ video +'" frameborder="0" allowfullscreen></iframe>'
    });
});