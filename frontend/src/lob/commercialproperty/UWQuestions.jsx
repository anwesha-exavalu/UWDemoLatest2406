import React, { useState, useEffect } from "react";
import "./UWQuestions.css";
import { Input, Col, Row, Button, Popover, Spin } from "antd";
// import Documents from "../../layout/RightSidebar";
import ModalDesign from "../../layout/Modal";
import FormInput from "../../components/FormInput";
import DropdownSelect from "../../components/FormDropdown";
import PriorityPopup from "../../SidebarComponents/PriorityPopup";
import { UWQuestionsContainer } from "../../styles/pages/UWQuestions";
import { Container } from "../../styles/components/Layout";
import { FileTextOutlined } from '@ant-design/icons';
import {
  MainContainer,
} from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import {
  WorkSection,
} from '../../styles/pages/Dashboard/MyDashboardStyle';
import { NotesHeader } from "../../styles/index";
import {
  NextButtonContainer,
  NextButton,
} from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import NextArrow from "../../assets/img/nextArrow.png";
import { ScreenHeader } from '../../styles';
import Uwicon from "../../assets/img/Uwicon.png"

const PRODUCTIONURL = process.env.REACT_APP_PROD_URL;
const uwquestionsData = [
  {
    question: "Is the applicant a subsidiary of another entity?",
    response: "no",
    comment:
      "The applicant operates independently and is not owned by another entity.",
  },
  {
    question: "Does the applicant have any subsidiaries?",
    response: "yes",
    comment:
      "The applicant has subsidiaries, which may affect risk assessment.",
  },
  {
    question: "Is a formal safety program in operation?",
    response: "no",
    comment: "There is no formal safety program in place to mitigate risks.",
  },
  {
    question: "Any exposure to flammables, explosives, and chemicals?",
    response: "no",
    comment:
      "Not applicable; the applicant does not engage in activities involving flammables or explosives.",
  },
  {
    question: "Any other insurance with this company?",
    response: "no",
    comment:
      "The applicant does not hold any additional policies with our company.",
  },
  {
    question:
      "Any policy or coverage declined, canceled, or non-renewed during the prior 3 years?",
    response: "no",
    comment:
      "can't be determined; no relevant history of declined or canceled policies.",
  },
  {
    question: "Any uncorrected fire code violations?",
    response: "yes",
    comment:
      "There are existing fire code violations that need to be addressed.",
  },
  {
    question:
      "Has the applicant had a foreclosure, repossession, or bankruptcy during the last five years?",
    response: "no",
    comment:
      "The applicant has not faced any financial setbacks in the past five years.",
  },
];

