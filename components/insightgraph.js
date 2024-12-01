import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#C6E7FF', '#FF8042']; // Adjusted colors for Free and Used

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#1e1e1e"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const InsightGraph = () => {
  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(siteData.siteUrl + '/wp-json/quick-insights-api/v1/storage')
      .then(response => {
        setStorage(response.data); // Use only 'free' and 'used' values
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching storage info');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading storage information...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Only Free and Used space included in data
  const data = [
    { name: 'Free', value: storage.free },
    { name: 'Used', value: storage.used },
  ];

  return (
    <div style={{ width: '150px', height: '150px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={70}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InsightGraph;
