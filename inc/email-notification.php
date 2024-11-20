<?php

// Check disk space when the dashboard is loaded
function check_disk_space_on_dashboard_visit() {
        $totalSpace = disk_total_space("/"); // "/" is the root directory
        $freeSpace = disk_free_space("/");
        // Calculate used space
        $usedSpace = $totalSpace - $freeSpace;
        // Calculate used space percentage
        $usedPercentage = round(($usedSpace / $totalSpace) * 100);

        // Get the last alert sent timestamp and used disk percentage
        $last_alert_sent = get_option('disk_space_alert_sent');
        $last_used_percent = get_option('disk_space_last_used_percent');

        // Reset the alert if the disk usage drops below 70%
        if ($usedPercentage < 70) {
           delete_option('disk_space_alert_sent');
        }

        // If disk space exceeds 90% and email hasn't been sent before, send an email
        if ($usedPercentage >= 90 && !$last_alert_sent) {
            send_disk_space_alert_email($usedPercentage);
            // Update the option to prevent sending multiple emails
            update_option('disk_space_alert_sent', time());
            update_option('disk_space_last_used_percent', $usedPercentage);
        }
}

// send dis space alert email
function send_disk_space_alert_email($usedPercentage) {
    $admin_email = get_option('admin_email');  // Get admin's email address
    $subject = 'Disk Space Alert: Your Disk is ' . round($usedPercentage, 2) . '% Full';
    $message = 'Warning! Your disk space usage has reached ' . round($usedPercentage, 2) . '% on the server. Please take action to free up space or upgrade your hosting plan.';
    $headers = ['Content-Type: text/html; charset=UTF-8'];
    $response = wp_mail($admin_email, $subject, $message,$headers);  // Send email
    
    // check email send sucessfully
    if ( $response ) {
        echo 'Email sent successfully!';
    } else {
        echo 'Failed to send email.';
    }
}


add_action('phpmailer_init', function($phpmailer) {
    $phpmailer->isSMTP();
    $phpmailer->Host = 'smtp.gmail.com';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Username = 'your@gmail.com'; // Replace with your Gmail address
    $phpmailer->Password = 'your password';    // Replace with your App Password
    $phpmailer->SMTPSecure = 'your Encryption method';               // Encryption method
    $phpmailer->Port = 000;                       // SMTP Port
});

add_filter('wp_mail_from', function() {
    return get_option('admin_email'); // Replace with your Gmail address
});

// Hook into the dashboard setup to check disk space
add_action('wp_dashboard_setup', 'check_disk_space_on_dashboard_visit');