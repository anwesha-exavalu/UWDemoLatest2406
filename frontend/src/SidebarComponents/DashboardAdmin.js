import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chart } from "chart.js/auto";
import { Table, Button, Space, Input, Typography, Card, Row, Col, Modal, List, Divider, Checkbox, Tabs as AntTabs } from "antd";
import { SearchOutlined, MailOutlined, FileTextOutlined, HistoryOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./Dashboard.css";
// import "./Table.css";
import { Tabs } from "antd";
import PortfolioInsights from "./PortfolioInsights";
import { Popover } from "antd";
import PriorityPopup from "./PriorityPopup";
import { TableContainer } from "../styles/components/TableComponent";
import useMetaData from "../context/metaData";
import TextArea from "antd/es/input/TextArea";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

// Quick Links Component for Tab
const QuickLinksTab = () => {
  const items = [
    { name: "Send Email", link: "https://www.gmail.com" },
    { name: "Order report", link: "https://www.reportportal.com" },
    { name: "Upload document", link: "https://www.dropbox.com" },
    { name: "Create Renewal", link: "https://www.renewals.example.com" },
    { name: "Quote", link: "https://www.quotes.example.com" }
  ];

  return (
    <Card
    style={{
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginTop: "16px"
    }}
  >
    <List
      size="small"
      header={<div style={{ fontWeight: "bold", textAlign: "center" }}>Quick Links</div>}
      dataSource={items}
      renderItem={(item) => (
        <List.Item 
          style={{ 
            borderBottom: "1px solid #f0f0f0", 
            padding: "0",
            transition: "background-color 0.3s ease"
          }}
        >
          <a 
            href={item.link} 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              cursor: "pointer", 
              width: "100%", 
              fontSize:"18px",
              textDecoration: "none", 
              color: "#1890ff",
              padding: "10px 16px",
              display: "block",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
              e.currentTarget.style.color = "#096dd9";
              e.currentTarget.style.fontWeight = "500";
            
              e.currentTarget.style.textDecoration = "underline";

            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#1890ff";
              e.currentTarget.style.fontWeight = "normal";
            
            }}
            onClick={() => {
              console.log(`${item.name} clicked - redirecting to ${item.link}`);
            }}
          >
            {item.name}
          </a>
        </List.Item>
      )}
    />
  </Card>
  );
};

// Reports Tab Component
const ReportsTab = () => {
  const items = [
    "Create renewal report",
    "Cancellation report",
    "Custom report"
  ];

  return (
    <Card
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "16px"
      }}
    >
      <List
        size="small"
        header={<div style={{ fontWeight: "bold", textAlign: "center" }}>Reports</div>}
        dataSource={items}
        renderItem={(item) => (
          <List.Item 
            style={{ borderBottom: "1px solid #f0f0f0", padding: "10px 0" }}
            onClick={() => {
              console.log(`${item} clicked`);
            }}
          >
            <div style={{ cursor: "pointer", width: "100%" }}>{item}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

// Task History Tab Component
const TaskHistoryTab = () => {
  return (
    <Card
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "16px"
      }}
    >
      <div style={{ padding: "10px 0" }}>
        <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>Task History</div>
        <div style={{ backgroundColor: "#f5f5f5", padding: "10px", marginBottom: "10px" }}>
          Task 1 completed on 15-03-2025
        </div>
        <div style={{ backgroundColor: "#f5f5f5", padding: "10px", marginBottom: "10px" }}>
          Task 2 completed on 12-03-2025
        </div>
        <div style={{ backgroundColor: "#f5f5f5", padding: "10px" }}>
          Task 3 completed on 08-03-2025
        </div>
      </div>
    </Card>
  );
};

const MyTableComponent = ({
  columns,
  dataSource,
  handleRowClick,
  handleChange,
  rowSelection,
}) => {
  const { theme } = useMetaData();
  return (
    <TableContainer theme={theme}>
      <Table
        className="custom-table-header"
        columns={columns}
        dataSource={dataSource}
        onChange={handleChange}
        onRow={(record) => ({
          onClick: (e) => {
            // Only trigger row click if not clicking on checkbox
            if (e.target.tagName !== 'INPUT') {
              handleRowClick(record);
            }
          },
          className: "clickable-row",
        })}
        rowSelection={rowSelection}
        pagination={{ pageSize: 3 }}
        components={{
          header: {
            cell: ({ className, ...restProps }) => (
              <th
                {...restProps}
                style={{
                  color: "#fff", // Set header text color
                  fontFamily: "Inter", // Use the same font as the rest of the app
                }}
              />
            ),
          },
        }}
        size="middle"
        style={{  fontFamily: "Inter"}} // Use the same font as the rest of the app
      />
    </TableContainer>
  );
};

