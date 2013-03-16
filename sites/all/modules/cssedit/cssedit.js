
/* -----------------------------------------------------------------

  CSSEditManager   

------------------------------------------------------------------ */

var CSSEditManager = CSSEditManager || {};

/**
 * Initialize.
 */
CSSEditManager.init = function() {
  this.stylesheets = this.getStylesheets('themes');
  this.display();
};

/**
 * Display GUI.
 */
CSSEditManager.display = function() { 
  var self = this;
  this.links = {};
  this.switcherDefault = 'themes';
  // @todo fix.. both not working    
  this.links['themes'] = this.getStylesheetLinks('themes');
  this.links['modules'] = this.getStylesheetLinks('modules');
  this.panel = $('<div id="cssedit-panel"></div>');
                
  // Add switcher
  this.switcher = $('<div id="cssedit-switcher">' + this.switcherDefault + '</div>');
  $(this.panel).append(this.switcher);  
                     
  // Add nav item markup
  $(this.panel).append(this.links[this.switcherDefault].join(' '));                               
  $('body').append(this.panel);
  
  this.bindStylesheetLinks();
  
  // Bind switcher events
  $(this.switcher).click(function(){
    self.cycleSwitcher();
  });
}

/**
 * Bind stylesheet link events.
 */
CSSEditManager.bindStylesheetLinks = function() {
  var self = this;
  
  $('.stylesheet-link').click(function(){
    var link = this;
    var editor = new CSSEditor(self.getStylesheet($(this).attr('id')));
            
    // Initially active
    $(this).addClass('active');
    
    // Bind window close event
    $(editor.window).bind('windowClose', function(){
      $(link).removeClass('active');  
    });
    
    return false;
  });
}

/**
 * Cycle through stylesheets shown on the panel.
 */
CSSEditManager.cycleSwitcher = function() {
  var n = 'themes';
  
  // Cycle
  switch($(this.switcher).html()){
    case 'themes':
      n = 'modules';
      break;
      
    case 'modules':
      n = 'themes';
      break;
  }
  
  // New switcher label
  $(this.switcher).html(n);  
  
  // Clear old items
  $('.stylesheet-link', this.panel).remove();
   
  $(this.panel).append(this.links[n].join(' '));
            
  this.bindStylesheetLinks();
}

/**
 * Get stylesheets on the current page.
 *
 * @param string type
 *   Valid options are:
 *    - themes
 *    - modules
 *    - system
 *
 * @return array
 *   Link nodes.
 */
CSSEditManager.getStylesheets = function(type) {
  var self = this;
  var k = [];
  var s = $('link[rel=stylesheet]');
  var r = new RegExp('^(.*?)/' + type + '/(.*?)$', 'i');
                        
  $(s).each(function(i, ss){
    var h = $(ss).attr('href');  
    if (r.test(h)){
      ss.name = self.getStylesheetName(h);
      k.push(ss);  
    }
  });
       
  return k;
};

/**
 * Get stylesheet node by index.
 *
 * @param int i
 *
 * @return object
 */
CSSEditManager.getStylesheet = function(i) {
  return this.stylesheets[i];
}

/**
 * Get name of file from href.
 *
 * @return string
 */
CSSEditManager.getStylesheetName = function(href) {
  var m = /^(?:.*?)\/([^\/]*?)\.css(?:.*)$/.exec(href);
  return m[1];
};

/**
 * Get style sheet link markup.
 *
 * @return array
 */
CSSEditManager.getStylesheetLinks = function() {
  var o = [];
  
  $(this.stylesheets).each(function(i, ss){
    o[i] = '<a href="#" id="' + i + '" class="stylesheet-link">' + ss.name + '</a>';
  });
  
  return o;
};

/* -----------------------------------------------------------------

  CSSEditor 

------------------------------------------------------------------ */

/**
 * Constructor.
 *
 * @param object stylesheet
 *   jQuery stylesheet node.
 */
var CSSEditor = function(stylesheet) {
  var self = this;
  this.stylesheet = stylesheet;
  this.window = new this.window(this);
};

/**
 * Constructor.
 */
CSSEditor.prototype.window = function(editor) {
  var self = this;
  this.editor = editor; 
  this.display();
  this.textarea = new editor.textarea(this);
  
  // Center window in resize
  $(window).bind('resize', function(){ self.center() });
};  

