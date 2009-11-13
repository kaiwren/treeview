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
    lastCollapsableHitArea: 'lastCollapsable-hitarea',
    expandableHitArea: 'expandable-hitarea',
    lastExpandableHitArea: 'lastExpandable-hitarea'
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
    var self = this;

    this.target.addClassName(TreeView.classes.treeview);

    this.extractBranches().each(function(element) {
      var hitArea = TreeView.buildHitArea();
      var children = Sizzle('> ul', element);

      if(children.length != 1){ throw "Error: Branch node contains more than one ul tag"}

      element.addClassName(TreeView.classes.collapsable);
      element.store('hitArea', hitArea);
      element.store('children', children[0]);
      hitArea.store('node', element);
      element.insert({top: hitArea.addClassName(TreeView.classes.collapsableHitArea)});

      hitArea.observe('click', function(e){
        self.toggle(e.element().retrieve('node'));
      });
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
    var children = node.retrieve('children');
    var hitArea = node.retrieve('hitArea');

    Effect.toggle(children, 'blind');
    if(!children.visible()){
      if(node.hasClassName(TreeView.classes.expandable)){
        node.removeClassName(TreeView.classes.expandable);
        node.addClassName(TreeView.classes.collapsable);

        hitArea.removeClassName(TreeView.classes.expandableHitArea);
        hitArea.addClassName(TreeView.classes.collapsableHitArea);
      }
      if(node.hasClassName(TreeView.classes.lastExpandable)){
        node.removeClassName(TreeView.classes.lastExpandable);
        node.addClassName(TreeView.classes.lastCollapsable);

        hitArea.removeClassName(TreeView.classes.lastExpandableHitArea);
        hitArea.addClassName(TreeView.classes.lastCollapsableHitArea);
      }
    }else{
      if(node.hasClassName(TreeView.classes.collapsable)){
        node.removeClassName(TreeView.classes.collapsable);
        node.addClassName(TreeView.classes.expandable);

        hitArea.removeClassName(TreeView.classes.collapsableHitArea);
        hitArea.addClassName(TreeView.classes.expandableHitArea);
      }
      if(node.hasClassName(TreeView.classes.lastCollapsable)){
        node.removeClassName(TreeView.classes.lastCollapsable);
        node.addClassName(TreeView.classes.lastExpandable);

        hitArea.removeClassName(TreeView.classes.lastCollapsableHitArea);
        hitArea.addClassName(TreeView.classes.lastExpandableHitArea);
      }
    }
  }
}

