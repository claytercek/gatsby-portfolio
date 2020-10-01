import {useScroll} from 'components/hooks/useScroll'
import {Link} from 'gatsby'
import Image from 'gatsby-image'
import React, {useRef} from 'react'
import {animated} from 'react-spring'

export default function Card({node, index}) {
  const ref = useRef()
  const transform = useScroll(index)
  return (
    <animated.li
      ref={ref}
      css={{
        width: '40%',
      }}
      style={{transform}}
    >
      <Link to={node.fields.slug}>
        {node.frontmatter.title}
        <Image fluid={node.frontmatter.image.childImageSharp.fluid} />
      </Link>
    </animated.li>
  )
}
