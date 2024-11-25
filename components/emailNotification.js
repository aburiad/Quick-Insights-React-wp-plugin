import React, { useState } from 'react'
import './assets/css/email-notification-style.css';
import axios from 'axios';

export default function emailNotification() {
    const [notify, setNotify] = useState(false);
    const [response, setResponse] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const notifyCheck = async () => {
        setNotify((prev) => !prev);
        try {
            // Send a POST request
            const response = await axios.post(siteData.siteUrl + '/wp-json/notify-api/v1/notify', notify, {
                headers: {
                    "Content-Type": "application/json", // Set content type
                },
            });
            // Save response data
            setResponse(response.data);
        } catch (error) {
            // Handle errors
            setErrorMessage(error.message);
            console.error("Error making POST request:", error);
        }
    }

    return (
        <>
            <div className='notification-wrapper'>
                <div>
                    <h2 className='title'>email notification</h2>
                    <p className='text'>Disk space monitor, emailing admin at email when 90% usage, reset alert at 70%</p>
                </div>
                <div className='switch-wrapper'>
                    <label class="switch">
                        <input type="checkbox" onChange={notifyCheck} />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        </>
    )
}
