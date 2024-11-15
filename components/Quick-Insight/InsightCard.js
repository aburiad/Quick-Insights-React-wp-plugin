import React from 'react';
import cardcss from './assets/css/insightcard.css';
const InsightCard = (props) => {
   return (
      <div className='insight-card-item'>
         <div className="insight-title-wrapper">
         <div className="insight-icon">
            <img src={props.icon} alt="plugin icon" />
         </div>
         <div className="insight-title">{props.title}</div>
         </div>
         <div className="insight-count">{props.count}</div>
      </div>
   );
};

export default InsightCard;