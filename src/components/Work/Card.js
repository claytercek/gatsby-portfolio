import {useScroll} from 'components/hooks/useScroll'
import {Link} from 'gatsby'
import Image from 'gatsby-image'
import React, {useLayoutEffect, useRef, useState} from 'react'
import {animated} from 'react-spring'

export default function Card({node, index}) {
  const ref = useRef()
  const animProps = useScroll(index, ref)

  return (
    <animated.li
      ref={ref}
      css={{
        width: '40%',
        height: 'auto',
        display: 'block',
        marginBottom: '-2rem',

        '&:nth-of-type(3n)': {
          alignSelf: 'center',
        },

        '&:nth-of-type(3n + 2)': {
          alignSelf: 'flex-end',
        },

        '@media (prefers-reduced-motion)': {
          transform: 'none !important',
        },
      }}
      style={animProps}
    >
      <Link to={node.fields.slug}>
        <Image
          fluid={node.frontmatter.image.childImageSharp.fluid}
          css={{minHeight: '30vh'}}
        />
      </Link>
    </animated.li>
  )
}
