import React, { Fragment } from 'react';
import pluginicon from './assets/img/Plug.png';
import posticon from './assets/img/Reading.png';
import pageicon from './assets/img/Pages.png';
import InsightCard from './InsightCard';
import insightbody from './assets/css/insightbody.css';
const InsightBody = () => {
   return (
      <Fragment>
         <InsightCard icon={pluginicon} title="Active Plugins" count="25" />
         <InsightCard icon={posticon} title="Current Posts" count="22"/>
         <InsightCard icon={pageicon} title="Current Pages" count="07"/>
      </Fragment>
   );
};

export default InsightBody;