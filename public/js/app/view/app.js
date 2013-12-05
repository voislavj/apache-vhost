var Backbone  = require('backbone');
var _         = require('lodash');
var VhostView = require('./vhost');
var Lib       = require('../../lib');

module.exports = Backbone.View.extend({
    el: '#app-container',
    events: {
        "click #apache-restart": "apacheRestart"
    },
    
    initialize: function() {
        this.menu = $('#vhosts');
        this.content = $('#content');
        this.items = {};
        
        this.items = [];
        var _this  = this, item;
        this.collection.each(function(model, index){
        	item = new VhostView({model: model});
        	_this.items[index] = item;
            _this.menu.append(item.el);
        });
    },
    
    selectMenuItem: function(name) {
        var li = this.ul.children('li#li-'+$escape(name));
        
        this.ul.children('li').removeClass('selected');
        li.addClass('selected');
    },
    
    setContent: function(html) {
        this.content.html(html);
    },
    
    apacheRestart: function() {
        var _this = this;
        var socket = io.connect('http://' + location.hostname + ":" + location.port);
        socket.on('restarted', function(result){
            _this.$el.removeClass('loading');
            
            if (result.err) {
                alert('Error: ' + result.err);
            }
        });
        this.$el.addClass('loading');
        socket.emit('apache-restart');
    }
});