/**
 * Display window.
 *
 * @return object
 *   self. 
 */
CSSEditor.prototype.window.prototype.display = function() {
  var self = this;
  
  // Append markup  
  this.node = $('<div class="cssedit-window"><div class="content"></div></div>').get(0); 
  $('body').append(this.node);
  this.center();
                    
  // Add additional markup
  this.contentNode = $('.content', this.node);
  this.titlebarNode = $('<div class="cssedit-titlebar"></div>');
  this.closeNode = $('<a href="#" class="close">Close</a>');
  this.titleNode = $('<span class="title">' + this.editor.stylesheet.name + '<em>.css</em></span>');
  this.statusNode = $('<div class="cssedit-status"></div>').get(0);
  $(this.titlebarNode).append(this.closeNode);
  $(this.titlebarNode).append(this.titleNode);
  $(this.contentNode, this.node).prepend(this.titlebarNode);
  $(this.contentNode, this.node).append(this.statusNode);
  
  // Bind events
  $(this.closeNode).click(function(){ self.close().destroy(); return false });
  $(this.titlebarNode).mousedown(function(e){ self.startDrag(e) });
  $(document).mousemove(function(e){ self.drag(e) });
  $(document).mouseup(function(e){ self.endDrag(e) });
  
  return this;
} 

/**
 * Initialize dragging.
 */
CSSEditor.prototype.window.prototype.startDrag = function(e) { 
  this.dragY = e.layerY; 
  this.dragX = e.layerX; 
  this.dragging = true;
}

/**
 * Continue dragging.
 */
CSSEditor.prototype.window.prototype.drag = function(e) {  
  if (this.dragging){  
    this.node.style.top = e.clientY - this.dragY + 'px';
    this.node.style.left = e.clientX - this.dragX + 'px';
  }
}

/**
 * End dragging.
 */
CSSEditor.prototype.window.prototype.endDrag = function(e) { 
  this.dragging = false;
}

/**
 * Center the window.
 *
 * @return object
 *   self. 
 */
CSSEditor.prototype.window.prototype.center = function() {  
  this.node.style.top = (window.innerHeight / 2) - ($(this.node).height() / 2) + 'px';
  this.node.style.left = (window.innerWidth / 2) - ($(this.node).width() / 2) + 'px';
    
  return this;
}

/**
 * Set status message.
 * 
 * @param string message
 *
 * @param int severity
 *  (optional) Message severity; defaults to 0
 *    0: info
 *    1: warning
 *    2: error
 *
 * @return object
 *   self. 
 */
CSSEditor.prototype.window.prototype.setStatus = function(message, severity) {  
  var s = severity || 0;
  var l = ['info', 'warning', 'error'];   
  this.statusNode.className = 'cssedit-status status-' + l[s];
  $(this.statusNode).html(message);
  
  return this;
}

/**
 * Close the window.
 *
 * @return object
 *   self. 
 */
CSSEditor.prototype.window.prototype.close = function() {  
  $(this.node).remove();
  // Trigger close event
  $(this).trigger('windowClose');
                           
  return this;
}

/**
 * Close and destroy the editor.
 *
 * @return object
 *   self. 
 */
CSSEditor.prototype.window.prototype.destroy = function() {  
  this.close();
  delete this; 
   
  return this;
}


/* -----------------------------------------------------------------

  CSSEditor.textarea   

------------------------------------------------------------------ */

/**
 * Constructor.
 */
CSSEditor.prototype.textarea = function(window) {
  // @todo clean up
  // @todo recursion issue?
  // @todo try designMode for editing the CSS 
  // @todo syntax highlighting 
  // @todo move right node creation above 
  var self = this;
  this.window = window;
  $(this.window.contentNode, window.node).append('<textarea class="css"></textarea>'); 
  this.node = $('.css', window.node).get(0);
  this.node.spellcheck = false;
  this.rightNode = $('<div class="right"></div>');
  this.saveNode = $('<input type="button" value="' + Drupal.t('Save') + '" class="cssedit-save" />"');
  $(this.node).after(this.rightNode);
  $(this.rightNode).append(this.saveNode);
  this.explorer = new window.editor.explorer(this); 
  this.load().bindKeyEvents();  
  $(this.saveNode).click(function(){ self.save() });
};

