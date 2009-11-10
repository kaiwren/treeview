function TreeView(target) {
  this.target = target;
  this.initialize();
}

Object.extend(TreeView, {
  classes: {
    treeview: 'treeview',
    expandable: 'expandable',
    collapsable: 'collapsable',
    last: 'last',
    lastCollapsable: 'lastCollapsable',
    lastExpandable: 'lastExpandable',
    hitarea: 'hitarea',
    collapsableHitArea: 'collapsable-hitarea',
    lastCollapsableHitArea: 'lastCollapsable-hitarea'
  },

  buildHitArea: function(){
    return new Element('div', {'class': TreeView.classes.hitarea});
  }
});

TreeView.prototype = {
  initialize: function() {
    this.root = $(Sizzle('ul:first > li', this.target).first());
    this.render();
  },

  extractLastBranches: function(){
    return Sizzle("li:last-child:has(ul)", this.target);
  },

  extractBranches: function() {
    return Sizzle('li:has(ul)', this.target);
  },

  extractLeaves: function(){
    return Sizzle(":last-child:not(ul):not(:has(ul))", this.target);
  },

  render: function() {
    this.target.addClassName(TreeView.classes.treeview);
    this.extractBranches().each(function(element) {
      var hitArea = TreeView.buildHitArea();
      hitArea.observe('click', function(e){

      });
      element.addClassName(TreeView.classes.collapsable);
      element.store('hitArea', hitArea);
      element.insert({top: hitArea.addClassName(TreeView.classes.collapsableHitArea)});
    });
    this.extractLastBranches().each(function(element) {
      element.addClassName(TreeView.classes.lastCollapsable);
      element.retrieve('hitArea').addClassName(TreeView.classes.lastCollapsableHitArea);
    });
    this.extractLeaves().each(function(leaf){
      leaf.addClassName(TreeView.classes.last);
    });
  },

  toggle: function(node){
    
  }
}

