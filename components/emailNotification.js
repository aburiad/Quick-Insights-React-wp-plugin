import React, { useEffect, useState } from 'react'
import './assets/css/email-notification-style.css';
import axios from 'axios';

export default function emailNotification() {
    const [isChecked, setIsChecked] = useState(false);

    // Load saved state from localStorage on component mount
    useEffect(() => {
        const savedState = localStorage.getItem("toggleState");
        if (savedState !== null) {
            setIsChecked(savedState === "true");
        }
    }, []);

    // Handle toggle change
    const handleToggleChange = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        localStorage.setItem("toggleState", newState);
        notifyCheck();
    };

    const notifyCheck = async () => {
        try {
            const response = await axios.post(siteData.siteUrl + '/wp-json/custom-api/v1/notify', {
                $isChecked: !isChecked,  // Send the updated notify value
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Log the successful response if status code 200 is received
            if (response.status === 200) {
                console.log('Success Response');
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
                        <input type="checkbox" checked={isChecked}
                            onChange={handleToggleChange}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </>
    )
}
