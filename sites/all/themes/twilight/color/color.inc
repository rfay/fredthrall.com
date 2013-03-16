<?php
// $Id: color.inc,v 1.1.4.1 2008/04/23 13:25:00 pixture Exp $

$info = array(

  // Pre-defined color schemes
  'schemes' => array(
	// base, link, gradation(top), gradation(bottom), text
	'#152132,#ddd877,#122d64,#27a7d6,#8e8ea9' => t('Twilight (Default)'),
    '#17110c,#c2946b,#471400,#e68a00,#99796c' => t('Sunset Canyon'),
    '#080207,#c97ebb,#1f001d,#f53ddf,#5d465b' => t('Pink'),
    '#0c0303,#bf787c,#1b0403,#bf4b4a,#7d4f50' => t('Wine Red'),
    '#100d0a,#c0a477,#1a130a,#947c57,#6d634f' => t('Earth Brown'),
    '#121210,#aa8b55,#040400,#634912,#5d5846' => t('Espresso'),
    '#0f0e06,#aea96f,#181502,#c8bc1e,#656249' => t('Mustard Yellow'),
    '#1a1e10,#c3dd73,#141c08,#add035,#a4ab8c' => t('Olive Garden'),
    '#131c12,#8fb979,#072e00,#4ce114,#607755' => t('Forest Green'),
    '#030501,#9b925f,#030401,#363e28,#5d5f5b' => t('Moss'),
    '#071711,#68c09a,#0c271b,#59c597,#54836e' => t('Teal'),
    '#041415,#58cac9,#031c18,#56d7cc,#599190' => t('Aquamarine'),
    '#040f16,#7eb5e2,#03225e,#69c1f2,#7e98a9' => t('Ocean Water'),
    '#0a111e,#7892d9,#010b1e,#023cb6,#576898' => t('Blue Night'),
    '#0c0618,#a085d1,#150d26,#7635fd,#5f4b8b' => t('Deep Purple'),
    '#120b14,#af83b9,#240c27,#9a5b9f,#6a5071' => t('Violet'),
    '#17171c,#9599b2,#212330,#8489a2,#575b6c' => t('Graphite'),
    '#1a1d23,#98a5b3,#191e24,#7d93aa,#646e78' => t('Ash'),
    '#171717,#cfcfcf,#4d4d4d,#cfcfcf,#727272' => t('Silver'),
    '#000104,#b6b6a0,#000104,#363533,#5d5d5b' => t('Blacken'),
  ),

  // Images to copy over
  'copy' => array(
    'images/button.gif',
    'images/button-o.gif',
	'images/header-city.png',
	'images/header-mountain.png',
	'images/header-palm.png',
	'images/header-western.png',
	'images/header-farm.png',
  ),

  // CSS files (excluding @import) to rewrite with new color scheme.
  // NOTE: this is new to Drupal 6.x
  'css' => array(
    'style.css',
  ),

  // Coordinates of gradient (x, y, width, height)
  'gradient' => array(0, 0, 800, 100),

  // Color areas to fill (x, y, width, height)
  'fill' => array(
    'base' => array(0, 100, 800, 500),
    'link' => array(0, 600,   0,   0),	// dummy 
  ),

  // Coordinates of all the theme slices (x, y, width, height)
  // with their filename as used in the stylesheet.
  'slices' => array(
	'images/bg-header.png'		=> array(  0,   0,   8, 100),
	'images/bg-footer.png'		=> array(  0,  20,   8,  70),
	'images/bg-node.png'		=> array(261, 116,   8, 358),

    'images/bg-bar.png'         => array(350, 500,   8,  40),
    'images/bg-bar-lite.png'    => array(390, 500,   8,  40),

	'images/bg-atab-l.png'      => array(260, 500,   8,  30),
	'images/bg-atab-c.png'      => array(270, 500,   8,  30),
	'images/bg-atab-r.png'      => array(332, 500,   8,  30),

	'images/bg-tab-l.png'       => array(410, 70,    8,  30),
	'images/bg-tab-c.png'       => array(420, 70,    8,  30),
	'images/bg-tab-r.png'       => array(482, 70,    8,  30),

	'images/bg-button.png'      => array(440, 500,   8,  40),
	'images/bg-abutton.png'     => array(530, 500,   8,  40),

    'screenshot.png'            => array(  0,  20, 760, 400),
  ),

  // Reference color used for blending. Matches the base.png's colors.
  'blend_target' => '#ffffff',

  // Preview files
  'preview_image' => 'color/preview.png',
  'preview_css' => 'color/preview.css',

  // Base file for image generation
  'base_image' => 'color/base.png',
);
