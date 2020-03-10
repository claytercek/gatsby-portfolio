import { css } from "@emotion/core";
import theme from "../components/theme";
import Shevy from 'shevyjs';

const shevy = new Shevy({
  baseFontSize: '1.125rem',
  baseLineHeight: 1.6,
  baseFontScale: [3.157, 2.369, 1.777, 1.333, 1, 1],
  addMarginBottom: true,
  proximity: false,
  proximityFactor: 0.5
});

export const headerTextStyle = theme => css`
  display: flex;
  min-height: calc(50vh - ${theme.pad * 2}px);
  flex-direction:column;
  justify-content: flex-end;
  font-size: 3.5rem;
  line-height: 1;
  margin-bottom: ${shevy.baseSpacing(1.5)};
  
  ${theme.mq.medium} {
    font-size: 5rem;
  }
`

export const bodyStyle = theme => css`
  font-weight: 400;
  font-size: 1rem;

  ${theme.mq.large} {
    font-size: 1.125rem;
  }

  > * {
    margin-left: auto;
    margin-right: auto;
    display: block;
    padding: 0;
    margin-top: 0;
    font-size: ${shevy.content.fontSize};
    line-height: ${shevy.content.lineHeight};
    margin-bottom: ${shevy.content.marginBottom};
  }

  > h3 {
    font-size: ${shevy.h3.fontSize};
    line-height: ${shevy.h3.lineHeight};
    margin-bottom: ${shevy.h3.marginBottom};
  }

  > h4 {
    font-size: ${shevy.h4.fontSize};
    line-height: ${shevy.h4.lineHeight};
    margin-bottom: ${shevy.h4.marginBottom};
  }
  

  p:not(.imageWrapper), ul, table, h3, h4 {
    max-width: 45rem;

    + .imageWrapper {
      margin-top: ${shevy.baseSpacing(1.5)};
    }
  }

  .imageWrapper {
    margin-bottom: ${shevy.baseSpacing(1)};

    + p:not(.imageWrapper), + ul, + table, + h3, + h4 {
      margin-top: ${shevy.baseSpacing(1.5)};
    }
    
    > * {
      margin-bottom: ${theme.pad * 1.5}px;
    }
  
    ${theme.mq.medium} {
      display: flex;
      margin-bottom: ${theme.pad}px;
      justify-content: center;
      
      > * {
        margin-bottom: 0;
        margin-left: 0 !important;
        margin-right: 0 !important;

        &:not(:first-child) {
          margin-left: ${theme.pad}px !important;
        }
      }
    }

  }


  ul {
    list-style-position: inside;
    padding-left: 0;
    list-style-type: none;
    li::before {
      content:"– "
    }
  }

  hr {
    margin-top: ${shevy.baseSpacing(3)};
    border:  none;
  }
  
`