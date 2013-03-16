<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="<?php print $language->language ?>" xml:lang="<?php print $language->language ?>">

<head>
  <title><?php print $head_title ?></title>
  <?php print $head ?>
  <?php print $styles ?>
  <?php print $scripts ?>
    <!--[if lt IE 7]>
    <style type="text/css" media="all">@import "<?php print base_path() . path_to_theme() ?>/fix-ie.css";</style>
    <![endif]-->
  <script type="text/javascript"><?php /* Needed to avoid Flash of Unstyle Content in IE */ ?></script>
</head>

<?php
$twilight_width = theme_get_setting('twilight_width');
$twilight_width = twilight_validate_page_width($twilight_width);
$twilight_silhouette = theme_get_setting('twilight_silhouette');
?>

<body>

<!-- header (full window width) -->
<table border="0" cellpadding="0" cellspacing="0" id="header" class="silhouette-<?php print $twilight_silhouette; ?>">
<tr>
    <td id="logo" valign="bottom" rowspan="2">
      <?php if ($logo) { ?><a href="<?php print $base_path ?>" title="<?php print t('Home') ?>"><img src="<?php print $logo ?>" alt="<?php print t('Home') ?>" /></a><?php } ?>
  </td>
  <td id="site_name">
      <?php if ($site_name) { ?><h1 class='site-name'><a href="<?php print $base_path ?>" title="<?php print t('Home') ?>"><?php print $site_name ?></a></h1><?php } ?>
      <?php if ($site_slogan) { ?><div class="site-slogan"><?php print $site_slogan ?></div><?php } ?>
    </td>
    <td id="site_search">
      <?php print $search_box ?>
  </td>
  <td id="pad" valign="top"></td>
</tr>
<tr>
    <td id="menu" colspan="2">
      <?php if (isset($primary_links)) { ?><?php print theme('links', $primary_links, array('class' =>'links', 'id' => 'navlist')) ?><?php } ?>
    </td>
  <td id="pad2" valign="top"></td>
</tr>
<tr>
    <td colspan="3"><div><?php print $header ?></div></td>
</tr>
</table>
<!-- end of header -->

<div id="wrapper" style="width: <?php print $twilight_width; ?>;">

<div id="container">

<table border="0" cellpadding="0" cellspacing="0" id="content">
  <tr>

  <?php if ($left) { ?>
  <td id="sidebar-left" class="sidebar sidebar-left" valign="top">
    <?php print $left ?>
  </td>
  <?php } ?>

  <td id="main-content" valign="top">
  <?php if ($mission) { ?><div id="mission"><?php print $mission ?></div><?php } ?>
    <div id="main">
    <?php print $breadcrumb ?>
    <?php if(!empty($node) && $page == 0) { ?>
      <div id="cr8"></div>
    <?php } else { ?>
      <?php if($title) { ?>
            <h1 class="pagetitle"><?php print $title ?></h1>
      <?php } ?>
    <?php } ?>
    <div class="tabs"><?php print $tabs ?></div>
    <?php print $help ?>
    <?php print $messages ?>
    <?php print $content; ?>
    <?php print $feed_icons; ?>
    </div>
  </td>

  <?php if ($right) { ?>
  <td id="sidebar-right" class="sidebar sidebar-right" valign="top">
    <?php print $right ?>
  </td>
  <?php } ?>

  </tr>
</table>

</div><!-- end of div#container -->

</div><!-- end of div#wrapper -->

<div id="footer"><?php print $footer_message . $footer ?></div><?php print $closure ?>

</body>
</html>
