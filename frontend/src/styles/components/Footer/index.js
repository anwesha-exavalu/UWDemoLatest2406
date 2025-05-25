import styled from "styled-components";

export const PrivateFooterbox = styled.div`
  background-color: ${({ theme }) => (theme === 'dark' ? '#656566' : '#054f7d')};
  border-radius: 20px 20px 0px 0px;
  padding: 40px 0px 20px;
  color: #fff; /* Ensure all text is white by default */

  a, li, ul, p, span, div {
    color: #fff !important;
  }

  ul {
    list-style: none;
    padding-left: 0px;

    li {
      margin-bottom: 10px;
      padding: 0;

      a {
        width: 75%;
        display: block;
        font-size: 14px;
        padding: 5px 10px;
        font-weight: 500;
        line-height: 17.64px;
        color: #fff;
        text-decoration: none;

        b {
          font-weight: 700;
        }
      }

      &.active a,
      &:hover a {
        background: #fff;
        border-radius: 10px;
        color: #2e2e48 !important;
      }
    }
  }

  .copyright-text {
    text-align: center;
    color: #fff;
    display: block;
    padding: 35px 0px 0px;
  }
`;