/**
 * Bind handlers specific key events.
 *
 * @return object
 *   self. 
 */
CSSEditor.prototype.textarea.prototype.bindKeyEvents = function(e) {
  var self = this;
  
  $(document).keydown(function(e){
    // Save
    if (e.keyCode == 83 && e.ctrlKey){
      self.save();
      // @todo prevent dialog  
    }
  })
  
  return this;
}

/**
 * Load stylesheet contents.
 *
 * @return object
 *   self. 
 */
CSSEditor.prototype.textarea.prototype.load = function() {
  var self = this;  
  
  this.window.setStatus(Drupal.t('Loading stylesheet'));
          
  $.ajax({
    url: $(self.window.editor.stylesheet).attr('href'),
    success: function(contents){    
      // Display new css
      $(self.node).val(contents);
      self.window.setStatus(Drupal.t('Stylesheet loaded'));
      
      // Trigger load event
      $(self).trigger('loadStylesheet', [contents]);
                          
      return contents;
    },
    error: function(){
      this.window.setStatus(Drupal.t('Failed to load stylesheet'), 2); 
    }
  });
      
  return this;
}

/**
 * Render stylesheet changes.
 *
 * @return object
 *   self. 
 */
CSSEditor.prototype.textarea.prototype.render = function() {   
  var s = this.window.editor.stylesheet;
  // @todo fix issue of textarea scrolling up
  $(s).attr('href', $(s).attr('href') + '?new');
  
  return this;  
}

/**
 * Save stylesheet.
 *
 * @return object
 *   self. 
 */
CSSEditor.prototype.textarea.prototype.save = function() {
  var self = this;
  var data = { filename: $(this.window.editor.stylesheet).attr('href'), css: $(this.node).val() };
        
  $(self.saveNode).attr('disabled', 'disabled');
  $.post(Drupal.settings.basePath + 'js/cssedit/save_file', data, function(response){
    // Display messages
    if (response.message){
      self.window.setStatus(response.message);
    }      
    // Enable button and render new style
    if (response.status == 1){
      $(self.saveNode).removeAttr('disabled');
      self.render();
    }
    // Trigger save event
    $(self).trigger('saveStylesheet', [response]);
  }, 'json'); 
  
  return this;
}

/* -----------------------------------------------------------------

  CSSEditor.explorer   

------------------------------------------------------------------ */

/**
 * Constructor.
 */
CSSEditor.prototype.explorer = function(textarea) {
  var self = this;
  this.textarea = textarea; 
          
  // Add explorer markup
  this.node = $('<div class="cssedit-explorer">'
    + '<span class="title">' + Drupal.t('Explorer') + '</span>'
    + '</div>').get(0);
  $(this.textarea.rightNode).prepend(this.node);
  
  // Parse comments
  $(this.textarea).bind('loadStylesheet', function(){
    var blocks = self.getBlocks(); 
    self.displayNavigation(blocks);
  });
};

/**
 * Get comment blocks.
 *
 * @return array
 */
CSSEditor.prototype.explorer.prototype.getBlocks = function() { 
  var b = [];
   
  // @todo finish
  var blocks = this.textarea.node.value.match(/^\s+\*\s+(.*?)$/gmi);
  $.each(blocks, function(i, block){
    var title = block.replace(/\s+\* /, '');
    b.push(title);
  });
  
  return b;
}

/**
 * Display stylesheet navigation.
 *
 * @param array blocks
 */
CSSEditor.prototype.explorer.prototype.displayNavigation = function(blocks) {
  var self = this;
  
  blocks.reverse();
  $.each(blocks, function(i, title){
    var b = $('<a href="#" class="cssedit-navitem">' + title + '</a>');
    $('.title', self.node).after(b);
    $(b).click(function(){          
      var offset = self.getBlockTitleOffset(title);
      // @todo textarea scrollTo method
    });
  });
}

/**
 * Get offset of block title.
 *
 * @param int
 */
CSSEditor.prototype.explorer.prototype.getBlockTitleOffset = function(title) {
  // @todo
}

if (Drupal.jsEnabled) {
  $(function(){
    CSSEditManager.init();
  });
}



