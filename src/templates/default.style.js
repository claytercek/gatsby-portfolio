import { css } from "@emotion/core"

export const headerTextStyle = theme => css`
  ${'' /* margin-left: ${theme.pad * 2}px; */}

  display: flex;
  height: calc(64vh - ${theme.pad * 2}px);
  flex-direction:column;
  justify-content: flex-end;

  padding-bottom: 40px;
  padding-right: 15%;
  margin-bottom: 0;

  h2 {
    margin: 0;
    font-size: 3rem;
    text-transform: uppercase;
    line-height: 1;
    text-shadow: 6px 6px ${theme.colors.accent};
  }

  ${theme.mq.small} {
    h2 {
    font-size: 3.8rem;
    }

    h3 {
      font-size: 1.6rem;
    }
  }

  ${theme.mq.medium} {
    margin-left: 5vw;
    padding-bottom: 0px;

    h2 {
    font-size: 6rem;
    }

    h3 {
      font-size: 1.8rem;
    }
  }

`

export const bodyStyle = theme => css`
  line-height: 1.6;
  font-size: 1.1rem;
  font-weight: 400;
  padding-bottom: ${theme.space * 2}px;

  > * {
    margin-bottom: 0;
  }

  p, ul, table {
    max-width: 60ch;
    margin-top: ${theme.space}px;
  }

  th {
    font-weight: 400;
    text-align: left;
    display: block;
    opacity: 0.5;
    margin-top: ${theme.pad / 2}px;
    &::after {
      content: ':';
    }
  }

  td {
    font-weight: 400;
    display: block;
  }

  ${theme.mq.small} {
    th, td {
      display: table-cell;
    }

    th {
      padding-right: ${theme.pad * 2}px;
    }
  }

  p a {
    position: relative;
    display: inline-block;

    ::before {
      content:"";
      position: absolute;
      z-index: -1;
      height: 50%;
      width:100%;
      left:4px;
      bottom: 0rem;
      background: ${theme.colors.accent};
      transition: all ${theme.bezier} 0.2s;
    }

    &:hover::before {
      height: 5px;
    }
  }

  .linksOnly {
    a {
      margin-right: ${theme.pad}px;
      padding: ${theme.pad / 2}px ${theme.pad}px;
      overflow: hidden;
      transition: color 0.3s ${theme.bezier};

      &::before {
        height: 100%;
      }
    }
  }

  .imageWrapper {
    > *:not(:last-child) {
      margin-bottom: ${theme.space * 1.5}px;
    }

    ${theme.mq.medium} {
      display: flex;
      max-width: unset;
      margin-left: 0 !important;

      > *:not(:last-child) {
        margin-right: ${theme.space * 2}px !important;
        margin-bottom: 0;
      }
    }

    ${theme.mq.large} {
      > *:not(:last-child) {
        margin-right: ${theme.space * 3}px !important;
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

  > h3 {
    margin-top: ${theme.space * 2}px;
    text-transform: uppercase;
    font-size: 1.6rem;
  }
  
  > h4 {
    margin-top: ${theme.space * 1.5}px;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.4rem;
  }

  .imageWrapper {
    margin-top: ${theme.space * 1.5}px;

    + *:not(h3, h4) {
      margin-top: ${theme.space * 1.5}px;
    }
  }

  ${theme.mq.medium} {
    padding-bottom: ${theme.space * 3}px;
    font-size: 1.4rem;

    p, ul, > h3, > h4  {
      margin-left: 5vw;
      margin-top: ${theme.space * 3}px;

      + p, + ul {
        margin-top: ${theme.space * 1.5}px;
      }
    }

    table, .linksOnly {
      margin-left: 5vw;
      margin-top: ${theme.space * 2}px
    }

    .imageWrapper {
      margin-top: ${theme.space * 2}px;

      + *:not(h3) {
        margin-top: ${theme.space * 2}px;
      }
    }
  }

  ${theme.mq.large} {

    p, ul {
      margin-top: ${theme.space * 4}px;
      padding-left: ${theme.pad} !important;

      + p, + ul {
        margin-top: ${theme.space * 2}px;
      }
    }

    table, .linksOnly {
      padding-left: ${theme.pad} !important;
      margin-top: ${theme.space * 2}px
    }

    > h3 {
      font-size: 1.9rem;
      margin-top: ${theme.space * 5}px;
    }

    > h4 {
      font-size: 1.5rem;
      margin-top: ${theme.space * 3}px;
    }

    .imageWrapper {
      margin-top: ${theme.space * 4}px;

      + *:not(h3) {
        margin-top: ${theme.space * 4}px;
      }
    }
  }
`