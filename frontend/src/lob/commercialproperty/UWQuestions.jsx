import React, { useState } from "react";
import "./UWQuestions.css";
import { Col, Row, Button } from 'antd';
// import Documents from "../../layout/RightSidebar";
import ModalDesign from "../../layout/Modal";
import FormInput from "../../components/FormInput";
import DropdownSelect from "../../components/FormDropdown";

const uwquestionsData = [
  { question: "Is the applicant a subsidiary of another entity?", response: "no", comment: "The applicant operates independently and is not owned by another entity." },
  { question: "Does the applicant have any subsidiaries?", response: "yes", comment: "The applicant has subsidiaries, which may affect risk assessment." },
  { question: "Is a formal safety program in operation?", response: "no", comment: "There is no formal safety program in place to mitigate risks." },
  { question: "Any exposure to flammables, explosives, and chemicals?", response: "na", comment: "Not applicable; the applicant does not engage in activities involving flammables or explosives." },
  { question: "Any other insurance with this company?", response: "no", comment: "The applicant does not hold any additional policies with our company." },
  { question: "Any policy or coverage declined, canceled, or non-renewed during the prior 3 years?", response: "na", comment: "Not applicable; no relevant history of declined or canceled policies." },
  { question: "Any uncorrected fire code violations?", response: "yes", comment: "There are existing fire code violations that need to be addressed." },
  { question: "Has the applicant had a foreclosure, repossession, or bankruptcy during the last five years?", response: "no", comment: "The applicant has not faced any financial setbacks in the past five years." },
];

const UWQuestions = ({ onNext }) => {
  const [questions, setQuestions] = useState(uwquestionsData);
  const [notes, setNotes] = useState(" ");
  // const [uwnotes, setUWNotes] = useState("");


  // const handleResponseChange = (index, newResponse) => {
  //   const updatedQuestions = [...questions];
  //   updatedQuestions[index].response = newResponse;
  //   setQuestions(updatedQuestions);
  // };

  const handleCommentChange = (index, newComment) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].comment = newComment;
    setQuestions(updatedQuestions);
  };

  return (
    <Row>
      <Col span={24}>
        <div className="mainContainer" id="uw">
          {/* <div className="side-by-side-container"> */}
            <div className="uw-questions-section">
              <h2>UW Questions</h2>
              <table id="underwriting-Table">
                <thead>
                  <tr>
                    <th className="table-header" style={{ width: '40%' }}>Questions</th>
                    <th className="table-header" style={{ width: '15%' }}>Response</th>
                    <th className="table-header" style={{ width: '45%' }}>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((item, index) => (
                    <tr key={index}>
                      <td><b>{item.question}</b></td>
                      <td>
                        <DropdownSelect 
                        options={[{value:'yes',label:"Yes"},{value:'no',label:'No'},{value:'na',label:'Not Applicable'}]}
                        required={true}
                        value={item.response}
                        />
                        
                      </td>
                      <td>
                        <FormInput 
                          value={item.comment} 
                          onChange={(e) => handleCommentChange(index, e.target.value)} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            {/* </div> */}
          </div>

           {/* System Recommended Decision */}
          
          <div
            style={{
              fontSize:"21px",
              padding: '15px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              fontWeight: 620,
              borderRadius: '5px',
              backgroundColor: '#e6ffe6', // Light green background for highlight
              color: 'orange',
              
              
            }}
          >
           Risk Score - Medium
          </div>


         {/* Override Decision Section */}
          <div className="override-decision-container" style={{marginBottom:20}}>
            <h4>Notes</h4>
            <textarea 
              className="notes" 
              placeholder="" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="decision-container">
              <ModalDesign />
            </div>
          </div>
          <Row gutter={16}>
        <Col span={20}></Col>
        <Col span={4}>
          <div>
          <Button type="primary" onClick={onNext} style={{ width: "10rem", marginBottom: "1rem", marginTop: "1rem", marginRight: "3px",  backgroundColor: "blue" }}>
                      Next
                    </Button>
          </div>
        </Col>
      </Row>
        </div>
        
      </Col>
      {/* Uncomment and use if Documents component is needed in future */}
      {/* <Col span={4}>
        <Documents />
      </Col> */}
      
    </Row>
    
  );
};

export default UWQuestions;
