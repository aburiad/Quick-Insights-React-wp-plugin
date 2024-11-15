import React from 'react';
import InsightHeader from './InsightHeader.js';
import InsightGraph from './InsightGraph.js';
const QuickInsight = () => {
   return (
      <div className='insight-layout'>
         <div className="insight-header">
            
               <InsightHeader/>
            
         </div>
         <div className="insight-body">
            <div className="insight-content"></div>
            <div className="insight-graph">
               <InsightGraph/>
            </div>
         </div>
      </div>
   );
};

export default QuickInsight;