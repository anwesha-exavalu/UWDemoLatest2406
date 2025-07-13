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
import { Container } from '../styles/components/Layout';
import { dashboardData, chartData, legendConfig } from './dummyDashboardData';

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
        <div style={{ padding: 4 }} onKeyDown={(e) => e.stopPropagation()}>
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
          borderRadius: 8,
          borderSkipped: false,
          barThickness: 24,
          maxBarThickness: 24,
          categoryPercentage: 0.6,
          barPercentage: 0.7,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        },
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { 
              display: false,
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
        labels: chartData.newBusinessRenewal.labels,
        datasets: [
          {
            data: [100],
            backgroundColor: ['#EEF0FA'],
            borderWidth: 0,
            cutout: '45%',
            radius: '90%',
            circumference: 360,
            rotation: 0
          },
          {
            data: chartData.newBusinessRenewal.data,
            backgroundColor: chartData.newBusinessRenewal.colors,
            borderWidth: 0,
            cutout: '25%',
            radius: '100%',
            borderRadius: 2
          },
          {
            data: [100],
            backgroundColor: ['#EEF0FA'],
            borderWidth: 0,
            cutout: '55%',
            radius: '80%',
            circumference: 360,
            rotation: 0
          },
          {
            data: [100],
            backgroundColor: ['#EEF0FA'],
            borderWidth: 0,
            cutout: '55%',
            radius: '80%',
            circumference: 360,
            rotation: 0
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            filter: function(tooltipItem) {
              return tooltipItem.datasetIndex === 1;
            },
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        },
        interaction: {
          intersect: false
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        layout: {
          padding: 5,
        }
      },
    });
  };

  const createCharts = () => {
    createBarChart(
      policiesChartRef, 
      'Policies Issued', 
      chartData.policiesIssued.labels, 
      chartData.policiesIssued.data, 
      chartData.policiesIssued.colors
    );
    createBarChart(
      submissionsChartRef, 
      'Submission in Progress', 
      chartData.submissionsInProgress.labels, 
      chartData.submissionsInProgress.data, 
      chartData.submissionsInProgress.colors
    );
    createDonutChart();
  };

  const destroyCharts = () => {
    [policiesChartRef, submissionsChartRef, donutChartRef].forEach(ref => {
      if (ref.current?.chartInstance) {
        ref.current.chartInstance.destroy();
        ref.current.chartInstance = null;
      }
    });
  };

  useEffect(() => {
    if (activeTab === 'dashboard') {
      setTimeout(() => {
        createCharts();
      }, 100);
    } else {
      destroyCharts();
    }

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

  const getAllData = () => [
    ...dashboardData.myteamscases,
    ...dashboardData.myassignedcases,
    ...dashboardData.senttobroker,
    ...dashboardData.close
  ];

  const columns = [
    {
      title: 'Submission Id',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
      filters: [...new Set(getAllData().map(item => ({ text: item.id, value: item.id })))],
      filteredValue: filteredInfo.id || null,
      onFilter: (value, record) => record.id.includes(value),
    },
    {
      title: 'Name',
      dataIndex: 'client',
      key: 'client',
      ...getColumnSearchProps('client'),
      filters: [...new Set(getAllData().map(item => ({ text: item.client, value: item.client })))],
      filteredValue: filteredInfo.client || null,
      onFilter: (value, record) => record.client.includes(value),
    },
    {
      title: 'LOB',
      dataIndex: 'lob',
      key: 'lob',
      ...getColumnSearchProps('lob'),
      filters: [...new Set(getAllData().map(item => ({ text: item.lob, value: item.lob })))],
      filteredValue: filteredInfo.lob || null,
      onFilter: (value, record) => record.lob.includes(value),
    },
    { title: 'Limit', dataIndex: 'limit', key: 'limit' },
    { title: 'Status', dataIndex: 'status', key: 'status', ...getColumnSearchProps('status') },
    { 
      title: 'Date Submitted', 
      dataIndex: 'date', 
      key: 'date', 
      sorter: (a, b) => new Date(a.date) - new Date(b.date), 
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null 
    },
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

  // Dashboard content component with responsive layout
  const DashboardContent = () => (
    <>
      <MetricsSection>
        <Row gutter={[16, 16]} justify="space-between">
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <MetricCard>
              <div className="card-title">Policies Issued</div>
              <div className="card-subtitle">
                {legendConfig.policiesIssued.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <ChartWrapper>
                <div className="chart-container">
                  <canvas ref={policiesChartRef}></canvas>
                </div>
              </ChartWrapper>
            </MetricCard>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <MetricCard>
              <div className="card-title">Submission in Progress</div>
              <div className="card-subtitle">
                {legendConfig.submissionsInProgress.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <ChartWrapper>
                <div className="chart-container">
                  <canvas ref={submissionsChartRef}></canvas>
                </div>
              </ChartWrapper>
            </MetricCard>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <MetricCard>
              <div className="card-title">New Business vs Renewal Premium ($)</div>
              <div className="card-subtitle">
                {legendConfig.newBusinessRenewal.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <ChartWrapper>
                <div className="chart-container">
                  <canvas ref={donutChartRef}></canvas>
                </div>
              </ChartWrapper>
            </MetricCard>
          </Col>
        </Row>
      </MetricsSection>

      <WorkSection>
        <div className="work-header">My Work</div>
        <div className="work-content">
          <MyTableComponent
            columns={columns}
            dataSource={dashboardData.myassignedcases}
            handleRowClick={handleRowClick}
            handleChange={handleChange}
          />
        </div>
      </WorkSection>
    </>
  );

  return (
    <DashboardContainer>
      <Container>
        <TopBar>
          <Row justify="space-between" align="middle" style={{ width: '99.5%' }}>
            <Col flex={1}>
              <div className="left-section">
                <span className="greeting">Hi Haydenson,</span>
              </div>
            </Col>
            <Col flex={'none'}>
              <div className="center-section">
                <Input
                  className="search-input"
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                />
              </div>
            </Col>
          </Row>
        </TopBar>

        <WelcomeSection>
          <Row justify="space-between" align="middle">
            <Col flex={1}>
              <Title level={2} className="welcome-title">Welcome to UW Workbench</Title>
            </Col>
            <Col flex={'none'}>
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
            </Col>
          </Row>
        </WelcomeSection>
        
        {activeTab === 'dashboard' ? <DashboardContent /> : <PortfolioInsights />}
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;