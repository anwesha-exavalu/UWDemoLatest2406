import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './AccountInfo.css';
import { Layout } from 'antd';
import PolicyCards from '../layout/PolicyCards';
import AccountInfoSublobs from './AccountInfoSublobs';
import AccountDashboard from './AccountDashboard';
import { FloatButton } from 'antd';
import { Container } from '../styles/components/Layout';


ChartJS.register(ArcElement, Tooltip, Legend);

const AccountInfo = () => {
  const pieChartData = {
    labels: [
      'Unbilled: $35,999.38',
      'Paid: $5,000.00',
      'Written off: $7,000.00',
      'Billed: $11,077.18',
      'Past Due: $1,000.18'
    ],

    datasets: [
      {
        label: 'Billing',
        data: [35999.38, 5000, 7000, 11077.18, 1000.18],
        backgroundColor: [
          '#4e79a7',
          '#59a14f',
          '#f28e2c',
          '#e15759',
          '#76b7b2'
        ],
        borderWidth: 1,
      },
    ],
  };
  const [showAccountInfo, setShowAccountInfo] = useState(true); // Add state to control visibility of AccountInfo
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <Container>
      {/* Account Information Section */}
     
      <PolicyCards />

      {/* <AccountInfoSublobs showAccount={setShowAccountInfo} /> */}
      {/* <FloatButton.BackTop /> */}
    </Container>
  );
};

export default AccountInfo;
