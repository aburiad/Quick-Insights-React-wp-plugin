import React, { useState, useEffect, Fragment } from 'react';
import insightheader from './assets/css/insightheader-style.css';

const InsightHeader = () => {
   const [themeName, setThemeName] = useState('');
   const [themeDirectory, setThemeDirectory] = useState('');

   useEffect(() => {
      fetch(siteData.siteUrl + '/wp-json/custom-api/v1/active-theme')
         .then(response => response.json())
         .then(data => {
            setThemeName(data.name); // Corrected key
            setThemeDirectory(data.theme_directory); // Corrected key
         })
         .catch(error => console.error('Error fetching theme data:', error));
   }, []); // Empty dependency array ensures this runs once when the component mounts

   return (
      <Fragment>
         <h2 id='insight-dashboard-title'>Dashboard overview</h2>
         <p> <span className='insight-active-style'>Active Theme</span> {themeName}</p>
      </Fragment>
   );
};

export default InsightHeader;
