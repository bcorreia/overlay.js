// import { Overlay } from './overlay.js';
var Overlay = require('./overlay.js');

var el = document.querySelector('.demo > a'),
    video = el.getAttribute('data-video');

el.addEventListener('click', function() {
    var layer = new Overlay({
        html: '<iframe width="853" height="480" src="https://www.youtube.com/embed/'+ video +'" frameborder="0" allowfullscreen></iframe>', // html string or node type
        close: {
            default: true, // use default close button (boolean)
            text: "Close"
        },
        onAppend: function() {
            console.log('onAppend callback');
        },
        onRemove: function() {
            console.log('onRemove callback');
        }
    });
});