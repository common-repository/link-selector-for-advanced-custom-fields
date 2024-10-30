<?php
/**
 * Plugin Name: Advanced Custom Fields: Link
 * Description: Allows you to choose a link to an existing piece of content, or enter your own
 * Version:     1.0.0
 * Author:      Corey Worrell, EMRL
 */

add_action('acf/include_field_types', function($version)
{
    include 'src/AcfFieldLink.php';

    new Emrl\AcfFieldLink(__FILE__);
});
