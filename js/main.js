var app = {};

$(function() {
  app.Tree = Backbone.Model.extend({});
  app.TreeList = Backbone.Collection.extend({
    model: app.Tree
  });
  app.TreeView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#tree-template').html()),
    events: {
      'click .moreinfo': 'moreinfo'
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    moreinfo: function() {
      // called with 'this' bound to this object.
      console.log('moreinfo', this.model.get('id'));
      return false;
    }

  });

  app.trees = new app.TreeList();
  app.trees.url = 'api/trees';

  app.TreeListView = Backbone.View.extend({
    el: "#trees",
    initialize: function () {
      app.trees.on('add', this.addTree, this);
      app.trees.fetch();
    },
    addTree: function(tree) {
      var view = new app.TreeView({model: tree});
      this.$('#tree-list').append(view.render().el);
    }
  });

  app.treeListView = new app.TreeListView();
});
