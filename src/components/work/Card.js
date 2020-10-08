import {useScroll} from 'hooks/useScroll'
import Image from 'gatsby-image'
import React, {useRef} from 'react'
import {animated, useSpring} from 'react-spring'
import Window from './Window'
import {borderLine} from 'styles/mixins'
import {css} from '@emotion/core'
import {TransitionLink} from 'gatsby-plugin-transition-link/components/TransitionLink'
import useAnimationState from 'hooks/useAnimationState'
import useMeasure from 'react-use-measure'

export default function Card({node, index}) {
  const {props: springProps, ref} = useScroll(index)
  const {mount, inView} = useAnimationState(ref)

  const [windowRef, bounds] = useMeasure()

  const windowAnim = useSpring({
    transform: mount ? (inView ? 'scale(100%)' : 'scale(80%)') : 'scale(0%)',
  })

  return (
    <animated.li ref={ref} css={cardStyle} style={springProps}>
      <TransitionLink
        to={node.fields.slug}
        title={node.frontmatter.title}
        exit={{
          length: 1,
        }}
        entry={{
          delay: 0.6,
        }}
      >
        <Window
          tag={animated.article}
          css={{overflow: 'hidden'}}
          ref={windowRef}
          style={windowAnim}
        >
          <header css={{display: 'flex', alignItems: 'baseline'}}>
            <h3
              css={theme => ({
                marginBottom: theme.spacing.small,
                marginRight: theme.spacing.small,
              })}
            >
              {node.frontmatter.title}
            </h3>
            <span>{node.frontmatter.type}</span>
          </header>
          <Image
            fixed={node.frontmatter.image.childImageSharp.fixed}
            css={theme => [borderLine(theme)]}
          />
        </Window>
      </TransitionLink>
    </animated.li>
  )
}

const cardStyle = theme => css`
  display: block;
  margin-bottom: -128px;
  overflow: hidden;

  max-width: 72vw;

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
    width: auto;

    .gatsby-image-wrapper {
      min-height: 30vh;
      max-width: 60vw;
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
