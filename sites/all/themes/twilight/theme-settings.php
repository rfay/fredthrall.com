<?php
/**
* Implementation of THEMEHOOK_settings() function.
*
* @param $saved_settings
*   array An array of saved settings for this theme.
* @return
*   array A form array.
*/
function phptemplate_settings($saved_settings) 
{
  /*
   * The default values for the theme variables. Make sure $defaults exactly
   * matches the $defaults in the template.php file.
   */
  $defaults = array(
    'twilight_width' => '90%',
  'twilight_silhouette' => 0,
  );
  
  // Reset to default value if the user specified setting is invalid
  $saved_width = $saved_settings['twilight_width'];
  $saved_settings['twilight_width'] = _validate_page_width($saved_width);

  // Merge the saved variables and their default values
  $settings = array_merge($defaults, $saved_settings);
  $img_path = base_path() . path_to_theme() . "/images";

  // Create the form widgets using Forms API
  $form['twilight_width'] = array(
    '#type' => 'textfield',
    '#title' => t('Page width'),
    '#default_value' => $settings['twilight_width'],
    '#size' => 12,
    '#maxlength' => 8,
    '#description' => t('Specify the page width in percent ratio (50-100%) for liquid layout, or in px (800-1600px) for fixed width layout. If an invalid value is specified, the default value (90%) is used instead. You can leave this field blank to use the default value. You need to add either % or px after the number.'),
  );

  $form['twilight_silhouette'] = array(
  '#type' => 'select',
  '#title' => t('Header Silhouette'),
  '#default_value' => $settings['twilight_silhouette'],
  '#prefix' => 
    '<div style="background: #555555; color: #ffffff; padding: 10px;">' .
    '<img src="' . $img_path . '/header-city.png"> City<br>' .
    '<img src="' . $img_path . '/header-mountain.png"> Mountain<br>' .
    '<img src="' . $img_path . '/header-western.png"> Western<br>' .
    '<img src="' . $img_path . '/header-palm.png"> Palm Tree<br>' . 
    '<img src="' . $img_path . '/header-farm.png"> Farm<br>' .
    '</div>',
  '#options' => array(
    t('None'), 
    t('City'), 
    t('Mountain'), 
    t('Western'), 
    t('Palm Tree'), 
    t('Farm'),
  ),
    '#description' => t('Select a silhouette graphic for the header area.'),
  );

  // Return the additional form widgets
  return $form;
}

/*
**************************************************************************
* NOTE: With Drupal 6.x, I can not call twilight_validate_page_width() 
*       functions in the template.php somehow. So I created a copy of
*       the function below and use it instead.
****************************************************************************
*/

/*
* Check the page width theme settings and reset to default 
* if the value is null, or invalid value is specified
*/
function _validate_page_width($width)
{
  global $theme_key;

  /*
  * The default values for the theme variables. Make sure $defaults exactly
  * matches the $defaults in the theme-settings.php file.
  */
  $defaults = array(             // <-- change this array
    'twilight_width' => '90%',
  );

  // check if it is liquid (%) or fixed width (px)
  if(preg_match("/(\d+)\s*%/", $width, $match)) {
    $liquid = 1;
    $num = intval($match[0]);
    if(50 <= $num && $num <= 100) {
      return $num . "%";  // OK!
    }
  }
  else if(preg_match("/(\d+)\s*px/", $width, $match)) {
    $fixed = 1;
    $num = intval($match[0]);
    if(800 <= $num && $num < 1600) {
      return $num . "px"; // OK
    }
  }
  
  // reset to default value
  variable_set(
    str_replace('/', '_', 'theme_'. $theme_key .'_settings'),
    array_merge($defaults, theme_get_settings($theme_key))
  );
  // Force refresh of Drupal internals
  theme_get_setting('', TRUE);

  return $defaults['twilight_width'];
}
?>
