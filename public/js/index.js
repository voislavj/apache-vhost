var lib   = require('./lib.js');

lib.ajax({
    url: '/index/index',
    complete: function(html, response) {
        alert(html);
    }
});
