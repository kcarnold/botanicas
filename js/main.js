var app = {};

$(function() {
  app.Tree = Backbone.Model.extend({});

  app.TreeList = Backbone.Collection.extend({
    model: app.Tree
  });

  app.TreeView = Backbone.View.extend({
    // When this is created, this.el will be an 'li' element.
    tagName: 'li',

    // Make a template out of the 'tree-template' script tag's content,
    // which we'll then call with the model's attributes.
    template: _.template($('#tree-template').html()),

    // The parent constructor will call 'delegateEvents',
    // which will bind all these events to corresponding methods.
    events: {
      'click .moreinfo': 'toggleMoreInfo'
    },

    // Called by Backbone when a TreeView is made.
    initialize: function() {
      // Update the view when the model changes.
      this.listenTo(this.model, 'change', this.render);
    },

    // Turn the model into viewable DOM elements.
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    // Called when the "More..." link is clicked.
    toggleMoreInfo: function() {
      // called with 'this' bound to this object.
      console.log('moreinfo', this.model.get('id'));
      alert("More info for the "+this.model.get('name'));
      return false;
    }

  });

  app.trees = new app.TreeList();
  app.trees.url = 'api/trees/';

  app.TreeListView = Backbone.View.extend({
    el: "#trees", // Use the existing element.

    events: {
      'submit #addtree': 'submitAddTreeForm'
    },

    initialize: function () {
      app.trees.on('add', this.addTree, this);
      app.trees.fetch();
    },

    addTree: function(tree) {
      var view = new app.TreeView({model: tree});
      this.$('#tree-list').append(view.render().el);
    },

    submitAddTreeForm: function() {
      app.trees.create({name: $("#name").val(), latlong: $("#latlong").val()});
      return false;
    }
  });

  // Kick off everything.
  app.treeListView = new app.TreeListView();
});

// Send models using form parameters (a little simpler to handle in PHP.)
Backbone.emulateJSON = true;
