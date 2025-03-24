import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chart } from "chart.js/auto";
import { Table, Button, Space, Input, Typography, Card, Row, Col, Modal, List, Divider, Checkbox, Tabs as AntTabs } from "antd";
import { SearchOutlined, MailOutlined, FileTextOutlined, HistoryOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./Dashboard.css";
// import "./Table.css";
import { Tabs } from "antd";
import { Popover } from "antd";
import PriorityPopup from "./PriorityPopup";
import { TableContainer } from "../styles/components/TableComponent";
import useMetaData from "../context/metaData";


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
                fontSize: "18px",
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
        style={{ fontFamily: "Inter" }} // Use the same font as the rest of the app
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
            fontFamily: "inherit",
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
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                padding: "8px 12px",
                marginTop: 8,
                height: 110,
                width: "100%",
                overflowY: "auto",
                fontFamily: "inherit",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ marginBottom: "8px" }}>
                <span
                  style={{
                    animation: "blink 1s infinite",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Urgent: CP1007 Client F renewal due today
                </span>
              </div>
              <div style={{ marginBottom: "8px" }}>
                Follow up on outstanding documents for CP1003
              </div>
              <div>
                Call scheduled with Marsh broker at 3:00 PM
              </div>
            </div>
          </div>

          {/* This week section */}
          <div>
            <Text strong style={{ fontFamily: "inherit" }}>
              This week
            </Text>
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                padding: "8px 12px",
                marginTop: 8,
                height: 110,
                width: "100%",
                overflowY: "auto",
                fontFamily: "inherit",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ marginBottom: "8px" }}>
                <span
                  style={{
                    animation: "blink 1s infinite",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Critical: Property inspection for Skyline due Wed
                </span>
              </div>
              <div style={{ marginBottom: "8px" }}>
                Team meeting on Thu at 10:00 AM
              </div>
              <div>
                Complete quarterly reports by Friday
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add the CSS for blinking effect */}
      <style jsx>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
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
        <TabPane tab="My Task" key="1">
          <Row gutter={16} style={{ marginTop: "16px" }}>
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <MyTableComponent
                columns={columns}
                dataSource={data.myassignedcases}
                handleRowClick={handleRowClick}
                handleChange={handleChange}
                rowSelection={rowSelection}
                style={{ fontFamily: "Inter" }}
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
              <Card
                style={{
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
                  marginTop: "13px",
                  height: "410px",
                  width: "320px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityBox />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

    </div>
  );
};

export default DashboardAdmin;