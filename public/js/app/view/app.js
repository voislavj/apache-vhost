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
        Lib.ajax({
            url: '/apache/restart',
            start: function() {
                _this.$el.addClass('loading');
            },
            complete: function(html, response) {
                _this.$el.removeClass('loading');
                alert(html);
            }
        });
    }
});