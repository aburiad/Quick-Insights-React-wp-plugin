import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#C6E7FF', '#D4F6FF', '#B3E1ED', '#FF8042'];

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
      textAnchor="middle" // Center text horizontally
      dominantBaseline="middle" // Center text vertically
    >
      {/* Adding both the name and the percentage */}
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const InsightGraph = () => {
  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch server storage info from the WordPress custom API endpoint
    axios.get(siteData.siteUrl + '/wp-json/custom-api/v1/storage')
      .then(response => {
        setStorage(response.data);  // Store the data in state
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch(err => {
        setError('Error fetching storage info');
        setLoading(false);
      });
  }, []); // Only runs on mount

  if (loading) {
    return <div>Loading storage information...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Ensure the storage data is available before rendering the chart
  const data = [
    { name: 'Total', value: storage.total },
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
