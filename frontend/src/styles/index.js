import styled from "styled-components";
import { Collapse, Table } from 'antd';

export const FormDatePickerBox = styled.div`
  label::after {
    visibility: hidden;
  }
  label {
    height: auto !important;
    padding: 0px 6px;
    white-space: normal;
    text-align: left;
  }

  .ant-picker-outlined {
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
    font-family: "Inter", sans-serif;
    padding: 12px 6px;
    font-size: 14px;
    width: 100%;
    border: none;
    background: ${({ theme }) => (theme === 'dark' ? '#5A5A5A !important' : 'white')};
    color:${({ theme }) => (theme === 'dark' ? '#FFFFFF' : 'black')};
  }
  label {
    height: auto !important;
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
`;

export const RadioBtnBox = styled.div`
  label::after {
    visibility: hidden;
  }
  .ant-radio-group {
    label {
      padding: 0px !important;
    }
  }
  .ant-radio-group {
    display: flex;
  }
  label {
    height: auto !important;
    width: 225px;
    padding: 0px 6px;
    display: flex;
    align-items: center;
    white-space: normal;
    text-align: left;
    height: auto !important;
  }
  .ant-form-item-control-input {
    padding: 12px 6px;
  }

  label {
    height: auto !important;
    font-size: 13px !important;
    font-weight: 400;
    line-height: 19.5px;
    color: #adacb0;
    font-family: "Inter", sans-serif;
  }
`;

export const FormInputFeild = styled.div`
  label::after {
    visibility: hidden;
  }
  label {
    height: auto !important;
    white-space: normal;
    text-align: left;
    padding: 0px 6px;
  }

  input {
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
    font-family: "Inter", sans-serif;
    padding: 12px 6px;
    font-size: 14px;
    border: none;
    background: ${({ theme }) => (theme === 'dark' ? '#5A5A5A !important' : 'white')};
    color:${({ theme }) => (theme === 'dark' ? '#FFFFFF' : 'black')};
  }
  .ant-input-disabled {
    box-shadow: none;
    background: no-repeat;
    color: #000;
  }
  label {
    height: auto !important;
    min-width: 80px;
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
  .suffix{
  margin-left:10px;
  cursor:pointer;
  }
`;

export const FormSelect = styled.div`
  label::after {
    visibility: hidden;
  }
  .ant-select-selector {
    display: block;
    padding: 12px 4px !important;
    border: none;
    background: ${({ theme }) => (theme === 'dark' ? '#5A5A5A !important' : 'white')};
    color:${({ theme }) => (theme === 'dark' ? '#FFFFFF' : 'black')};
  }
  .ant-select-selector {
    display: block;
  }
.ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
}
  .ant-select-selector:after,
  .ant-select-selection-search,
  .ant-select-selection-item,
  .ant-select-selection-placeholder,
  .ant-select-selection-item {
    line-height: normal !important;
  }
  .ant-form-item-control-input {
    min-height: auto !important;
  }

  .ant-select {
    display: ruby;
  }
  .ant-select-selector {
    height: auto;
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
  }
  label {
    height: auto !important;
    height: auto !important;
    padding: 0px 6px;
    white-space: normal;
    text-align: left;
  }
  .ant-select {
    font-family: "Inter", sans-serif;
    border: none;
    font-size: 14px;
    border-radius: 8px;
    background: ${({ theme }) => (theme === 'dark' ? '#5A5A5A !important' : 'white')};
    color:${({ theme }) => (theme === 'dark' ? '#FFFFFF' : 'black')};
  }
  label {
    height: auto !important;
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
`;
export const FormphonenumberFeild = styled.div`
  label::after {
    visibility: hidden;
  }
  label {
    height: auto !important;
    white-space: normal;
    text-align: left;
    padding: 0px 6px;
  }

  input {
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
    font-family: "Inter", sans-serif;
    padding: 12px 6px;
    font-size: 14px;
    border: none;
    background: ${({ theme }) => (theme === 'dark' ? '#5A5A5A !important' : 'white')};
    color:${({ theme }) => (theme === 'dark' ? '#FFFFFF' : 'black')};
  }
  .ant-input-disabled {
    box-shadow: none;
    background: no-repeat;
    color: #000;
  }
  label {
    height: auto !important;
    min-width: 80px;
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
`;
export const FormCheckBoxStyled = styled.div`
  width: 100%;
  .ant-form-item {
    width: 100%;
  }
  .ant-checkbox-group {
    width: 100%;
    label {
      width: 40%;
    }
  }
  .ant-checkbox-disabled .ant-checkbox-inner:after {
    border-color: white;
  }
  .ant-checkbox-checked.ant-checkbox-disabled > .ant-checkbox-inner {
    background: #1677ff;
    border-color: #1677ff;
  }
`;
export const StyledCollapse = styled(Collapse)`
  border-radius: 8px;
  overflow: hidden;
  .ant-collapse-header {
    background-color:#054F7D;
    color: white !important;
    font-weight: 600;
    font-size: 16px;
    padding: 12px 16px !important;
  }

  .ant-collapse-content-box {
    background-color: #f9f9f9;
    padding: 16px;
  }

  .ant-table {
    border-radius: 4px;
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    background: #f3f4f6;
    font-weight: 600;
    font-size: 14px;
    color: #555;
  }

  .ant-table-tbody > tr > td {
    font-size: 14px;
    vertical-align: middle;
  }

  .ant-table-cell {
    padding: 12px;
  }
`;

