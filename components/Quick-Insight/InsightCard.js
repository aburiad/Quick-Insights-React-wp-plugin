import React from 'react';
import pluginicon from './assets/img/Plug.png';
const InsightCard = () => {
   return (
      <div className='insight-card-item'>
         <div className="insight-icon">
            <img src={pluginicon} alt="plugin icon" />
         </div>
         <div className="insight-title">Simple Title</div>
         <div className="insight-count">25</div>
      </div>
   );
};

export default InsightCard;