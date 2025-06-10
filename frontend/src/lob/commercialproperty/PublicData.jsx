import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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
import { Container } from "../../styles/components/Layout";

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

  const getYearRangeText = (year) => {
    return year === "all" ? "2016-2024" : year;
  };

  // Progress Bar Style Component
  const ProgressBarChart = ({ data, title }) => {
    const maxValue = Math.max(...Object.values(data));

    const ProgressBarStyle = {
      width: '100%',
      height: '12px',
      backgroundColor: '#f3f4f6',
      borderRadius: '6px',
      overflow: 'hidden',
      marginBottom: '8px',
      position: 'relative'
    };

    const ProgressFillStyle = (percentage) => ({
      width: `${percentage}%`,
      height: '100%',
      backgroundColor: '#204FC2',
      borderRadius: '6px',
      transition: 'width 0.3s ease'
    });

    const UsageRowStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      fontSize: '14px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const UsageLabelStyle = {
      color: '#374151',
      fontWeight: '500',
      maxWidth: '60%',
      lineHeight: '1.4'
    };

    const UsageValueStyle = {
      color: '#6b7280',
      fontWeight: '600',
      fontSize: '13px'
    };

    const ChartWrapperStyle = {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb'
    };

    const TitleStyle = {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '24px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    return (
      <div style={ChartWrapperStyle}>
        <h3 style={TitleStyle}>{title}</h3>
        <div>
          {Object.entries(data).map(([cause, count], index) => {
            const percentage = (count / maxValue) * 100;
            return (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={UsageRowStyle}>
                  <div style={UsageLabelStyle}>
                    {cause.length > 50 ? `${cause.substring(0, 47)}...` : cause}
                  </div>
                  <div style={UsageValueStyle}>
                    {count} incidents
                  </div>
                </div>
                <div style={ProgressBarStyle}>
                  <div style={ProgressFillStyle(percentage)}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const topAllBoroughCauses = getTopFireCauses(null, selectedYear);

  if (loading) {
    return (
      <PublicDataContainer>
        <Row justify="center" align="middle" style={{ minHeight: '400px' }}>
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      </PublicDataContainer>
    );
  }

  if (error) {
    return (
      <PublicDataContainer>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            <Alert message="Error" description={error} type="error" showIcon />
          </Col>
        </Row>
      </PublicDataContainer>
    );
  }

  return (
    <Container>

      <div>
        <div ref={contentRef}>
          <ControlsContainer>
            <Row justify="space-between" align="middle" style={{ marginBottom: '16px', marginTop: '-60px' }} gutter={[16, 16]}>
              <Col xs={24} sm={12} md={16}>

              </Col>
              <Col xs={24} sm={12} md={8}>
                <Row justify="end" align="middle" gutter={12}>
                  <Col>
                    <DownloadOutlined
                      className="download-icon"
                      onClick={handleDownload}
                      title="Download Image"
                      style={{ fontSize: '18px', cursor: 'pointer', color: '#64748b' }}
                    />
                  </Col>
                  <Col>
                    {capturing ? (
                      <LoadingOutlined style={{ fontSize: '18px', color: '#64748b' }} />
                    ) : (
                      <CameraOutlined
                        className="camera-icon"
                        onClick={handleCapture}
                        title="Capture Screenshot"
                        style={{
                          fontSize: '18px',
                          cursor: 'pointer',
                          color: '#64748b',


                          borderRadius: '4px',
                          padding: '4px'
                        }}
                      />

                    )}
                  </Col>
                  <Col>
                    <span style={{
                      fontSize: '14px',
                     
                      color: '#1f2937',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      Fire Incidents in New York City
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row justify="end" align="middle" style={{ marginBottom: '24px' }}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Select
                  value={selectedYear}
                  onChange={setSelectedYear}
                  placeholder="Select Year"
                  style={{
                    width: '100%',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                  dropdownStyle={{
                    
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
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
            <Row>
              <Col xs={24}>
                <div className="main-tabs" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  <div
                    className={`main-tab all-boroughs ${activeTab === 'all-boroughs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all-boroughs')}
                    style={{ fontSize: '14px' }}
                  >
                    All Borough's Fire Causes
                  </div>
                  <div
                    className={`main-tab borough-specific ${activeTab === 'borough-specific' ? 'active' : ''}`}
                    onClick={() => setActiveTab('borough-specific')}
                    style={{ fontSize: '14px' }}
                  >
                    Borough-Specific Fire Causes
                  </div>
                </div>
              </Col>
            </Row>
          </MainTabsContainer>

          {activeTab === 'all-boroughs' && (
            <ChartContainer>
              <Row>
                <Col xs={24}>
                  <ProgressBarChart
                    data={topAllBoroughCauses}
                    title={`Top 10 Causes of Fire (All Boroughs) in ${getYearRangeText(selectedYear)}`}
                  />
                </Col>
              </Row>
            </ChartContainer>
          )}

          {activeTab === 'borough-specific' && (
            <>
              <BoroughSelectContainer>
                <Row justify="start">
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Select
                      placeholder="Select Borough"
                      onChange={(value) => setSelectedBorough(value)}
                      style={{
                        width: '100%',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '14px'
                      }}
                    >
                      {getBoroughs().map((borough) => (
                        <Option key={borough} value={borough}>
                          {borough}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </BoroughSelectContainer>
              {selectedBorough && (
                <ChartContainer>
                  <Row>
                    <Col xs={24}>
                      <ProgressBarChart
                        data={getTopFireCauses(selectedBorough, selectedYear)}
                        title={`Top 10 Causes of Fire in ${selectedBorough} (${getYearRangeText(selectedYear)})`}
                      />
                    </Col>
                  </Row>
                </ChartContainer>
              )}
            </>
          )}
        </div>
      </div>

    </Container>
  );
};

export default PublicData;