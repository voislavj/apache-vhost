var Backbone = require('backbone');
var CONFIG   = require('../../../../config.json');

module.exports = Backbone.View.extend({
    tagName: 'p',
    
    initialize: function() {
        
    },
    
    render: function() {
        var group = this.model.get('group');
        var name  = this.model.get('name');
        var value = this.model.get('value');
        
        var label = $('<label>');
        var input = $('<input type="text">')
            .attr('name', "data" + (group ? "["+group+"]" : "") + "[" + name + "]")
            .val(value);
        label.append(name);
        label.append(input);
        
        this.$el.empty();
        
        // remove button
        if (name != "$args") {
            var btnRemove = $('<button class="remove icon" title="Remove">x</button>')
                .data('view', this)
                .click(this.remove);
            this.$el.prepend(btnRemove);
        }
        
        
        this.$el
            .append(label)
            .data('name', name)
            .data('value', value);
        
        return this;
    },
    
    remove: function(e) {
        console.log(e.target);
        var _this = $(this).data('view');
        
        if (confirm(CONFIG.app.deleteConfirm)) {
            _this.$el.remove();
        }
    }
});