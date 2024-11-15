<?php
/**
 * Plugin Name: Quick Insights
 * Plugin URL: https://github.com/aburiad/Loadify-Preloader
 * Text Domain: loadify-preloader
 * Domain Path: /languages
 * Description: Description: Gain a comprehensive snapshot of your WordPress site's status and performance with this streamlined dashboard. See your active plugins list and current theme at a glance, alongside the total number of posts and pages on your site. Quickly monitor storage usage to stay on top of capacity and performance.
 * Version: 1.0.0
 * Author: Riad
 * Author URI: https://github.com/aburiad
 * License: GPL-2.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Tested up to: 6.6
 */

function wp_react_kickoff_enqueue_scripts() {
    wp_enqueue_script(
        'wp-react-kickoff-admin-js',
        plugins_url('/dist/bundle.js', __FILE__), // Correct path to the bundle.js
        ['wp-element'], // Dependency to use React in WordPress
        null,
        true
    );
}
add_action('admin_enqueue_scripts', 'wp_react_kickoff_enqueue_scripts');


function quick_dashboard_get(){
    // Register a new dashboard widget
    wp_add_dashboard_widget(
        'quick_insights_widget', // Widget slug/ID
        'Quick Insights', // Title
        'quick_insights_display' // Display function
    );
}

function quick_insights_display(){
    echo '<div id="my-custom-menu-root"></div>';
}

add_action('wp_dashboard_setup','quick_dashboard_get');
