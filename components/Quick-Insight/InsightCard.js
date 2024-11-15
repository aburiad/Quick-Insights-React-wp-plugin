import React from 'react';
import pluginicon from './assets/img/Plug.png';
import cardcss from './assets/css/insightcard.css';
const InsightCard = () => {
   return (
      <div className='insight-card-item'>
         <div className="insight-title-wrapper">
         <div className="insight-icon">
            <img src={pluginicon} alt="plugin icon" />
         </div>
         <div className="insight-title">Simple Title</div>
         </div>
         <div className="insight-count">25</div>
      </div>
   );
};

export default InsightCard;