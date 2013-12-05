var Backbone  = require('backbone');
var _         = require('lodash');
var VhostForm = require('./vhost_form');

module.exports = Backbone.View.extend({
    tagName:    'li',
    template:   _.template($('#vhost-item').html()),
    
    events: {
        "click a": "edit"
    },
    
    initialize: function(){
        this.content = $('#content');
        this.render();
    },
    
    render: function(){
        this.$el
            .html(this.template({
                name: this.model.name().toString(),
                attr: this.model.attributes
            }))
            .data('name', this.model.name());
        
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