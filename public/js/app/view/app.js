var Backbone   = require('backbone');
var _          = require('lodash');
var VhostView  = require('./vhost');
var VhostModel = require('../model/vhost');
var Lib        = require('../../lib');

module.exports = Backbone.View.extend({
    el: '#app-container',
    events: {
        "click #apache-restart": "apacheRestart",
        "click #new-host":       "newHost"
    },
    
    initialize: function() {
        this.menu = $('#vhosts');
        this.content = $('#content');
        this.items = {};
        
        this.listenTo(this.collection, "add", this.render);
        
        this.items = [];
        this.render();
    },
    
    render: function() {
        var _this = this;
        var item;
        this.menu.empty();
        this.collection.each(function(model, index){
            item = new VhostView({model: model});
            _this.items[index] = item;
            _this.menu.append(item.$el);
        });
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
    },
    
    newHost: function() {
        var name = prompt('Host name:');
        if (name) {
            this.collection.add({
                "ServerName": name
            });
            this.menu
                .children('li#'+this.collection.get(name).cid)
                .children('a').click();
        }
    }
});