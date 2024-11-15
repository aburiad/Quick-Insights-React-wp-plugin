import React, { Fragment } from 'react';
import InsightCard from './InsightCard';
import insightbody from './assets/css/insightbody.css';
const InsightBody = () => {
   return (
      <Fragment>
         <InsightCard title="Active Plugins"/>
         <InsightCard title="Current Posts"/>
         <InsightCard title="Current Pages"/>
      </Fragment>
   );
};

export default InsightBody;