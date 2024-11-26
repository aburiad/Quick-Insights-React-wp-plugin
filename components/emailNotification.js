import React, { useEffect, useState } from 'react'
import './assets/css/email-notification-style.css';
import axios from 'axios';

export default function emailNotification() {
    const [notify, setNotify] = useState(false);
    const [response, setResponse] = useState();

    const notifyCheck = async () => {
        try {
            const response = await axios.post(siteData.siteUrl + '/wp-json/custom-api/v1/notify', {
                notify: !notify,  // Send the updated notify value
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Log the successful response if status code 200 is received
            if (response.status === 200) {
                console.log('Success Response:', response.data);
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };




    return (
        <>
            <div className='notification-wrapper'>
                <div>
                    <h2 className='title'>email notification</h2>
                    <p className='text'>Disk space monitor, emailing admin at email when 90% usage, reset alert at 70%</p>
                </div>
                <div className='switch-wrapper'>
                    <label className="switch">
                        <input type="checkbox" onChange={notifyCheck} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </>
    )
}
