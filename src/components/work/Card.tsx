import {useScroll} from 'hooks/useScroll'
import Image from 'gatsby-image'
import React from 'react'
import {animated, useSpring} from 'react-spring'
import {css} from '@emotion/core'
import useAnimationState from 'hooks/useAnimationState'
import {Link} from 'gatsby'
import {Theme} from 'styles/theme'
import {mq} from 'styles/mixins'
import {RemarkImage} from '../../globals'

interface Props {
  readonly index: number
  readonly title: string
  readonly slug: string
  readonly date: string | undefined
  readonly image: RemarkImage | undefined
}

export default function Card({slug, image, index, title}: Props) {
  const {props: springProps, ref} = useScroll(index)
  const {mount, inView} = useAnimationState(ref)

  let transform = 'scale(0%)'
  if (mount) {
    if (inView) transform = 'scale(100%)'
    else transform = 'scale(100%)'
  }

  const windowAnim = useSpring({
    transform,
  })

  return (
    <animated.li ref={ref} css={cardStyle} style={springProps}>
      <Link to={slug}>
        {image ? <Image {...image.childImageSharp} /> : null}
        {/* <h3>{title}</h3> */}
      </Link>
    </animated.li>
  )
}

const cardStyle = (theme: Theme) => css`
  display: block;
  margin-bottom: -148px;
  max-width: 72vw;
  height: auto;

  .gatsby-image-wrapper {
    max-width: 100%;
    overflow: hidden;
  }

  a {
    display: block;
    overflow: hidden;
    transition: transform 0.2s ease;
    transform: scale(100%);

    .gatsby-image-wrapper {
      display: block;
      transform: scale(100%);
      transition: transform 0.2s ease;
    }

    &:hover {
      transform: scale(90.9%);

      .gatsby-image-wrapper {
        transform: scale(110%);
      }
    }
  }

  ${mq('alpha')} {
    max-width: 60%;

    .gatsby-image-wrapper {
      max-width: 100%;
    }

    &:nth-of-type(11n-10),
    &:nth-of-type(11n-8),
    &:nth-of-type(11n-6),
    &:nth-of-type(11n-3) {
      align-self: flex-end;

      h3 {
        text-align: right;
      }
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
