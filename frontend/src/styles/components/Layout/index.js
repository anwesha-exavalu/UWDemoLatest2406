import styled from 'styled-components'




export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`
export const Section = styled.div`
  width: 100%;
  display: flex;
`

export const MainSection = styled.div`


background-size: 100%;
    background-repeat: no-repeat;
    .ant-layout {
        background: transparent;
    }
`
export const Container = styled.div`
  max-width: 1400px;
  padding: 0px 15px;
  margin: 0 auto;
  ol.contentlist {
    li {
      font-weight: 600;
    }
  }
 .mt-negative {
    margin-top: -100px; 
  }

  &.mt-positive {
    margin-top: 20px; 
  }
  &.pb {
    padding-bottom: 20px;
  }
  .ta {
    text-align: right;
  }
  .gp{
    gap:30px 0px;
  }
`;

