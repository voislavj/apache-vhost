var CONFIG = require('../config.json');
var sys  = require('sys');
var exec = require('child_process').exec;

module.exports = {
    restart: function(callback) {
        exec(CONFIG.apache.restart, function(err, stderr, stdout){
            callback(err || stderr, stdout);
        })
    }
};