export const StyledLocationText = styled.div`
  color: #1e4bd1;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 12px;
`;


export const RoundedAddButton = styled.button`
  background-color: #1E4BD1;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 0 16px;
  height: 36px;
  width: 151.5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 500;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #204FC2;
  }

  .icon {
    font-size: 16px;
    line-height: 1;
  }
`;

export const RightAlignedContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;



export const StyledDropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;

  span {
    font-size: 16px;
    margin-right: 12px;
    color: #333;
    font-weight: 500;
  }

  .ant-select {
    width: 250px;
    height: 50px;
  }

  .ant-select-selector {
    background-color: #403F3F !important;
    color: white !important;
    height: 50px !important;
    display: flex;
    align-items: center;
    font-size: 16px;
    border: none !important;
    box-shadow: none !important;
  }

  .ant-select-selection-item,
  .ant-select-selection-placeholder {
    color: white !important;
    font-size: 16px;
  }

  .ant-select-arrow {
    color: white !important;
  }
`;

export const NotesWrapper = styled.div`
  background-color: #FFFFFF;
  margin: 28px;
  border-radius: 10px;
  border: 2px solid #E8E8E8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-left: 0px;
  margin-right: 0px;

  textarea.ant-input {
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    border: 1px solid #e0e0e0;
  }
`;

export const NotesHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  .icon {
    background: #e8f0fe;
    border-radius: 6px;
    padding: 4px;
    font-size: 18px;
    color: #1a73e8;
  }

  .title {
    font-weight: 600;
    font-size: 20px;
    color: black;
    
  }
`;



export const NotesSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 20px 0;

  .notes-box {
    flex: 1;
    margin-right: 20px;

    textarea {
      border-radius: 8px;
      font-size: 14px;
    }
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
      width: 100px;
      height: 36px;
      border-radius: 6px;
      border: 1px solid #ccc;
      background: white;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;

export const ScreenHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 40px;
  margin: 20px 0;

  .icon-wrapper {
    background-color: #edf4ff;
    border-radius: 8px;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;

    .icon {
      width: 34px;
      height: 34px;
      color: #1890ff;
    }
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    color: #1c1c1c;
    margin: 0;
  }

  @media (max-width: 767px) {
    .icon-wrapper {
      width: 28px;
      height: 28px;
      padding: 4px;
    }

    .icon {
      width: 18px;
      height: 18px;
    }

    h3 {
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    gap: 6px;

    h3 {
      font-size: 14px;
    }
  }
`;

