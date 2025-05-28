import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import { Table, Button, Space, Input, Typography, Popover, Row, Col } from 'antd';
import { SearchOutlined, AppstoreOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import PriorityPopup from './PriorityPopup';
import {
  DashboardContainer,
  TopBar,
  WelcomeSection,
  MetricsSection,
  MetricCard,
  WorkSection,
  PriorityBadge,
  SearchDropdown,
  ResponsiveHelper,
  ChartWrapper
} from '../styles/pages/Dashboard/MyDashboardStyle';
import PortfolioInsights from './PortfolioInsights';

const { Title, Text } = Typography;

const MyTableComponent = ({ columns, dataSource, handleRowClick, handleChange }) => (
  <div className="modern-table">
    <Table
      columns={columns}
      dataSource={dataSource}
      onChange={handleChange}
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
        className: 'clickable-row',
      })}
      pagination={{ pageSize: 5, showSizeChanger: false }}
      size="middle"
    />
  </div>
);

const data = {
  myteamscases: [
    { id: 'CP1001', client: 'Fleet Solutions', lob: 'Commercial Property', status: 'Clearance UW', limit: '$500,000', date: '20-08-2024', broker: 'Marsh ', priority: 'Medium' },
    { id: 'CP1002', client: 'Skyline Residences', lob: 'Commercial Property', status: 'Clearance UW', limit: '$250,000', date: '18-08-2024', broker: 'Marsh ', priority: 'Medium' }
  ],
  myassignedcases: [
    { id: 'CP1003', client: 'Skyline Property Inc.', lob: 'Commercial Property', status: 'Awaiting Client Response', limit: '$900,000', date: '10-15-2024', broker: 'Marsh ', priority: 'Medium' },
    { id: 'CP1001', client: 'Fleet Solutions', lob: 'Commercial Property', status: 'Clearance UW', limit: '$500,000', date: '20-08-2024', broker: 'Marsh ', priority: 'Medium' },
    { id: 'CP1006', client: 'Uptown Commercial Spaces', lob: 'Commercial Property', status: 'Broker Review', limit: '$450,000', date: '17-08-2024', broker: 'Marsh ', priority: 'Medium' }
  ],
  senttobroker: [
    { id: 'CP1006', client: 'Uptown Commercial Spaces', lob: 'Commercial Property', status: 'Broker Review', limit: '$450,000', date: '17-08-2024', broker: 'Marsh ', priority: 'Medium' },
    { id: 'CP1007', client: 'Client F', lob: 'Commercial Property', status: 'Broker Review', limit: '$100,000', date: '09-08-2024', broker: 'Marsh ', priority: 'High' }
  ],
  close: [
    { id: 'CP1009', client: 'Client F', lob: 'Commercial Property', status: 'Approved', limit: '$700,000', date: '10-08-2024', broker: 'Marsh ', priority: 'Low' },
    { id: 'CP1010', client: 'Client I', lob: 'Commercial Property', status: 'Rejected', limit: '$300,000', date: '11-08-2024', broker: 'Marsh ', priority: 'High' }
  ]
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const searchInput = useRef(null);

  const policiesChartRef = useRef(null);
  const submissionsChartRef = useRef(null);
  const donutChartRef = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <SearchDropdown>
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button type="link" size="small" onClick={() => close()}>
              Close
            </Button>
          </Space>
        </div>
      </SearchDropdown>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const createBarChart = (chartRef, title, labels, data, colors) => {
    if (!chartRef.current) return;
    
    // Destroy existing chart if it exists
    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartRef.current.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: title,
          data,
          backgroundColor: colors,
          borderRadius: 4,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { 
              display: true,
              color: '#F0F0F0',
              drawBorder: false
            },
            ticks: { 
              color: '#8C8C8C',
              font: { size: 11 }
            },
            border: { display: false }
          },
          x: {
            grid: { 
              display: false,
              drawBorder: false
            },
            ticks: { 
              font: { size: 11 },
              color: '#595959'
            },
            border: { display: false }
          }
        },
      },
    });
  };

  const createDonutChart = () => {
    if (!donutChartRef.current) return;
    
    // Destroy existing chart if it exists
    if (donutChartRef.current.chartInstance) {
      donutChartRef.current.chartInstance.destroy();
    }

    const ctx = donutChartRef.current.getContext('2d');
    donutChartRef.current.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Acquisition', 'Purchase', 'Retention'],
        datasets: [{
          data: [40, 35, 25],
          backgroundColor: ['#204FC2', '#D2DAF2', '#97A5EB'],
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        },
      },
    });
  };

  const createCharts = () => {
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      createBarChart(policiesChartRef, 'Policies Issued', ['Commercial Property', 'General Liability'], [30, 25], ['#204FC2', '#E9EDF7']);
      createBarChart(submissionsChartRef, 'Submission in Progress', ['Commercial Property', 'General Liability'], [40, 35], ['#204FC2', '#E9EDF7']);
      createDonutChart();
    }, 100);
  };

  const destroyCharts = () => {
    [policiesChartRef, submissionsChartRef, donutChartRef].forEach(ref => {
      if (ref.current?.chartInstance) {
        ref.current.chartInstance.destroy();
        ref.current.chartInstance = null;
      }
    });
  };

  // Create charts when dashboard tab is active
  useEffect(() => {
    if (activeTab === 'dashboard') {
      createCharts();
    } else {
      destroyCharts();
    }

    // Cleanup on unmount
    return () => {
      destroyCharts();
    };
  }, [activeTab]);

  const handleRowClick = (record) => {
    navigate('/accountdashboard', { state: { account: record } });
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: 'Submission Id',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
      filters: [...new Set(data.myteamscases.concat(data.myassignedcases, data.senttobroker, data.close).map(item => ({ text: item.id, value: item.id })))],
      filteredValue: filteredInfo.id || null,
      onFilter: (value, record) => record.id.includes(value),
    },
    {
      title: 'Name',
      dataIndex: 'client',
      key: 'client',
      ...getColumnSearchProps('client'),
      filters: [...new Set(data.myteamscases.concat(data.myassignedcases, data.senttobroker, data.close).map(item => ({ text: item.client, value: item.client })))],
      filteredValue: filteredInfo.client || null,
      onFilter: (value, record) => record.client.includes(value),
    },
    {
      title: 'LOB',
      dataIndex: 'lob',
      key: 'lob',
      ...getColumnSearchProps('lob'),
      filters: [...new Set(data.myteamscases.concat(data.myassignedcases, data.senttobroker, data.close).map(item => ({ text: item.lob, value: item.lob })))],
      filteredValue: filteredInfo.lob || null,
      onFilter: (value, record) => record.lob.includes(value),
    },
    { title: 'Limit', dataIndex: 'limit', key: 'limit' },
    { title: 'Status', dataIndex: 'status', key: 'status', ...getColumnSearchProps('status') },
    { title: 'Date Submitted', dataIndex: 'date', key: 'date', sorter: (a, b) => new Date(a.date) - new Date(b.date), sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null },
    { title: 'Broker', dataIndex: 'broker', key: 'broker', ...getColumnSearchProps('broker') },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority, record) => (
        <Popover
          content={<PriorityPopup priority={priority} record={record} />}
          trigger="click"
          placement="rightTop"
          overlayStyle={{ width: 500 }}
        >
          <PriorityBadge
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`priority-badge priority-${priority.toLowerCase()}`}
          >
            {priority}
          </PriorityBadge>
        </Popover>
      ),
    },
  ];

  const combinedData = [
    ...data.myteamscases,
    ...data.myassignedcases,
    ...data.senttobroker
  ];

  // Portfolio component content
  // const MyPortfolioContent = () => (
  //   <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#FFFFFF', margin: '24px', borderRadius: '12px', border: '1px solid #E8E8E8' }}>
  //     <Title level={3} style={{ color: '#262626', marginBottom: '16px' }}>My Portfolio</Title>
  //     <Text style={{ color: '#8C8C8C', fontSize: '16px' }}>
  //       Portfolio content will be displayed here. This is where you can view and manage your portfolio data.
  //     </Text>
  //     {/* Add your portfolio component content here */}
  //   </div>
  // );

  // Dashboard content component
  const DashboardContent = () => (
    <>
      <MetricsSection>
       
        <div className="metrics-grid">
          <MetricCard>
            <div className="card-title">Policies Issued</div>
            <div className="card-subtitle">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#204FC2' }}></div>
                <span>Commercial Property</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#E9EDF7' }}></div>
                <span>General Liability</span>
              </div>
            </div>
            <ChartWrapper>
              <div className="chart-container">
                <canvas ref={policiesChartRef}></canvas>
              </div>
            </ChartWrapper>
          </MetricCard>

          <MetricCard>
            <div className="card-title">Submission in Progress</div>
            <div className="card-subtitle">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#204FC2' }}></div>
                <span>Commercial Property</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#E9EDF7' }}></div>
                <span>General Liability</span>
              </div>
            </div>
            <ChartWrapper>
              <div className="chart-container">
                <canvas ref={submissionsChartRef}></canvas>
              </div>
            </ChartWrapper>
          </MetricCard>

          <MetricCard>
            <div className="card-title">New Business vs Renewal Premium ($)</div>
            <div className="card-subtitle">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#204FC2' }}></div>
                <span>Acquisition</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#D2DAF2' }}></div>
                <span>Purchase</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#97A5EB' }}></div>
                <span>Retention</span>
              </div>
            </div>
            <ChartWrapper>
              <div className="chart-container">
                <canvas ref={donutChartRef}></canvas>
              </div>
            </ChartWrapper>
          </MetricCard>
        </div>
      </MetricsSection>

      <WorkSection>
        <div className="work-header">My Work</div>
        <div className="work-content">
          <MyTableComponent
            columns={columns}
            dataSource={data.myassignedcases}
            handleRowClick={handleRowClick}
            handleChange={handleChange}
          />
        </div>
      </WorkSection>
    </>
  );

  return (
    <ResponsiveHelper>
      <DashboardContainer>
        <TopBar>
          <div className="left-section">
            <span className="greeting">Hi Andrei,</span>
          </div>
          <div className="center-section">
            <Input
              className="search-input"
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </div>
        </TopBar>

        <WelcomeSection>
          <Row  justify="space-between" align="middle">
            <Title level={2} className="welcome-title">Welcome to UW Workbench</Title>
            <div className="tab-navigation">
              <Button 
                className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                My Dashboard
              </Button>
              <Button 
                className={`nav-tab ${activeTab === 'portfolio' ? 'active' : ''}`}
                onClick={() => setActiveTab('portfolio')}
              >
                My Portfolio
              </Button>
            </div>
          </Row>
        </WelcomeSection>
        
        {activeTab === 'dashboard' ? <DashboardContent /> : <PortfolioInsights />}
      </DashboardContainer>
    </ResponsiveHelper>
  );
};

export default Dashboard;