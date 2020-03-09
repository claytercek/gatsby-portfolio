import { css } from "@emotion/core";
import theme from "../components/theme";
import Shevy from 'shevyjs';

const shevy = new Shevy({
  baseFontSize: '1em',
  baseLineHeight: 1.6,
  baseFontScale: [3.157, 2.369, 1.777, 1.333, 1, 1],
  addMarginBottom: true,
  proximity: false,
  proximityFactor: 0.5
});

const baseFontSize = 1;
const lineHeight = 1.5;
const baseUnit = baseFontSize * lineHeight;

export const headerTextStyle = theme => css`
  ${'' /* margin-left: ${theme.pad * 2}px; */}

  display: flex;
  height: calc(64vh - ${theme.pad * 2}px);
  flex-direction:column;
  justify-content: flex-end;

`

export const bodyStyle = theme => css`
  font-weight: 400;
  font-size: 1rem;

  ${theme.mq.large} {
    font-size: 1.125rem;
  }

  > * {
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
  

  p, ul, table {
    max-width: 60ch;
  }


  ul {
    list-style-position: inside;
    padding-left: 0;
    list-style-type: none;
    li::before {
      content:"– "
    }
  }
  
`