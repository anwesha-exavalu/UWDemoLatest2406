import styled from 'styled-components';

export const QuoteSummaryTableWrapper = styled.div`
  background: #fff;
  padding: 20px;
  margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
  }

  th,
  td {
    padding: 12px 16px;
    font-size: 14px;
    vertical-align: top;
    border: none;
  }

 

  tbody tr td:first-child {
    background-color: #F3F3F3;
    font-weight: 500;
    color: #2b66d2; /* blue label color */
    width: 20%;
    border-bottom: 4px solid white;
    border-right: 1px solid #ffffff; /* ✅ white separator */
    white-space: nowrap;
  }

  tbody tr td:nth-child(2) {
    background-color: white;
    color: #000;
    border-bottom: 1px solidrgb(247, 241, 241);
    

  }
`;
