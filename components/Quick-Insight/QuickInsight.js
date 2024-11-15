import React from 'react';
import InsightHeader from './InsightHeader.js';
import InsightGraph from './InsightGraph.js';
import InsightBody from './InsightBody.js';
import insight from './assets/css/insight.css';
const QuickInsight = () => {
   return (
      <div className='insight-layout'>
         <div className="insight-header">
               <InsightHeader/>
         </div>
         <div className="insight-body">
            <div className="insight-content">
               <InsightBody/>
            </div>
            <div className="insight-graph">
               <InsightGraph/>
            </div>
         </div>
      </div>
   );
};

export default QuickInsight;