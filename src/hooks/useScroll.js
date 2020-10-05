import React, {createRef, useCallback, useEffect, useState} from 'react'
import {useSprings} from 'react-spring'
import {breakpoints} from 'styles/theme'

const ScrollContext = React.createContext()

const tensions = [100, 170, 200, 150, 110, 180]

function ScrollProvider(props) {
  const [springs, set] = useSprings(props.count, index => ({
    to: {transform: `translate3d(0, 0px, 0)`},
    config: {tension: tensions[index % tensions.length]},
  }))

  const [tops, setTops] = useState(Array(props.count).fill(null))

  const refs = React.useRef([])

  if (refs.current.length !== props.count) {
    // add or remove refs
    refs.current = Array(props.count)
      .fill()
      .map((_, i) => refs.current[i] || createRef())
  }

  const wrapperRef = React.useRef(null)
  const [height, setHeight] = useState('auto')

  const onResize = useCallback(() => {
    // reset all layouts
    setTops(old => old.fill(null))
    setHeight('auto')

    if (window.innerWidth < breakpoints.small) return
    // set static height and 'tops'
    setHeight(wrapperRef.current.clientHeight)
    const newTops = []
    for (let i in refs.current) {
      newTops.push(
        window.pageYOffset +
          refs.current[i].current.getBoundingClientRect().top,
      )
    }
    setTops(newTops)
  }, [])

  const onScroll = useCallback(() => {
    set(() => ({
      transform: `translate3d(0, -${window.pageYOffset}px, 0)`,
    }))
  }, [set])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    onResize() // run on initial layout
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll, onResize])

  return (
    <ScrollContext.Provider value={{springs, refs, tops}}>
      <ul
        {...props}
        ref={wrapperRef}
        css={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        style={{
          height,
        }}
      />
    </ScrollContext.Provider>
  )
}

function useScroll(index) {
  const context = React.useContext(ScrollContext)
  if (context === undefined) {
    throw new Error(`useScroll must be used within a ScrollProvider`)
  }

  return {
    props:
      context.tops[index] !== null
        ? {
            top: context.tops[index],
            position: 'fixed',
            ...context.springs[index],
          }
        : {position: 'relative'},
    ref: context.refs.current[index],
  }
}

export {ScrollProvider, useScroll}
