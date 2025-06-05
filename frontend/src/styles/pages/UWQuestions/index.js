import styled from "styled-components";

export const UWQuestionsContainer = styled.div`
  background: #fff;
  padding: 20px;
  margin-top: 20px;

  h2 {
    margin: 0 0 20px;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
  }

  thead tr {
    background-color: #004b87;
    color: white;
  }

  th,
  td {
    padding: 12px;
    text-align: left;
    font-size: 14px;
    vertical-align: top;
  }

  th {
    font-weight: 600;
  }

  tbody tr {
    border-bottom: 1px solid #e0e0e0;
  }

  tbody tr td:first-child {
    background-color: #f5f5f5;
    font-weight: 500;
    color: #004b87;
    width: 40%;
  }

  tbody tr td:nth-child(2),
  tbody tr td:nth-child(3) {
    background-color: white;
  }

  input,
  textarea,
  .ant-select-selector {
    border-radius: 6px !important;
    font-size: 14px;
  }
`;