<?php

/**
 * Plugin Name: Quick Insights
 * Text Domain: quick-insights
 * Domain Path: /languages
 * Description: Gain a comprehensive snapshot of your WordPress site's status and performance with this streamlined dashboard. See your active plugins list and current theme at a glance, alongside the total number of posts and pages on your site. Quickly monitor storage usage to stay on top of capacity and performance.
 * Version: 1.0.0
 * Author: Riad
 * Author URI: https://github.com/aburiad
 * License: GPL-2.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Tested up to: 6.6
 */

// Enqueue React script
function quick_insights_enqueue_scripts()
{
    wp_enqueue_script(
        'quick-insights-admin-js',
        plugins_url('/dist/bundle.js', __FILE__),
        ['wp-element'],
        null,
        true
    );

    wp_localize_script('quick-insights-admin-js', 'siteData', [
        'siteUrl' => get_site_url(),
        'themeName' => wp_get_theme()->get('Name')
    ]);
}
add_action('admin_enqueue_scripts', 'quick_insights_enqueue_scripts');

// Add dashboard widget for Quick Insights
function quick_insights_add_dashboard_widget()
{
    wp_add_dashboard_widget(
        'quick_insights_widget',
        'Quick Insights',
        'quick_insights_display_dashboard_widget'
    );
}
add_action('wp_dashboard_setup', 'quick_insights_add_dashboard_widget');

// Display function for the dashboard widget
function quick_insights_display_dashboard_widget()
{
    echo '<div id="my-custom-menu-root"></div>';
}

// Get active plugins count
function quick_insights_get_active_plugins_count(WP_REST_Request $request)
{
    $active_plugins = get_option('active_plugins');
    return rest_ensure_response(['active_plugins' => count($active_plugins)]);
}

// Get server storage information
function quick_insights_get_server_storage_info()
{
    $total_space = disk_total_space('/');
    $free_space = disk_free_space('/');

    $total_space_mb = round($total_space / 1024 / 1024, 2);
    $free_space_mb = round($free_space / 1024 / 1024, 2);
    $used_space_mb = $total_space_mb - $free_space_mb;

    return [
        'total' => $total_space_mb,
        'free' => $free_space_mb,
        'used' => $used_space_mb
    ];
}

// Get active theme information
function quick_insights_get_active_theme_info(WP_REST_Request $request)
{
    $theme = wp_get_theme();
    return rest_ensure_response([
        'name' => $theme->get('Name'),
        'theme_directory' => $theme->get('Template'),
        'version' => $theme->get('Version'),
        'author' => $theme->get('Author'),
    ]);
}

// Register custom API endpoints
function quick_insights_register_api_endpoints()
{
    register_rest_route('quick-insights-api/v1', '/storage', [
        'methods' => 'GET',
        'callback' => function () {
            return new WP_REST_Response(quick_insights_get_server_storage_info(), 200);
        },
    ]);

    register_rest_route('quick-insights-api/v1', '/active-plugins', [
        'methods' => 'GET',
        'callback' => 'quick_insights_get_active_plugins_count',
    ]);

    register_rest_route('quick-insights-api/v1', '/active-theme', [
        'methods' => 'GET',
        'callback' => 'quick_insights_get_active_theme_info',
    ]);
}
add_action('rest_api_init', 'quick_insights_register_api_endpoints');
