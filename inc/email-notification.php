<?php

/**
 * Check disk space usage and send an alert if usage exceeds 90%.
 *
 * This function checks the current disk space usage and sends an email notification
 * if the usage exceeds 90%. The notification is only sent once to prevent multiple emails.
 * If the disk usage drops below 70%, the alert status is reset.
 *
 * @return void
 */

function check_disk_space_and_notify() {
    // Get the total and free disk space for the root directory ("/")
    $totalSpace = disk_total_space("/"); // Total disk space
    $freeSpace = disk_free_space("/");   // Free disk space
    
    // Calculate used disk space by subtracting free space from total space
    $usedSpace = $totalSpace - $freeSpace;
    
    // Calculate the percentage of used space (hardcoded as 99% for testing purposes)
    $usedPercentage = round(($usedSpace / $totalSpace) * 100);

    // Retrieve the last alert sent timestamp and the last known disk usage percentage
    $last_alert_sent = get_option('disk_space_alert_sent');
    $last_used_percent = get_option('disk_space_last_used_percent');

    // Reset the alert if the disk usage has dropped below 70%
    if ($usedPercentage < 70) {
        delete_option('disk_space_alert_sent');  // Delete the alert status if usage drops below 70%
    }

    // If disk space usage exceeds 90% and an email alert hasn't been sent yet, send the alert
    if ($usedPercentage >= 90 && !$last_alert_sent) {
        // Call function to send the disk space alert email
        send_disk_space_alert_email($usedPercentage);
        
        // Update the options to prevent sending multiple emails
        update_option('disk_space_alert_sent', time());  // Store the current time when the alert was sent
        update_option('disk_space_last_used_percent', $usedPercentage); // Store the last used disk percentage
    }
}

/**
 * Sends a disk space alert email to the admin when disk usage exceeds a certain threshold.
 *
 * This function is responsible for sending an email notification to the admin when
 * disk space usage exceeds the threshold (90% or more). It also logs whether the 
 * email was sent successfully or if there was a failure.
 *
 * @param int $usedPercentage The percentage of used disk space.
 * @return void
 */
function send_disk_space_alert_email($usedPercentage) {
    // Get the admin's email address from WordPress settings
    $admin_email = get_option('admin_email');  // Retrieve the admin's email dynamically

    // Construct the email subject with the used disk space percentage
    $subject = 'Disk Space Alert: Your Disk is ' . round($usedPercentage, 2) . '% Full';

    // Compose the email message with the used disk space percentage and a warning
    $message = '🚨  Warning! Your disk space usage has reached ' . round($usedPercentage, 2) . '% on the server. Please take action to free up space or upgrade your hosting plan.';

    // Set up email headers to send the email in HTML format
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',  // Ensure the email content is sent in HTML format
        'From:' . $admin_email,  // Set the "From" address dynamically to the admin's email
    );

    // Use WordPress wp_mail function to send the email to the admin
    $response = wp_mail($admin_email, $subject, $message, $headers);  // Send email

    // Prepare the log message based on whether the email was sent successfully
    if ($response) {
        // Log the success message with the current date and time
        $log_message = date('Y-m-d H:i:s') . ' - Email sent successfully to ' . $admin_email . "\n";
    } else {
        // Log the failure message with the current date and time
        $log_message = date('Y-m-d H:i:s') . ' - Failed to send email to ' . $admin_email . "\n";
    }

    // Define the log file path in the current directory (you can change the path as needed)
    $log_file_path = __DIR__ . '/email_notify.log';

    // Write the log message to the log file, appending the new message (LOCK_EX prevents overwriting)
    file_put_contents($log_file_path, $log_message, LOCK_EX);
}

add_action('admin_init', 'check_disk_space_and_notify');