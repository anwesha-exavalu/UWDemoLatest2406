import React, { useEffect, useRef } from "react";
import { Chart } from 'chart.js/auto';
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
import { Container } from "../styles/components/Layout";

const PortfolioInsights = () => {
  const productDonutRef = useRef(null);
  const revenueBarRef = useRef(null);
  const premiumBarRef = useRef(null);
  const claimRadial1Ref = useRef(null);
  const claimRadial2Ref = useRef(null);

  // Create Donut Chart (similar to Dashboard)
  const createDonutChart = () => {
    if (!productDonutRef.current) return;
    
    if (productDonutRef.current.chartInstance) {
      productDonutRef.current.chartInstance.destroy();
    }

    const ctx = productDonutRef.current.getContext('2d');
    
    productDonutRef.current.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Commercial Property', 'General Liability'],
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
            data: [55, 45],
            backgroundColor: ['#204FC2', '#D2DAF2'],
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
          padding: 5
        }
      },
    });
  };

  // Create Floating Bar Chart for Revenue by Brokerages
const createFloatingBarChart = () => {
  if (!revenueBarRef.current) return;

  if (revenueBarRef.current.chartInstance) {
    revenueBarRef.current.chartInstance.destroy();
  }

  const ctx = revenueBarRef.current.getContext('2d');

  const maxValues = [20, 20, 20, 20, 20, 20, 20, 20, 20];
  const actualValues = [8, 4, 14, 18, 9, 12, 16, 5, 3];

  revenueBarRef.current.chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Array(9).fill(''),
      datasets: [
        {
          label: 'Remaining',
          data: maxValues,
          backgroundColor: '#E9EDF7',
           borderRadius: {
            topLeft: 10,
            topRight: 10,
            bottomLeft: 0,
            bottomRight: 0
          },
       
          borderSkipped: false,
          barThickness: 20,
          maxBarThickness: 20,
          order: 2
        },
        {
          label: 'Actual',
          data: actualValues,
          backgroundColor: '#204FC2',
          borderRadius: {
            topLeft: 0,
            topRight: 0,
            bottomLeft: 10,
            bottomRight: 10
          },
          borderSkipped: false,
          barThickness: 20,
          maxBarThickness: 20,
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'x',
      scales: {
        x: {
          stacked: true,
          display: false,
          grid: { display: false },
          border: { display: false }
        },
        y: {
          stacked: true,
          display: false,
          grid: { display: false },
          border: { display: false }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          filter: tooltipItem => tooltipItem.datasetIndex === 1,
          callbacks: {
            label: context => `Revenue: $${context.raw}M`,
            
          }
        }
      },
      layout: {
        padding: 10
      }
    }
  });
};


  // Create Bar Chart for Premium by Year
  const createPremiumBarChart = () => {
    if (!premiumBarRef.current) return;
    
    if (premiumBarRef.current.chartInstance) {
      premiumBarRef.current.chartInstance.destroy();
    }

    const ctx = premiumBarRef.current.getContext('2d');
    
    premiumBarRef.current.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [{
          label: 'Written Premium',
          data: [12, 13, 15, 11, 19, 25],
          backgroundColor: ['#E9EDF7', '#E9EDF7', '#E9EDF7', '#E9EDF7', '#E9EDF7', '#204FC2'],
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
              font: { size: 11 },
              callback: function(value) {
                return '$' + value + 'M';
              }
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

  // Create Radial Charts for Claims
  const createRadialChart = (canvasRef, percentage, color) => {
    if (!canvasRef.current) return;
    
    if (canvasRef.current.chartInstance) {
      canvasRef.current.chartInstance.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
     
    canvasRef.current.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [percentage, 100 - percentage],
            backgroundColor: [color, '#f3f4f6'],
            borderWidth: 0,
            cutout: '85%',
           
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        elements: {
          arc: {
            borderWidth: 0,
            borderRadius: 2
          }
        }
      },
      plugins: [{
        id: 'centerText',
        beforeDraw: function(chart) {
          const ctx = chart.ctx;
          const centerX = chart.width / 2;
          const centerY = chart.height / 2;
          
          ctx.save();
          ctx.font = 'bold 14px Arial';
          ctx.fillStyle = '#111827';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(percentage + '%', centerX, centerY);
          ctx.restore();
        }
      }]
    });
  };

  const destroyCharts = () => {
    [productDonutRef, revenueBarRef, premiumBarRef, claimRadial1Ref, claimRadial2Ref].forEach(ref => {
      if (ref.current?.chartInstance) {
        ref.current.chartInstance.destroy();
        ref.current.chartInstance = null;
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      createDonutChart();
      createFloatingBarChart();
      createPremiumBarChart();
      createRadialChart(claimRadial1Ref, 83, '#3b82f6');
      createRadialChart(claimRadial2Ref, 66, '#14b8a6');
    }, 100);

    return () => {
      destroyCharts();
    };
  }, []);

  return (

    <Dashboard>
      <Container>
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
          <div className="card-subtitle" style={{ marginBottom: '16px', display: 'flex', gap: '16px', fontSize: '12px', color: '#8C8C8C' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#204FC2' }}></div>
              <span>Commercial Property</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D2DAF2' }}></div>
              <span>General Liability</span>
            </div>
          </div>
          <div style={{ height: '200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <canvas ref={productDonutRef} style={{ width: '100%', height: '100%' }}></canvas>
          </div>
        </Card>

        {/* Revenue by Brokerages */}
        <Card className="revenue-card">
          <CardTitle>Revenue by Brokerages (YTD)</CardTitle>
          <StatusIndicator>
            <StatusDot className="green" />
            <StatusText>On track</StatusText>
            <StatusPercentage>+2.45%</StatusPercentage>
          </StatusIndicator>
          <div style={{ height: '250px', width: '100%', padding: '10px' }}>
            <canvas ref={revenueBarRef} style={{ width: '100%', height: '100%' }}></canvas>
          </div>
        </Card>
      </TopRow>

      {/* Bottom Row */}
      <BottomRow>
        {/* Written Premium By Year */}
        <Card className="large-card">
          <CardTitle>Written Premium By Year</CardTitle>
          <div className="card-subtitle" style={{ marginBottom: '16px', display: 'flex', gap: '16px', fontSize: '12px', color: '#8C8C8C' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4A90E2' }}></div>
              <span>Premium Amount</span>
            </div>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <canvas ref={premiumBarRef} style={{ width: '100%', height: '100%' }}></canvas>
          </div>
        </Card>

        {/* Claim History */}
        <Card>
          <CardTitle>Claim History</CardTitle>
          <ClaimHistoryContainer>
            <ClaimCirclesRow>
              <ClaimCircleItem>
                <ClaimCircleChart>
                  <div style={{ height: '200px', width: '120px' }}>
                    <canvas ref={claimRadial1Ref} style={{ width: '100%', height: '100%' }}></canvas>
                  </div>
                </ClaimCircleChart>
                <CircleLabel>General Liability</CircleLabel>
              </ClaimCircleItem>

              <ClaimCircleItem>
                <ClaimCircleChart>
                  <div style={{ height: '120px', width: '120px' }}>
                    <canvas ref={claimRadial2Ref} style={{ width: '100%', height: '100%' }}></canvas>
                  </div>
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
      </Container>
    </Dashboard>
  );
};

export default PortfolioInsights;