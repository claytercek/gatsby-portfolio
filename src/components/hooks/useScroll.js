import React, {useLayoutEffect, useState} from 'react'
import {useSprings} from 'react-spring'

const ScrollContext = React.createContext()

const tensions = [80, 170, 200, 150, 110, 180]

function ScrollProvider(props) {
  const [springs, set] = useSprings(props.count, index => ({
    to: {transform: `translatey(-${window.pageYOffset}px)`},
    config: {tension: tensions[index % tensions.length]},
  }))

  const wrapperRef = React.useRef(null)
  const [height, setHeight] = useState(null)

  useLayoutEffect(() => {
    function updateHeight() {
      setHeight('auto')
      setHeight(wrapperRef.current.clientHeight)
    }
    function onScroll() {
      set(() => ({
        transform: `translatey(-${window.pageYOffset}px)`,
      }))
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', updateHeight)
    updateHeight() // run on initial layout
    return () => {
      window.removeEventListener('resize', updateHeight)
      removeEventListener('scroll', onScroll)
    }
  }, [set])

  return (
    <ScrollContext.Provider value={springs}>
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

function useScroll(index, ref) {
  const context = React.useContext(ScrollContext)
  if (context === undefined) {
    throw new Error(`useScroll must be used within a ScrollProvider`)
  }

  const [top, setTop] = useState(null)

  useLayoutEffect(() => {
    function updateTop() {
      setTop(null)
      setTop(ref.current.offsetTop)
    }
    window.addEventListener('resize', updateTop)
    updateTop() // run on initial layout
    return () => {
      window.removeEventListener('resize', updateTop)
    }
  }, [ref])

  return {
    top,
    position: 'static',
    ...(top !== null && {position: 'fixed', ...context[index]}),
  }
}

export {ScrollProvider, useScroll}
