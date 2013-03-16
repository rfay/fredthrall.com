<div class="node<?php if($is_front) print " front"; if ($teaser) { if($sticky) { print " sticky"; } else { print " teaser"; } } ?><?php if (!$status) print " node-unpublished"; ?>"> 
  <?php 
    if($teaser) {
      if($sticky) $prefix = 'sticky-'; 
      else $prefix = 'teaser-';
    }
    else {
      $prefix = '';
    }
  ?>
  <table class="nodetitle">
  <tr>
    <td>
      <h2 class="title"><a href="<?php print $node_url?>"><?php print $title?></a></h2>
      <span class="submitted"><?php print $submitted?></span>
      <span class="taxonomy"><?php print $terms?></span>
    </td>
  </tr>
  </table>

  <?php if($picture) print $picture; ?>
  <div class="content"><?php print $content?></div>
  <?php if ($links) { ?><div class="links"><?php print $links?></div><?php }; ?>
</div>
