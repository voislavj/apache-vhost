var Backbone        = require('backbone');
var VhostParam      = require('./vhost_parameter');
var VhostParamModel = require('../model/vhost_parameter');
var CONFIG          = require('../../../../config.json');


module.exports = Backbone.View.extend({
    tagName: 'fieldset',
    
    initialize: function() {
        
    },
    
    render: function() {
        var name   = this.model.get('name');
        var params = this.model.get('params');
        
        // add legend
        $('<legend>')
            .appendTo(this.$el)
            .html(name);
        
        // add remove button
        $('<button class="remove icon" title="Remove">x</button>')
            .appendTo(this.$el)
            .data('view', this)
            .click(this.remove);
        
        
        // add params
        var param;
        var container=$('<div class="params">');
        for (x in params) {
            param = new VhostParam({
                model: new VhostParamModel({
                    group: name,
                    name:  x,
                    value: params[x]
                })
            });
            container.append(param.render().$el);
        }
        this.$el.append(container);
        
        // new parameter
        $('<button class="add">add</button>')
            .data('view', this)
            .appendTo(this.$el)
            .click(this.addParam);
        
        return this;
    },
    
    addParam: function(){
        var _this = $(this).data('view');
        var name = prompt('Parameter name:');
        if (name) {
            var paramView = new VhostParam({
                model: new VhostParamModel({
                    group: _this.model.get('name'),
                    name: name
                })
            });
            _this.$el.find('.params').append(paramView.render().$el);
        }
    },
    
    remove: function() {
        var _this = $(this).data('view');
        if (confirm(CONFIG.app.deleteConfirm)) {
            _this.$el.remove();
        }
    }
});