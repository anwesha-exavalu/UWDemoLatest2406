import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Typography, Progress, Spin, message } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const { Title, Text } = Typography;

const PriorityPopup = ({ priority, record }) => {
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const response = await axios.post('http://54.227.115.34:5000/predict',
          {
            "Location": record?.Location || "Suburban",
            "Building Type": record?.Building_Type || "Office Building",
            "Construction Type": record?.Construction_Type || "Wood",
            "Security Measures": record?.Security_Measures || 1,
            "Policy Deductible": record?.Policy_Deductible || 10000,
            "Policy Tenure": record?.Policy_Tenure || 5,
            "Flood Risk": record?.Flood_Risk || 85,
            "Earthquake Risk": record?.Earthquake_Risk || 78,
            "Wildfire Risk": record?.Wildfire_Risk || 70,
            "Building Age": record?.Building_Age || 90,
            "Sprinkler Coverage": record?.Sprinkler_Coverage || 0,
            "Room Count": record?.Room_Count || 25,
            "Square Footage": record?.Square_Footage || 70000
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        );
        setPredictionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prediction data:', error);
        message.error('Failed to fetch prediction data');
        setLoading(false);
      }
    };

    fetchPredictionData();
  }, [record]);

  const topPredictorsData = predictionData?.["Top SHAP Values"]?.map(([predictor, impact, value]) => ({
    predictor,
    impact: Math.abs(impact) * 100,
    value,
    displayValue: `${(Math.abs(impact) * 100).toFixed(1)}%`
  })) || [];

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  if (loading) {
    return (
      <Card style={{ width: 480, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </Card>
    );
  }

  return (
    <Card
      style={{
        width: 480,
        background: '#f0f2f5',
        border: 'none',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }}
      styles={{ body: { padding: '8px' } }}
      onClick={handleClick}
      onMouseDown={handleClick}
    >
      <Row gutter={[8, 8]} style={{ width: '100%' }}>
        <Col span={24} style={{ marginBottom: '8px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 12px'
          }}>
            <Text style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a365d'
            }}>
              Skyline Property Inc.
            </Text>
            <Text type="secondary" style={{
              fontSize: '12px',
              color: '#4b5563'
            }}>
              Commercial Property
            </Text>
          </div>
        </Col>

        <Col span={12}>
          <Card
            styles={{
              body: {
                padding: '12px',
                height: '100%',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)'
              }
            }}
          >
            <Title level={4} style={{ margin: 0, fontSize: '16px', color: '#1a365d' }}>
              Claim Propensity
            </Title>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {predictionData?.Predicted_Probability?.toFixed(2)}
            </Text>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            styles={{
              body: {
                padding: '12px',
                height: '100%',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }}
          >
            <Title level={3} style={{ 
              color: 
                predictionData?.["Predicted Class"] === 'High' ? '#dc2626' :
                predictionData?.["Predicted Class"] === 'Medium' ? '#d4b106' :
                '#389e0d', 
              margin: 0, 
              textAlign: 'center', 
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Risk: {predictionData?.["Predicted Class"]}
            </Title>
          </Card>
        </Col>

        <Col span={24}>
          <Card
            title={<span style={{ fontSize: '16px', fontWeight: '600', color: '#1a365d' }}>Top Reasons</span>}
            styles={{
              body: { padding: '12px' },
              header: { minHeight: '48px', padding: '12px 16px' }
            }}
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)'
            }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={topPredictorsData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                style={{display:"flex",allignitems:"center",justifyContent:"center"}}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: '#4b5563' }}
                />
                <YAxis
                  dataKey="predictor"
                  type="category"
                  tick={{ fontSize: 12, fill: '#4b5563' }}
                  width={110}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(147, 197, 253, 0.1)' }}
                  contentStyle={{
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Bar dataKey="impact" fill="#f59e0b" radius={[0, 4, 4, 0]}>
                  <LabelList 
                    dataKey="displayValue" 
                    position="right"
                    style={{ 
                      fontSize: '12px',
                      fill: '#4b5563',
                      fontWeight: '500'
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={24}>
          <Card
            styles={{
              body: { padding: '12px' }
            }}
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)'
            }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Title level={4} style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1a365d'
                }}>
                  Model Metrics
                </Title>
              </Col>
              <Col span={24}>
                <Text style={{ fontSize: '12px', color: '#4b5563', display: 'block' }}>Accuracy</Text>
                <Progress
                  percent={predictionData?.["Model Accuracy"] * 100}
                  status="active"
                  strokeColor="#0369a1"
                  trailColor="#e5e7eb"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default PriorityPopup;