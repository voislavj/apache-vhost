var Backbone  = require('backbone');
var _         = require('lodash');
var VhostForm = require('./vhost_form');

module.exports = Backbone.View.extend({
    tagName:    'li',
    events: {
        "click a": "edit"
    },
    
    initialize: function(){
        this.content = $('#content');
        this.render();
    },
    
    render: function(){
        var name = this.model.name();
        var a = $('<a href="#'+name+'">'+name+'</a>');
        this.$el
            .html(a)
            .data('name', this.model.name())
            .attr('id', this.model.cid);
        
        return this;
    },
    
    edit: function(e) {        
        this.selectMenuItem();
        
        var formView = new VhostForm({model: this.model});
        this.content.html(formView.$el);
        
        this.updateContentSize();
    },
    
    selectMenuItem: function() {
        this.$el.parent().find('a').removeClass('selected');
        this.$el.find('a').addClass('selected');
    },
    
    updateContentSize: function() {
        $('#content').css('height', 'auto');
        var contentHeight = $('#content').height();
        var vhostsHeight  = $('#vhosts').height();
        if (contentHeight < vhostsHeight) {
            $('#content').css('height', vhostsHeight);
        }
    }
});