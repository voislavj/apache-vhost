var VhostsCollection = Backbone.Collection.extend({
    model: Vhost,
    comparator: 'ServerName'
});
var Vhosts = new VhostsCollection();