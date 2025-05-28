import React from "react";
import ReactApexChart from "react-apexcharts";
import {
  FileTextOutlined,
  SafetyOutlined,
  DollarOutlined,
  WarningOutlined
} from "@ant-design/icons";
import {
  Dashboard,
  TopRow,
  BottomRow,
  Card,
  CardTitle,
  StatsGrid,
  StatItem,
  StatIcon,
  StatContent,
  StatValue,
  StatLabel,
  StatusIndicator,
  StatusDot,
  StatusText,
  StatusPercentage,
  ClaimHistoryContainer,
  ClaimCirclesRow,
  ClaimCircleItem,
  ClaimCircleChart,
  CircleLabel,
  ClaimAmountSection,
  ClaimAmountLabel,
  ClaimAmountValue
} from "../styles/pages/Dashboard/PortfolioInsightStyle";

const PortfolioInsights = () => {
  // Radial Bar Chart Options
  const createRadialChartOptions = (color, label) => ({
    chart: {
      height: 120,
      type: "radialBar",
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 5,
          size: "60%"
        },
        track: {
          background: '#f3f4f6',
          strokeWidth: '100%',
        },
        dataLabels: {
          showOn: "always",
          name: {
            show: false
          },
          value: {
            color: "#111827",
            fontSize: "14px",
            fontWeight: "600",
            show: true,
            formatter: function(val) {
              return val + "%";
            }
          }
        }
      }
    },
    stroke: {
      lineCap: "round",
    },
    colors: [color],
    labels: [label]
  });

  // Written Premium By Year Chart
  const premiumChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#204FC2", "#0a63ac"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["2019", "2020", "2021", "2022", "2023", "2024"],
    },
    yaxis: [
      {
        title: {
          text: "Written Premium",
        },
        labels: {
          formatter: (value) => `${value.toLocaleString()}`,
        },
      },
      {
        opposite: true,
        title: {
          text: "Margin (%)",
        },
        labels: {
          formatter: (value) => `${value}%`,
        },
      },
    ],
    markers: {
      size: 5,
    },
    stroke: {
      curve: "smooth",
    },
  };

  const premiumChartSeries = [
    {
      name: "Written Premium",
      type: "bar",
      data: [12000000, 13000000, 15000000, 11000000, 19000000, 25000000],
    },
    {
      name: "Margin",
      type: "line",
      data: [34, 44, 30, 14, 24, 19.2],
    },
    {
      name: "Target",
      type: "line",
      data: [30, 30, 30, 30, 30, 30],
    },
  ];

  // Product Distribution Donut Chart
  const productChartOptions = {
    chart: {
      type: "donut",
      background: "transparent",
    },
    colors: ["#204FC2", "#D2DAF2"],
    labels: ["Commercial Property", "General Liability"],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: 20,
      fontSize: "12px",
      fontWeight: 400,
     
      markers: {
        width: 12,
        height: 12,
        radius: 2
      },
      itemMargin: {
        horizontal: 8,
        vertical: 1
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 500,
              color: '#111827',
              formatter: function (val) {
                return val + "%"
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '12px',
              fontWeight: 400,
              color: '#6B7280',
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const productChartSeries = [55, 45];

  // Policy Count Chart
  const policyCountOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#204FC2", "#9966FF", "#FF6666"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        barHeight: "100%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Marsh Brokers", "NY Choice Brokerages", "Ariston Brokerage"],
      labels: {
        style: {
          fontSize: '11px'
        },
        rotate: -45,
        rotateAlways: true
      }
    },
    yaxis: {
      title: {
        text: "Revenue ($M)",
        style: {
          fontSize: '12px'
        }
      },
      labels: {
        formatter: function (value) {
          return value.toFixed(0);
        }
      }
    },
    grid: {
      borderColor: '#E7E7E7',
      strokeDashArray: 4
    }
  };

  const policyCountSeries = [
    {
      name: "Revenue",
      data: [5, 10, 15]
    },
  ];

  return (
    <Dashboard>
      {/* Top Row */}
      <TopRow>
        {/* Book of Business Card */}
        <Card className="business-card">
          <CardTitle>Book Of Business (YTD)</CardTitle>
          <StatsGrid>
            <StatItem>
              <StatIcon className="blue">
                <FileTextOutlined style={{ fontSize: '16px' }} />
              </StatIcon>
              <StatContent>
                <StatValue>$25 M</StatValue>
                <StatLabel>Written Premium</StatLabel>
              </StatContent>
            </StatItem>

            <StatItem>
              <StatIcon className="green">
                <SafetyOutlined style={{ fontSize: '16px' }} />
              </StatIcon>
              <StatContent>
                <StatValue>5000</StatValue>
                <StatLabel>Policy Count</StatLabel>
              </StatContent>
            </StatItem>

            <StatItem>
              <StatIcon className="purple">
                <DollarOutlined style={{ fontSize: '16px' }} />
              </StatIcon>
              <StatContent>
                <StatValue>$500,000</StatValue>
                <StatLabel>Claim Amount</StatLabel>
              </StatContent>
            </StatItem>

            <StatItem>
              <StatIcon className="teal">
                <WarningOutlined style={{ fontSize: '16px' }} />
              </StatIcon>
              <StatContent>
                <StatValue>5</StatValue>
                <StatLabel>Claim Count</StatLabel>
              </StatContent>
            </StatItem>
          </StatsGrid>
        </Card>

        {/* Written Premium By Product */}
        <Card className="product-card">
          <CardTitle>Written Premium By Product (YTD)</CardTitle>
          <div className="chart-container">
            <ReactApexChart
              options={productChartOptions}
              series={productChartSeries}
              type="donut"
              height={200}
            />
          </div>
        </Card>

        {/* Revenue by Brokerages */}
        <Card className="revenue-card">
          <CardTitle>Revenue by Brokerages (YTD)</CardTitle>
          <StatusIndicator>
            <StatusDot className="green" />
            <StatusText>On track</StatusText>
            <StatusPercentage>+24%</StatusPercentage>
          </StatusIndicator>
          <div className="chart-container stretched">
            <ReactApexChart
              options={policyCountOptions}
              series={policyCountSeries}
              type="bar"
              height={250}
              width="100%"
            />
          </div>
        </Card>
      </TopRow>

      {/* Bottom Row */}
      <BottomRow>
        {/* Written Premium By Year */}
        <Card className="large-card">
          <CardTitle>Written Premium By Year</CardTitle>
          <div className="chart-container stretched">
            <ReactApexChart
              options={premiumChartOptions}
              series={premiumChartSeries}
              type="line"
              height={320}
              width="100%"
            />
          </div>
        </Card>

        {/* Claim History */}
        <Card>
          <CardTitle>Claim History</CardTitle>
          <ClaimHistoryContainer>
            <ClaimCirclesRow>
              <ClaimCircleItem>
                <ClaimCircleChart>
                  <ReactApexChart
                    options={createRadialChartOptions('#3b82f6', 'General Liability')}
                    series={[83]}
                    type="radialBar"
                    height={120}
                  />
                </ClaimCircleChart>
                <CircleLabel>General Liability</CircleLabel>
              </ClaimCircleItem>

              <ClaimCircleItem>
                <ClaimCircleChart>
                  <ReactApexChart
                    options={createRadialChartOptions('#14b8a6', 'Commercial Property')}
                    series={[66]}
                    type="radialBar"
                    height={120}
                  />
                </ClaimCircleChart>
                <CircleLabel>Commercial Property</CircleLabel>
              </ClaimCircleItem>
            </ClaimCirclesRow>

            <ClaimAmountSection>
              <ClaimAmountLabel>Claim Amount</ClaimAmountLabel>
              <ClaimAmountValue>$500,000</ClaimAmountValue>
            </ClaimAmountSection>
          </ClaimHistoryContainer>
        </Card>
      </BottomRow>
    </Dashboard>
  );
};

export default PortfolioInsights;