const UWQuestions = ({
 onNext,
  isLoading,
  setIsLoading,
  dynamicQuestions,
  setDynamicQuestions,
  hasGenerated,
  setHasGenerated,
  questionLoading,
  setQuestionLoading,
  answerLoading,
  setAnswerLoading
}) => {
  const [questions, setQuestions] = React.useState(uwquestionsData);



  // Font styles
  const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const normalTextStyle = {
    fontSize: '14px',
    fontFamily: fontFamily
  };
  const headerTextStyle = {
    fontSize: '22px',
    fontFamily: fontFamily
  };

  // New function to handle Generate button click
  const handleGenerateQuestions = () => {
    setQuestionLoading(true);
    fetch(`${PRODUCTIONURL}/api/uw_questions`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((q) => ({
          Question: q,
          Response: "",
          Comment: "",
        }));
        setDynamicQuestions(formatted);
        setHasGenerated(true);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setDynamicQuestions([]);
        setHasGenerated(true);
      })
      .finally(() => {
        setQuestionLoading(false);
      });
  };

  const handleGenerateAnswers = () => {
    setAnswerLoading(true);
    const questionOnlyList = dynamicQuestions.map((q) => q.Question);

    fetch(`${PRODUCTIONURL}/api/uw_answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionOnlyList),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDynamicQuestions(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching answers:", err);
      })
      .finally(() => {
        setAnswerLoading(false);
      });
  };


  const handleCommentChange = (index, newComment) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].comment = newComment;
    setQuestions(updatedQuestions);
  };

  const handleDynamicCommentChange = (index, newComment) => {
    const updatedDynamicQuestions = [...dynamicQuestions];
    updatedDynamicQuestions[index].Comment = newComment;
    setDynamicQuestions(updatedDynamicQuestions);
  };
  const handleResponseChange = (index, value) => {
  const updatedQuestions = [...questions];
  updatedQuestions[index].response = value;
  setQuestions(updatedQuestions);
};


  const record = {
    client: "Kew Gardens Property",
    lob: "Commercial Property"
  };

  return (
    <Container>
      <MainContainer>
        <Row>
          <Col span={24}>
            <div id="uw">
              <UWQuestionsContainer>
                <Row align="middle" style={{ marginBottom: '16px' }}>
                  <Col>
                    <ScreenHeader>
                      <div className="icon-wrapper">
                        <img src={Uwicon} alt="UW Icon" className="icon" />
                      </div>
                      <h3 style={headerTextStyle}>UW Questions</h3>
                    </ScreenHeader>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <table id="underwriting-Table" style={normalTextStyle}>
                      <thead>
                        <tr>
                          <th style={{ width: "40%", ...normalTextStyle }}>Questions</th>
                          <th style={{ width: "15%", ...normalTextStyle }}>Response</th>
                          <th style={{ width: "45%", ...normalTextStyle }}>Comment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions.map((item, index) => (
                          <tr key={index}>
                            <td><b style={normalTextStyle}>{item.question}</b></td>
                            <td>
                              <DropdownSelect
                                options={[
                                  { value: "yes", label: "Yes" },
                                  { value: "no", label: "No" },
                                  { value: "na", label: "can't be determined" },
                                ]}
                                required={true}
                                value={item.response}
                                onChange={(value) => handleResponseChange(index, value)}
                              />
                            </td>
                            <td>
                              <FormInput
                                value={item.comment}
                                onChange={(e) => handleCommentChange(index, e.target.value)}
                                style={normalTextStyle}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </UWQuestionsContainer>

              {/* Dynamic Section with Generate Button */}
              <UWQuestionsContainer>
                <Row justify="space-between" align="middle" style={{ marginBottom: "16px" }}>
                  <Col>
                    <h2 style={headerTextStyle}>UW Questions(AI)</h2>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      onClick={handleGenerateQuestions}
                      loading={questionLoading}
                      disabled={questionLoading || answerLoading}  // disable when either is loading
                      style={{
                        backgroundColor: "#054F7D",
                        borderColor: "#054F7D",
                        color:"white",
                        fontWeight: "600",
                        height: "36px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        width: "auto",
                        ...normalTextStyle
                      }}
                    >
                      {questionLoading ? "Generating Question..." : "Generate Question"}
                    </Button>

                    {hasGenerated && (
                      <Button
                        type="default"
                        onClick={handleGenerateAnswers}
                        loading={answerLoading}
                        disabled={answerLoading}
                        style={{
                          marginLeft: "12px",
                          backgroundColor: "#2E8B57",
                          color: "white",
                          borderColor: "#2E8B57",
                          fontWeight: "600",
                          height: "36px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          width: "auto",
                          ...normalTextStyle
                        }}
                      >
                        {answerLoading ? "Generating Answers..." : "Generate Answers"}
                      </Button>
                    )}
                  </Col>
                </Row>

                {/* Loading State */}
                {/* {isLoading && (
                  <Row>
                    <Col span={24}>
                      <div style={{
                        textAlign: "center",
                        padding: "40px 0",
                        backgroundColor: "#fafafa",
                        borderRadius: "8px",
                        border: "1px solid #e1e1e1"
                      }}>
                        <Spin size="large" />
                        <div style={{ marginTop: "16px", ...normalTextStyle, color: "#666" }}>
                          Dynamic responses are loading...
                        </div>
                      </div>
                    </Col>
                  </Row>
                )} */}

                {/* Dynamic Questions Table */}
                {questionLoading ? (
                  <Row>
                    <Col span={24}>
                       <div style={{
                        textAlign: "center",
                        padding: "40px 0",
                        backgroundColor: "#fafafa",
                        borderRadius: "8px",
                        border: "1px solid #e1e1e1"
                      }}>
                        <Spin size="large" />
                        <div style={{ marginTop: "16px", color: "#666", ...normalTextStyle }}>
                          Fetching questions...
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : hasGenerated && (
                  <Row>
                    <Col span={24}>
                      <table id="underwriting-Table" style={normalTextStyle}>
                        <thead>
                          <tr>
                            <th style={{ width: "40%" }}>Questions</th>
                            <th style={{ width: "15%" }}>Response</th>
                            <th style={{ width: "45%" }}>Comment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicQuestions.length > 0 ? (
                            dynamicQuestions.map((item, index) => (
                              <tr key={index}>
                                <td><b style={normalTextStyle}>{item.Question}</b></td>
                                <td>
                                  <DropdownSelect
                                    options={[
                                      { value: "yes", label: "Yes" },
                                      { value: "no", label: "No" },
                                      { value: "na", label: "can't be determined" },
                                    ]}
                                    required={true}
                                    value={item.Response?.toLowerCase()}
                                  />
                                </td>
                                <td>
                                  <FormInput
                                    value={item.Comment || ""}
                                    onChange={(e) => handleDynamicCommentChange(index, e.target.value)}
                                    style={normalTextStyle}
                                  />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" style={{ textAlign: "center", color: "#666", padding: "20px" }}>
                                No questions available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                )}


                {/* Placeholder message */}
                {!questionLoading && !hasGenerated && (
                  <Row>
                    <Col span={24}>
                      <div style={{
                        textAlign: "center",
                        padding: "40px 0",
                        backgroundColor: "#fafafa",
                        borderRadius: "8px",
                        border: "1px solid #e1e1e1",
                        color: "#666",
                        ...normalTextStyle
                      }}>
                        Click "Generate Question" to load AI-generated questions
                      </div>
                    </Col>
                  </Row>
                )}
              </UWQuestionsContainer>

              {/* Notes Section */}
              <Row style={{ marginBottom: '16px' }}>
                <Col span={24}>
                  <NotesHeader style={{ marginBottom: '1px', marginLeft: '20px' }}>
                    <FileTextOutlined className="icon" />
                    <span className="title" style={headerTextStyle}>Notes</span>
                  </NotesHeader>
                </Col>
              </Row>

              <Row gutter={16} align="top" style={{ marginBottom: "20px" }}>
                {/* Notes TextArea */}
                <Col flex="auto">
                  <WorkSection>
                    <Input.TextArea
                      placeholder="Enter notes here"
                      rows={4}
                      style={{
                        borderRadius: "8px",
                        height: "120px",
                        ...normalTextStyle
                      }}
                    />
                  </WorkSection>
                </Col>

                {/* Buttons from ModalDesign */}
                <Col flex="none">
                  <div style={{ marginTop: "30px" }}>
                    <ModalDesign />
                  </div>
                </Col>
              </Row>

              {/* Claim Propensity Section */}
              <Row style={{ marginBottom: 20 }}>
                <Col span={24}>
                  <h5 style={{ marginTop: "20px", marginLeft: '20px', ...headerTextStyle }}>
                    Claim Propensity
                  </h5>
                  <div
                    style={{
                      padding: '16px',
                      border: '1px solid #e1e1e1',
                      borderRadius: '12px',
                      display: 'block',
                      width: '98%',
                      backgroundColor: 'white',
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                      transition: 'box-shadow 0.2s ease-in-out',
                      marginBottom: '20px',
                      marginLeft: '20px'
                    }}
                  >
                    <Popover
                      content={<PriorityPopup predictionData="Medium" record={record} />}
                      trigger="click"
                      placement="topLeft"
                      overlayStyle={{ width: 500 }}
                    >
                      <Button
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: "150px",
                          height: "40px",
                          padding: "5px 20px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          fontWeight: "600",
                          borderRadius: "4px",
                          color: "white",
                          backgroundColor: "#FAAF25",
                          border: "none",
                          cursor: "pointer",
                          lineHeight: "1.5",
                          display: "inline-block",
                          textAlign: "center",
                          ...normalTextStyle
                        }}
                      >
                        Risk - Medium
                      </Button>
                    </Popover>
                  </div>
                </Col>
              </Row>

              {/* Next Button */}
              <Row gutter={16} justify="end">
                <Col>
                  <NextButtonContainer>
                    <NextButton onClick={onNext} style={normalTextStyle}>
                      <div className="step-content-box">
                        {"Next "}
                        <img
                          src={NextArrow}
                          alt="Exavalu"
                          title="Exavalu"
                          className="logobox"
                        />
                      </div>
                    </NextButton>
                  </NextButtonContainer>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </MainContainer>
    </Container>
  );
};

export default UWQuestions;