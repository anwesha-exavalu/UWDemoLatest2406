import React, { useState } from "react";
import AccountInfoSublobs from "../SidebarComponents/AccountInfoSublobs";
import { Container } from "../styles/components/Layout";
import Sublob2 from "./Sublob2";
import cp from "../assets/img/cp-icon.png"
import gl from "../assets/img/gl-icon.png"
import pl from "../assets/img/pl-icon.png"

export function PolicyCards() {
  // State to keep track of the active policy
  const [activePolicy, setActivePolicy] = useState("Commercial Property");

  const policies = [
    {
      icon: cp,
      name: "Commercial Property",
      component: "CommercialPropertyComponent"
    },
    {
      icon: gl,
      name: "General Liability",
      component: "GeneralLiabilityComponent"
    },
    {
      icon: pl,
      name: "Professional Liability",
      component: "ProfessionalLiabilityComponent"
    },
  ];

  // Mock components for each policy type
  const renderPolicyComponent = () => {
    switch (activePolicy) {
      case "Commercial Property":
        return (
          <Sublob2 />
        );
      case "General Liability":
        return (
          <div className="policy-content">
            <h3>General Liability Insurance</h3>

          </div>
        );
      case "Professional Liability":
        return (
          <div className="policy-content">
            <h3>Professional Liability Insurance</h3>

          </div>
        );
      default:
        return <div>Select a policy to view details</div>;
    }
  };

  return (
    <Container>
      <div style={{ maxWidth: '1260px', marginLeft: '12px' }}>
        {/* Account Header - Separate Div */}
        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "10px 15px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
          color: "#666",
          marginBottom: "25px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <div>
            <strong>Account Name:</strong> Skyline Property Inc.
          </div>
          <div>
            <strong>Account No:</strong> 123456789
          </div>
          <div>
            <strong>Organization Type:</strong> Property Management
          </div>
        </div>

        {/* Policy Tabs with Gaps */}
        <div style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px"
        }}>
          {policies.map((policy, index) => (
            <div
              key={index}
              onClick={() => setActivePolicy(policy.name)}
              style={{
                flex: 1,
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: activePolicy === policy.name ? "#E0E9FF" : "#fff",
                borderRadius: "12px",
                boxShadow: activePolicy === policy.name
                  ? "0 4px 12px rgba(24, 144, 255, 0.3)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                border: activePolicy === policy.name ? "2px solid #204FC2" : "2px solid #e8e8e8",
                transform: activePolicy === policy.name ? "translateY(-2px)" : "translateY(0)",
                height: "100px"
              }}
              onMouseEnter={(e) => {
                if (activePolicy !== policy.name) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "#1890ff";
                }
              }}
              onMouseLeave={(e) => {
                if (activePolicy !== policy.name) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#e8e8e8";
                }
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                fontWeight: "700",
                color: activePolicy === policy.name ? "#204FC2" : "#333",
                fontSize: "16px",
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                lineHeight: "1.4"
              }}>
                <img
                  src={policy.icon}
                  alt={policy.name}
                  title={policy.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain"
                  }}
                />
                {policy.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Policy Content */}
      <div style={{
        marginTop: "30px",


      }}>
        {renderPolicyComponent()}
      </div>

      <style jsx>{`
        .policy-content {
          max-width: 1300px;
        }
        
        .policy-content h3 {
          color: #1890ff;
          margin-bottom: 15px;
          font-size: 24px;
          font-weight: 600;
        }
        
        .policy-content p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 25px;
          font-size: 16px;
        }
        
        .policy-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }
        
        .detail-item {
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 6px;
          border-left: 4px solid #1890ff;
        }
        
        .detail-item strong {
          color: #333;
          display: block;
          margin-bottom: 5px;
        }
      `}</style>
    </Container>
  );
}

export default PolicyCards;