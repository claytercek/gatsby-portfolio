import { StaticQuery, graphql } from "gatsby"
import React from "react"
import { css } from "@emotion/core"
import { addHoverClass } from "./utils"

function Filter({allTags, setTags, activeTags}) {
  return (
    <div css={filterStyle}>
      <input type="checkbox" name="show filter" id="filter"/>
      <label for="filter">Filter</label>
      <ul class="accordion">
        {allTags.map(tag => (
          <li>
            <input 
            type="checkbox" 
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

const filterStyle = css`

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
