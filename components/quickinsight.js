import React from 'react';
import insight from './assets/css/insight-style.css';
import InsightHeader from './insightheader';
import InsightBody from './insightbody';
import InsightGraph from './insightgraph';
import EmailNotification from './emailNotification';

const QuickInsight = () => {
   return (
      <div className='insight-layout'>
         <div className="insight-header">
            <InsightHeader />
         </div>
         <div className="insight-body">
            <div className="insight-content">
               <InsightBody />
            </div>
            <div className="insight-graph">
               <InsightGraph />
               <span className='insight-active-style'>Storage Info</span>
            </div>
         </div>
         <div className='email-notification'>
            <EmailNotification />
         </div>
      </div>
   );
};

export default QuickInsight;