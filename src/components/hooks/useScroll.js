import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {useSprings} from 'react-spring'

const ScrollContext = React.createContext()

const tensions = [80, 170, 200, 150, 110, 180]

function ScrollProvider(props) {
  const [springs, set, stop] = useSprings(props.count, index => ({
    to: {transform: `translatey(-${window.pageYOffset}px)`},
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

  useLayoutEffect(() => {
    function onResize() {
      // reset all layouts
      stop()
      setHeight('auto')
      setTops(old => old.fill(null))

      // set static height and 'tops'
      setHeight(wrapperRef.current.clientHeight)
      const newTops = []
      for (let i in refs.current) {
        newTops.push(refs.current[i].current.offsetTop)
      }
      setTops(newTops)
    }
    function onScroll() {
      set(() => ({
        transform: `translatey(-${window.pageYOffset}px)`,
      }))
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    onResize() // run on initial layout
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [set, refs, stop])

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
        : {},
    ref: context.refs.current[index],
  }
}

export {ScrollProvider, useScroll}
