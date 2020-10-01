import React, {useCallback, useEffect, useRef} from 'react'
import {useSpring, useSprings} from 'react-spring'

const ScrollContext = React.createContext()

const tensions = [80, 170, 200, 150, 110, 180]

function ScrollProvider(props) {
  const [springs, set, stop] = useSprings(props.count, index => ({
    to: {y: 0},
    config: {tension: tensions[index % tensions.length]},
  }))

  const lastScrollPos = useRef(window.scrollY)

  const onScroll = useCallback(
    e => {
      const diff = window.scrollY - lastScrollPos.current
      set(index => ({
        from: {
          y: springs[index].y.lastPosition + diff,
        },
        to: {
          y: 0,
        },
        // config: {
        //   velocity: springs[index].y.lastVelocity
        // },
        reset: true,
      }))
      lastScrollPos.current = window.scrollY
    },
    [set],
  )

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      removeEventListener('scroll', onScroll)
    }
  }, [onScroll])
  return <ScrollContext.Provider value={springs} {...props} />
}

function useScroll(index) {
  const context = React.useContext(ScrollContext)
  if (context === undefined) {
    throw new Error(`useScroll must be used within a ScrollProvider`)
  }
  return context[index].y.interpolate(y => `translate3d(0, ${y}px, 0)`)
}

export {ScrollProvider, useScroll}
