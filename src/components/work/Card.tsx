import {useScroll} from 'hooks/useScroll'
import Image from 'gatsby-image'
import React, {useRef} from 'react'
import {animated, useSpring} from 'react-spring'
import {borderLine} from 'styles/mixins'
import {css} from '@emotion/core'
import useAnimationState from 'hooks/useAnimationState'
import {Link} from 'gatsby'
import {Theme} from 'styles/theme'
import {WorkNode} from 'globals'

export default function Card({node, index}: {index: number; node: WorkNode}) {
  const {props: springProps, ref} = useScroll(index)
  const {mount, inView} = useAnimationState(ref)

  const windowAnim = useSpring({
    transform: mount ? (inView ? 'scale(100%)' : 'scale(90%)') : 'scale(0%)',
  })

  return (
    <animated.li ref={ref} css={cardStyle} style={springProps}>
      <Link to={node.fields.slug}>
        {/* <header css={{display: 'flex', alignItems: 'baseline'}}>
            <h3
              css={theme => ({
                marginBottom: theme.spacing.small,
                marginRight: theme.spacing.small,
              })}
            >
              {node.frontmatter.title}
            </h3>
            <span>{node.frontmatter.type}</span>
          </header> */}
        <Image {...node.frontmatter.image.childImageSharp} />
      </Link>
    </animated.li>
  )
}

const cardStyle = (theme: Theme) => css`
  display: block;
  margin-bottom: -128px;
  max-width: 72vw;
  height: auto;

  @media (max-width: ${theme.breakpoints.small + 1}px) {
    &:nth-of-type(2n) {
      align-self: flex-end;
    }
  }

  .gatsby-image-wrapper {
    max-width: 100%;
    min-height: 0;
  }

  ${theme.mq.small} {
    width: 40%;

    .gatsby-image-wrapper {
      width: 100%;
      height: auto;
      margin: 0;
    }

    &:nth-of-type(11n-10),
    &:nth-of-type(11n-8),
    &:nth-of-type(11n-6),
    &:nth-of-type(11n-3) {
      align-self: flex-end;
    }

    &:nth-of-type(11n-7),
    &:nth-of-type(11n-4),
    &:nth-of-type(11n-1) {
      align-self: center;
    }
  }

  @media (prefers-reduced-motion) {
    transform: none !important;
  }
`
