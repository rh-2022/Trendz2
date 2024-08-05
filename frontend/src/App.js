import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StockData = ({ ticker }) => {
  const [data, setData] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/stock/${ticker}`)
      .then(response => {
        const history = response.data.history;
        const formattedData = Object.keys(history['Close']).map(date => ({
          date,
          close: history['Close'][date]
        }));
        setData(formattedData);
        setInfo(response.data.info);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [ticker]);

  if (!data || !info) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{info.shortName} ({ticker})</h2>
      <h3>{info.longBusinessSummary}</h3>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Robinhood Clone</h1>
      </header>
      <main>
        <StockData ticker="AAPL" />
      </main>
    </div>
  );
}

export default App;