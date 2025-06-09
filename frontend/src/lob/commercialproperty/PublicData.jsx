import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import { Select, Spin, Alert, message, Row, Col } from "antd";
import { CameraOutlined, LoadingOutlined, DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import {
  PublicDataContainer,
  StyledCard,
  ContentWrapper,
  ControlsContainer,
  MainTabsContainer,
  ChartContainer,
  BoroughSelectContainer
} from "../../styles/pages/RiskInformation/PublicdataStyle";

const { Option } = Select;

const PublicData = ({ onCaptureComplete }) => {
  const [fireData, setFireData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState(null);
  const [selectedYear, setSelectedYear] = useState('all');
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('all-boroughs');
  
  const contentRef = useRef(null);
  const years = Array.from({ length: 9 }, (_, i) => 2024 - i);

  useEffect(() => {
    const fetchAllYearsData = async () => {
      setLoading(true);
      try {
        const promises = years.map((year) =>
          axios.get(
            `https://data.cityofnewyork.us/resource/ii3r-svjz.json?case_year=${year}`
          )
        );

        const responses = await Promise.all(promises);
        const allData = responses.flatMap((response) => response.data);
        setFireData(allData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch fire incident data");
        setLoading(false);
      }
    };

    fetchAllYearsData();
  }, []);

  const handleCapture = async () => {
    if (capturing) return;
    
    setCapturing(true);
    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imageData = canvas.toDataURL('image/png');
      
      const captureData = {
        image: imageData,
        timestamp: new Date().toISOString(),
        year: selectedYear,
        borough: selectedBorough || 'All Boroughs',
      };

      setCapturedImage(captureData);
      message.success('Visualization captured successfully!');
      
    } catch (err) {
      console.error('Failed to capture content:', err);
      message.error('Failed to capture visualization');
    } finally {
      setCapturing(false);
    }
  };

  const handleDownload = () => {
    if (!capturedImage) {
      message.warning("Please capture the visualization first");
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = capturedImage.image;

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const yearText = capturedImage.year === "all" ? "2016-2024" : capturedImage.year;
      const filename = `nyc-fire-data-${yearText}-${capturedImage.borough}-${timestamp}.png`;

      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success("Download started!");
    } catch (err) {
      console.error("Failed to download:", err);
      message.error("Failed to download image");
    }
  };

  const filterDataByYear = (data, year) => {
    if (year === "all") return data;
    return data.filter((incident) => incident.case_year === year.toString());
  };

  const getIncidentCounts = (filterKey, filterValue = null, year = "all") => {
    let filteredData = filterDataByYear(fireData, year);
    if (filterValue) {
      filteredData = filteredData.filter(
        (incident) => incident.borough === filterValue
      );
    }
    return filteredData.reduce((acc, incident) => {
      const key = incident[filterKey] || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  };

  const getTopFireCauses = (filterValue = null, year = "all") => {
    const causeCounts = getIncidentCounts(
      "cause_fire_description",
      filterValue,
      year
    );

    return Object.entries(causeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  };

  const getBoroughs = () => {
    return [...new Set(fireData.map((incident) => incident.borough))];
  };

  const getFireCausesChartOptions = (topCauses, title) => {
    const maxValue = Math.max(...Object.values(topCauses));
    const actualValues = Object.values(topCauses);
    const categories = Object.keys(topCauses);
    
    return {
      chart: {
        type: "bar",
        height: 400,
        toolbar: { show: false },
        background: 'transparent',
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "70%",
          endingShape: "rounded",
        },
      },
      dataLabels: { 
        enabled: false 
      },
      title: {
        text: title,
        align: "left",
        style: {
          fontSize: '16px',
          fontWeight: 600,
          color: '#1f2937',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }
      },
      xaxis: {
        categories: categories,
        title: {
          text: "Number of Fire Incidents",
          style: {
            color: '#64748b',
            fontSize: '12px',
            fontWeight: 500
          }
        },
        labels: {
          style: {
            colors: '#64748b',
            fontSize: '11px'
          }
        },
        axisBorder: {
          show: true,
          color: '#f1f5f9'
        },
        axisTicks: {
          show: true,
          color: '#f1f5f9'
        },
        max: maxValue * 1.1
      },
      yaxis: {
        title: {
          text: "Cause of Fire",
          style: {
            color: '#64748b',
            fontSize: '12px',
            fontWeight: 500
          }
        },
        labels: {
          style: {
            colors: '#475569',
            fontSize: '11px',
            fontWeight: 400
          }
        }
      },
      grid: {
        borderColor: '#f1f5f9',
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      colors: ['#3b82f6', '#e5e7eb'],
      tooltip: {
        theme: 'light',
        style: {
          fontSize: '12px'
        },
        y: {
          formatter: function(value, { seriesIndex }) {
            if (seriesIndex === 0) {
              return value + ' incidents';
            }
            return null;
          }
        }
      },
      legend: {
        show: false
      }
    };
  };

  const getYearRangeText = (year) => {
    return year === "all" ? "2016-2024" : year;
  };

  const topAllBoroughCauses = getTopFireCauses(null, selectedYear);
  const maxValue = Math.max(...Object.values(topAllBoroughCauses));
  
  const allBoroughChartOptions = getFireCausesChartOptions(
    topAllBoroughCauses,
    `Top 10 Causes of Fire (All Boroughs) in ${getYearRangeText(selectedYear)}`
  );
  
  // Create data for actual values and remaining portions
  const actualData = Object.values(topAllBoroughCauses);
  const remainingData = actualData.map(value => maxValue - value);
  
  const allBoroughChartSeries = [
    {
      name: "Fire Incidents",
      data: actualData,
    },
    {
      name: "Remaining",
      data: remainingData,
    }
  ];

  if (loading) {
    return (
      <PublicDataContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <Spin size="large" />
        </div>
      </PublicDataContainer>
    );
  }

  if (error) {
    return (
      <PublicDataContainer>
        <Alert message="Error" description={error} type="error" showIcon />
      </PublicDataContainer>
    );
  }

  return (
    <PublicDataContainer>
      <StyledCard>
        <div ref={contentRef}>
          <ControlsContainer>
            <Row justify="end" align="middle" style={{ marginBottom: '16px' }}>
              <Col>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <DownloadOutlined 
                    className="download-icon" 
                    onClick={handleDownload}
                    title="Download Image"
                    style={{ fontSize: '18px', cursor: 'pointer', color: '#64748b' }}
                  />
                  {capturing ? (
                    <LoadingOutlined style={{ fontSize: '18px', color: '#64748b' }} />
                  ) : (
                    <CameraOutlined 
                      className="camera-icon" 
                      onClick={handleCapture}
                      title="Capture Screenshot"
                      style={{ fontSize: '18px', cursor: 'pointer', color: '#64748b' }}
                    />
                  )}
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
                    Fire Incidents in New York City
                  </span>
                </div>
              </Col>
            </Row>
            
            <Row justify="end" align="middle" style={{ marginBottom: '24px' }}>
              <Col>
                <Select
                  value={selectedYear}
                  onChange={setSelectedYear}
                  placeholder="Select Year"
                  style={{ width: 200 }}
                  dropdownStyle={{ backgroundColor: '#374151' }}
                >
                  <Option value="all">All Years (2016-2024)</Option>
                  {years.map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </ControlsContainer>

          <MainTabsContainer>
            <div className="main-tabs">
              <div 
                className={`main-tab all-boroughs ${activeTab === 'all-boroughs' ? 'active' : ''}`}
                onClick={() => setActiveTab('all-boroughs')}
              >
                All Borough's Fire Causes
              </div>
              <div 
                className={`main-tab borough-specific ${activeTab === 'borough-specific' ? 'active' : ''}`}
                onClick={() => setActiveTab('borough-specific')}
              >
                Borough-Specific Fire Causes
              </div>
            </div>
          </MainTabsContainer>

          {activeTab === 'all-boroughs' && (
            <ChartContainer>
              <div className="chart-wrapper">
                <ApexCharts
                  options={allBoroughChartOptions}
                  series={allBoroughChartSeries}
                  type="bar"
                  height={400}
                />
              </div>
            </ChartContainer>
          )}

          {activeTab === 'borough-specific' && (
            <>
              <BoroughSelectContainer>
                <Select
                  placeholder="Select Borough"
                  onChange={(value) => setSelectedBorough(value)}
                  style={{ width: 200 }}
                >
                  {getBoroughs().map((borough) => (
                    <Option key={borough} value={borough}>
                      {borough}
                    </Option>
                  ))}
                </Select>
              </BoroughSelectContainer>
              {selectedBorough && (
                <ChartContainer>
                  <div className="chart-wrapper">
                    {(() => {
                      const boroughCauses = getTopFireCauses(selectedBorough, selectedYear);
                      const boroughMaxValue = Math.max(...Object.values(boroughCauses));
                      const boroughActualData = Object.values(boroughCauses);
                      const boroughRemainingData = boroughActualData.map(value => boroughMaxValue - value);
                      
                      return (
                        <ApexCharts
                          options={getFireCausesChartOptions(
                            boroughCauses,
                            `Top 10 Causes of Fire in ${selectedBorough} (${getYearRangeText(
                              selectedYear
                            )})`
                          )}
                          series={[
                            {
                              name: "Fire Incidents",
                              data: boroughActualData,
                            },
                            {
                              name: "Remaining",
                              data: boroughRemainingData,
                              color: 'white'
                            }
                          ]}
                          type="bar"
                          height={400}
                        />
                      );
                    })()}
                  </div>
                </ChartContainer>
              )}
            </>
          )}
        </div>
      </StyledCard>
    </PublicDataContainer>
  );
};

export default PublicData;