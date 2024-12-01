import React, { Fragment, useState, useEffect } from 'react';
import pluginicon from './assets/img/plug.png';
import posticon from './assets/img/reading.png';
import pageicon from './assets/img/pages.png';
import InsightCard from './insightcard';
import insightbody from './assets/css/insightbody-style.css';

const InsightBody = () => {
   const [postCount, setPostCount] = useState(0);
   const [pageCount, setPageCount] = useState(0);
   const [activePlugin, setActivePlugin] = useState(0);

   // Fetch post count
   useEffect(() => {
      fetch(siteData.siteUrl + '/wp-json/wp/v2/posts')
         .then(response => response.json())
         .then(data => {
            setPostCount(data.length);
         })
         .catch(error => console.error('Error fetching posts:', error));
   }, []);

   // Fetch page count
   useEffect(() => {
      fetch(siteData.siteUrl + '/wp-json/wp/v2/pages')
         .then(response => response.json())
         .then(data => {
            setPageCount(data.length);
         })
         .catch(error => console.error('Error fetching pages:', error));
   }, []);

   // Fetch active plugin count
   useEffect(() => {
      fetch(siteData.siteUrl + '/wp-json/quick-insights-api/v1/active-plugins')
         .then(response => response.json())
         .then(data => {
            setActivePlugin(data.active_plugins);
         })
         .catch(error => console.error('Error fetching active plugins:', error));
   }, []);

   return (
      <Fragment>
         <InsightCard icon={pluginicon} title="Active Plugins" count={activePlugin} />
         <InsightCard icon={posticon} title="Current Posts" count={postCount} />
         <InsightCard icon={pageicon} title="Current Pages" count={pageCount} />
      </Fragment>
   );
};

export default InsightBody;
