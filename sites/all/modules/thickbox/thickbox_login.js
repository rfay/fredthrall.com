// $Id: thickbox_login.js,v 1.2.2.2 2008/09/06 19:27:21 frjo Exp $
// Contributed by user jmiccolis.
Drupal.behaviors.initThickboxLogin = function(context) {
  $(document).ready(function() { $("a[@href*='/user/login']").addClass('thickbox').each(function() { this.href = this.href.replace(/user\/login\??/,"user/login/thickbox?height=230&width=250&") }) });
  $(document).ready(function() { $("a[@href*='?q=user/login']").addClass('thickbox').each(function() { this.href = this.href.replace(/user\/login/,"user/login/thickbox&height=230&width=250") }) });
}