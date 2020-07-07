import { StaticQuery, graphql } from "gatsby"
import React from "react"
import { css } from "@emotion/core"

function Filter({allTags, setTag, activeTag}) {  
  return (
    <div css={filterStyle}>
      <ul className="filterList l-mainPad">
          <li className="tag divider">
            <input 
            type="checkbox" 
            className="u-sr-only" 
            name="all" 
            id="all" 
            checked={activeTag === -1}
            onChange={
              () => setTag(-1)
            } />
            <label for="all">all</label>
          </li>
        {allTags.map((tag, index) => (
          <li className="tag">
            <input 
            type="checkbox" 
            className="u-sr-only" 
            name={tag} 
            id={tag} 
            checked={activeTag === index}
            onChange={
              () => setTag(index)
            } />
            <label for={tag}>{tag}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

const filterStyle = theme => css`
  ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
  }

  .tag {
    label {
      font-size: 1rem;
      cursor: pointer;
      display: inline-block;
      color: ${theme.colors.primary};
      margin-bottom: 16px;
      margin-right: 24px;
      letter-spacing:0.06em;
    }

    input[type=checkbox]:checked + label {
      font-weight: 800;
    }
  }

  .divider {
    &::after {
      content: "|";
      margin-right: 24px;
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
