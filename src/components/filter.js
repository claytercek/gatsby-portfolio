import { StaticQuery, graphql } from "gatsby"
import React from "react"
import { css } from "@emotion/core"

function Filter({allTags, setTags, activeTags}) {

  const hide = () =>
    console.log("HELLO HELLOOOOO");
    
  return (
    <div css={filterStyle}>
      <input aria-hidden="true" className="u-sr-only" type="checkbox" name="show/hide filter" id="filter"/>
      <label id="filterLabel" aria-hidden="true" for="filter" className={"fadeInUp"}>filter</label>
      <ul className="filterList l-mainPad">
        {allTags.map(tag => (
          <li className="tag">
            <input 
            type="checkbox" 
            className="u-sr-only" 
            name={tag} 
            id={tag} 
            checked={activeTags[tag]}
            onChange={
              () => setTags({...activeTags, [tag]: !activeTags[tag]})
            } />
            <label for={tag}>{tag}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

const filterStyle = theme => css`
  text-align: right;
  display: flex;
  flex-direction: column; 
  align-items: flex-end;

  ul {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ${theme.bezier};
    z-index: 10;
    background-color: ${theme.colors.bg};
    padding-top: 0;
    padding-bottom: 0;
  }
  .headroom:not(.headroom--unpinned)  & {
    input[type=checkbox]:checked  {
      & ~ ul {
        max-height: 150px;
        padding-top: 0;
        padding-bottom: ${theme.pad / 2}px;

        ${theme.mq.medium} {
          padding-bottom: ${theme.pad}px;
        }
      }

      & ~ #filterLabel {
        background-color: ${theme.colors.accent};

        &::after, &::before { 
          background-color: ${theme.colors.accent};
        }

      }
    }
  }

  #filterLabel {
    cursor: pointer;
    margin-bottom: ${20}px;
    margin-top: 2px;
    color: transparent;
    display: block;
    height: 4px;
    width: 28px;
    background-color: ${theme.colors.primary};
    position: relative;

    &::after, &::before {
      content: "";
      position: absolute;
      height: 4px;
      background-color: ${theme.colors.primary};
    }

    &::after {
      width: 20px;
      left: 4px;
      top: 8px;
    }

    &::before {
      width: 12px;
      left: 8px;
      top: 16px;
    }
  }

  .tag {
    label {
      font-size: 1rem;
      cursor: pointer;
      display: inline-block;
      background-color: ${theme.colors.accentLight};
      color: ${theme.colors.accent};
      border-radius: 30px;
      padding: ${theme.pad / 3}px  ${theme.pad}px;
      margin-bottom: 10px;
      margin-left: 10px;
      

      &:active {
        background-color: #0000FF33;
      }
    }

    input[type=checkbox]:checked + label {
      background-color: ${theme.colors.accent};
      color: ${theme.colors.bg};

      &:active {
        background-color: ${theme.colors.accentDim};
      }
    }
  }

`

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            social {
              name
              slug
            }
          }
        }
      }
    `}
    render={query => <Filter data={query.site.siteMetadata} {... props}/>}
  />
)