// Activity Box component
const ActivityBox = () => {
  return (
    <Card
      style={{
        height: "100%",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      bodyStyle={{ padding: "0", height: "100%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "10px",
            textAlign: "center",
            borderBottom: "1px solid #d9d9d9",
            backgroundColor: "#5D9DE2",
            color: "white",
            fontFamily: "inherit", // Use the same font as the rest of the app
          }}
        >
          <strong>Activity</strong>
        </div>

        {/* Content */}
        <div style={{ padding: "15px 20px", flex: 1 }}>
          {/* Today section */}
          <div style={{ marginBottom: 15 }}>
            <Text strong style={{ fontFamily: "inherit" }}>
              Today
            </Text>
            <TextArea
              style={{
                border: "1px solid #d9d9d9",
                height: 80,
                marginTop: 8,
                width: "100%",
                fontFamily: "inherit", // Use the same font as the rest of the app
              }}
            ></TextArea>
          </div>

          {/* This week section */}
          <div>
            <Text strong style={{ fontFamily: "inherit" }}>
              This week
            </Text>
            <TextArea
              style={{
                border: "1px solid #d9d9d9",
                height: 80,
                marginTop: 8,
                width: "100%",
                fontFamily: "inherit", // Use the same font as the rest of the app
              }}
            ></TextArea>
          </div>
        </div>
      </div>
    </Card>
  );
};

const data = {
  myteamscases: [
    {
      key: "1",
      id: "CP1001",
      client: "Fleet Solutions",
      lob: "Commercial Property",
      status: "Clearance UW",
      limit: "$500,000",
      date: "20-08-2024",
      broker: "Marsh ",
      priority: "Medium",
    },
    {
      key: "2",
      id: "CP1002",
      client: "Skyline Residences",
      lob: "Commercial Property",
      status: "Clearance UW",
      limit: "$250,000",
      date: "18-08-2024",
      broker: "Marsh ",
      priority: "Medium",
    },
  ],
  myassignedcases: [
    {
      key: "3",
      id: "CP1003",
      client: "Skyline Property Inc.",
      lob: "Commercial Property",
      status: "Awaiting Client Response",
      limit: "$900,000",
      date: "10-15-2024",
      broker: "Marsh ",
      priority: "Medium",
    },
    {
      key: "4",
      id: "CP1001",
      client: "Fleet Solutions",
      lob: "Commercial Property",
      status: "Clearance UW",
      limit: "$500,000",
      date: "20-08-2024",
      broker: "Marsh ",
      priority: "Medium",
    },
    {
      key: "5",
      id: "CP1006",
      client: "Uptown Commercial Spaces",
      lob: "Commercial Property",
      status: "Broker Review",
      limit: "$450,000",
      date: "17-08-2024",
      broker: "Marsh ",
      priority: "Medium",
    },
    // { id: 'CP1004', client: 'Kew Garden Property Inc.', lob: 'Commercial Property', status: 'New Submission', limit: '$15,000,000', date: '11-05-2024', broker: 'Marsh ', priority: 'High' },
  ],
  senttobroker: [
    {
      key: "6",
      id: "CP1006",
      client: "Uptown Commercial Spaces",
      lob: "Commercial Property",
      status: "Broker Review",
      limit: "$450,000",
      date: "17-08-2024",
      broker: "Marsh ",
      priority: "Medium",
    },
    {
      key: "7",
      id: "CP1007",
      client: "Client F",
      lob: "Commercial Property",
      status: "Broker Review",
      limit: "$100,000",
      date: "09-08-2024",
      broker: "Marsh ",
      priority: "High",
    },
  ],
  close: [
    {
      key: "8",
      id: "CP1009",
      client: "Client F",
      lob: "Commercial Property",
      status: "Approved",
      limit: "$700,000",
      date: "10-08-2024",
      broker: "Marsh ",
      priority: "Low",
    },
    {
      key: "9",
      id: "CP1010",
      client: "Client I",
      lob: "Commercial Property",
      status: "Rejected",
      limit: "$300,000",
      date: "11-08-2024",
      broker: "Marsh ",
      priority: "High",
    },
  ],
};

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  
  // State for selected rows
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // State for action tabs visibility
  const [showActionTabs, setShowActionTabs] = useState(false);
  // State for active action tab
  const [activeActionTab, setActiveActionTab] = useState("1");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const policiesChartRef = useRef(null);
  const submissionsChartRef = useRef(null);
  const donutChartRef = useRef(null);
  const createDonutChart = () => {
    const ctx = donutChartRef.current.getContext("2d");
    donutChartRef.current.chartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["General Liability", "Commercial Property"],
        datasets: [
          {
            data: [3000000, 7000000], // Updated to millions
            backgroundColor: ["#FF69B4", "#36a2eb"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                // Format the numbers with commas and 'M' suffix
                const value = (context.raw / 1000000).toFixed(1) + "M";
                return `${context.label}: $${value}`;
              },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    createBarChart(
      policiesChartRef,
      "Policies Issued",
      ["Commercial Property", "General Liability"],
      [30, 25, 40, 35]
    );
    createBarChart(
      submissionsChartRef,
      "Submission in Progress",
      ["Commercial Property", "General Liability"],
      [15, 18, 22, 20]
    );

    return () => {
      [policiesChartRef, submissionsChartRef, donutChartRef].forEach((ref) => {
        if (ref.current) ref.current.chartInstance.destroy();
      });
    };
  }, []);
  useEffect(() => {
    createDonutChart();
    return () => {
      if (donutChartRef.current?.chartInstance) {
        donutChartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  const createBarChart = (chartRef, title, labels, data) => {
    const ctx = chartRef.current.getContext("2d");
    chartRef.current.chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: title, data, backgroundColor: ["#36A2EB", "#ff69b4"] },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });
  };

  const handleRowClick = (record) => {
    navigate("/accountdashboard", { state: { account: record } });
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // Handle row selection changes
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setShowActionTabs(newSelectedRowKeys.length > 0);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Submission Id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
      filters: [
        ...new Set(
          data.myteamscases
            .concat(data.myassignedcases, data.senttobroker, data.close)
            .map((item) => ({ text: item.id, value: item.id }))
        ),
      ],
      filteredValue: filteredInfo.id || null,
      onFilter: (value, record) => record.id.includes(value),
    },
    {
      title: "Name",
      dataIndex: "client",
      key: "client",
      ...getColumnSearchProps("client"),
      filters: [
        ...new Set(
          data.myteamscases
            .concat(data.myassignedcases, data.senttobroker, data.close)
            .map((item) => ({ text: item.client, value: item.client }))
        ),
      ],
      filteredValue: filteredInfo.client || null,
      onFilter: (value, record) => record.client.includes(value),
    },
    {
      title: "LOB",
      dataIndex: "lob",
      key: "lob",
      ...getColumnSearchProps("lob"),
      filters: [
        ...new Set(
          data.myteamscases
            .concat(data.myassignedcases, data.senttobroker, data.close)
            .map((item) => ({ text: item.lob, value: item.lob }))
        ),
      ],
      filteredValue: filteredInfo.lob || null,
      onFilter: (value, record) => record.lob.includes(value),
    },
    { title: "Limit", dataIndex: "limit", key: "limit" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
    },
    {
      title: "Date Submitted",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,
    },
    {
      title: "Broker",
      dataIndex: "broker",
      key: "broker",
      ...getColumnSearchProps("broker"),
    },
    {
      title: "Claim Propensity",
      dataIndex: "priority",
      key: "priority",
      render: (priority, record) => (
        <Popover
          content={<PriorityPopup priority={priority} record={record} />}
          trigger="click"
          placement="rightTop"
          overlayStyle={{ width: 500 }}
        >
          <span
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor:
                priority === "High"
                  ? "#fff1f0"
                  : priority === "Medium"
                  ? "#fffbe6"
                  : "#f6ffed",
              color:
                priority === "High"
                  ? "#cf1322"
                  : priority === "Medium"
                  ? "#d4b106"
                  : "#389e0d",
              cursor: "pointer",
              fontFamily: "inherit", // Use the same font as the rest of the app
            }}
          >
            {priority}
          </span>
        </Popover>
      ),
    },
  ];

  const combinedData = [
    ...data.myteamscases,
    ...data.myassignedcases,
    ...data.senttobroker,
  ];

  return (
    <div 
      style={{ 
        padding: "10px",
        fontFamily: "inherit" // Use the same font as the rest of the app
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="My Dashboard" key="1">
          <div className="content">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "5px",
                flexWrap: "nowrap",
              }}
            >
              <div
                className="chart-container"
                style={{ flex: 1, flexDirection: "column" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    marginBottom: "5px",
                    fontFamily: "inherit", // Use the same font as the rest of the app
                  }}
                >
                  Policies Issued(YTD)
                </div>
                <canvas
                  ref={policiesChartRef}
                  style={{ maxHeight: "200px", width: "100%" }}
                ></canvas>
              </div>
              <div
                className="chart-container"
                style={{ flex: 1, flexDirection: "column" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    marginBottom: "5px",
                    fontFamily: "inherit", // Use the same font as the rest of the app
                  }}
                >
                  Submission in Progress(YTD)
                </div>
                <canvas
                  ref={submissionsChartRef}
                  style={{ maxHeight: "200px", width: "100%" }}
                ></canvas>
              </div>
              <div
                className="chart-container"
                style={{ flex: 1, flexDirection: "column" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    marginBottom: "5px",
                    fontFamily: "inherit", // Use the same font as the rest of the app
                  }}
                >
                  Premium by LOB(Quotes)
                </div>
                <canvas
                  ref={donutChartRef}
                  style={{ maxHeight: "200px", width: "100%" }}
                ></canvas>
              </div>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="My Work" key="1">
                <Row gutter={16} style={{ marginTop: "16px" }}>
                  <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    <MyTableComponent
                      columns={columns}
                      dataSource={data.myassignedcases}
                      handleRowClick={handleRowClick}
                      handleChange={handleChange}
                      rowSelection={rowSelection}
                      style={{fontFamily: "Inter"}}
                    />
                    
                    {/* Action Tabs - visible only when rows are selected */}
                    {showActionTabs && (
                      <div style={{ marginTop: "20px" }}>
                        <AntTabs 
                          activeKey={activeActionTab} 
                          onChange={setActiveActionTab}
                          type="card"
                        >
                          <AntTabs.TabPane tab={<span><HistoryOutlined /> Task History</span>} key="1">
                            <TaskHistoryTab />
                          </AntTabs.TabPane>
                          <AntTabs.TabPane tab={<span><MailOutlined /> Quick Links</span>} key="2">
                            <QuickLinksTab />
                          </AntTabs.TabPane>
                          
                          <AntTabs.TabPane tab={<span><FileTextOutlined /> Reports</span>} key="3">
                            <ReportsTab />
                          </AntTabs.TabPane>
                          
                          
                        </AntTabs>
                      </div>
                    )}
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ marginTop: { xs: '16px', sm: '16px', md: '0' } }}>
                    <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", marginTop:"13px", height:"348px", width:"320px"}}>
                      <ActivityBox />
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="My Team Work" key="2">
                <MyTableComponent
                  columns={columns}
                  dataSource={combinedData}
                  handleRowClick={handleRowClick}
                  handleChange={handleChange}
                  rowSelection={rowSelection}
                />
                
                {/* Action Tabs for Team Work tab too */}
                {showActionTabs && (
                  <div style={{ marginTop: "20px" }}>
                    <AntTabs 
                      activeKey={activeActionTab} 
                      onChange={setActiveActionTab}
                      type="card"
                    >
                      <AntTabs.TabPane tab={<span><MailOutlined /> Quick Links</span>} key="1">
                        <QuickLinksTab />
                      </AntTabs.TabPane>
                      
                      <AntTabs.TabPane tab={<span><FileTextOutlined /> Reports</span>} key="2">
                        <ReportsTab />
                      </AntTabs.TabPane>
                      
                      <AntTabs.TabPane tab={<span><HistoryOutlined /> Task History</span>} key="3">
                        <TaskHistoryTab />
                      </AntTabs.TabPane>
                    </AntTabs>
                  </div>
                )}
              </TabPane>
            </Tabs>
          </div>
        </TabPane>
        <TabPane tab="My Portfolio" key="2">
          <PortfolioInsights />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DashboardAdmin;