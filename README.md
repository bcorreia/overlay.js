# overlay.js
![Bower version](https://img.shields.io/bower/v/overlay.js.svg?style=flat)
[![npm version](https://img.shields.io/npm/v/overlay.js.svg?style=flat)](https://www.npmjs.com/package/overlay.js)
[![Build Status](https://travis-ci.org/bcorreia/overlay.js.svg?branch=master)](https://travis-ci.org/bcorreia/overlay.js)

Slim fast overlay, no dependencies — just the basics<br />
[**Demo**](http://bcorreia.com/projects/overlay.js/src/demo.html)

---
## Getting Started
You may install overlay.js using package managers, or download project [archive](https://github.com/bcorreia/overlay.js/archive/master.zip).<br />
```bash
bower install overlay.js
npm install overlay.js

# overlay.min.js           minified version of overlay.js
```

## Usage
```javascript
var Overlay = require('./overlay.js'); // commonJS (optional)
element.addEventListener('click', function() {
    var layer = new Overlay({
        html: '',
        onAppend: function() {},
        onRemove: function() {}
    });
});
```

### Callbacks
```javascript
 // called right after `html` has been appended to document
onAppend: function() {}

// called right after `html` has been remove from document
onRemove: function() {}
```

## CSS
```css
/* required */
.overlay             { background: rgba(0, 0, 0, 0.75); width: 100vw; height: 100vh; position:fixed; top:0; animation: fade-in .5s; }
.overlay .-inner     { width: 100vw; height: 100vh; display: flex; display: -webkit-flex; align-items: center; -webkit-align-items: center; justify-content:center; -webkit-justify-content:center; -ms-flex-pack:justify; }
.overlay .-close     { position: absolute; top: 32px; right: 36px; padding: 8px 18px; border: 1px solid #FFF; }

/* overlay fade-in animation */
@-webkit-keyframes fade-in {
    from   { opacity: 0; }
    to     { opacity: 1; }
}
@keyframes fade-in {
    from   { opacity: 0; }
    to     { opacity: 1; }
}
```

---
## License
This software is free to use under the [MIT license](https://github.com/bcorreia/overlay.js/blob/master/license.md).