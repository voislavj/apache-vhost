var Backbone = require('backbone');

module.exports = Backbone.View.extend({
    tagName: 'p',
    
    initialize: function() {
        
    },
    
    render: function() {
        var group = this.model.get('group');
        var name  = this.model.get('name');
        var value = this.model.get('value');
        
        var label = $('<label>');
        var input = $('<input type="text">');
        input
            .attr('name', "data" + (group ? "["+group+"]" : "") + "[" + name + "]")
            .val(value);
        
        label.append(name);
        label.append(input);
        
        this.$el.html(label);
        
        return this;
    }
});