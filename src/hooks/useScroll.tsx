import React, {RefObject, useCallback, useEffect, useState} from 'react'
import {AnimatedValue, useSprings} from 'react-spring'
import theme from 'styles/theme'

interface ScrollContextInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  springs: AnimatedValue<any>[]
  refs: RefObject<HTMLLIElement>[]
  tops: (number | null)[]
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ScrollContext = React.createContext<ScrollContextInterface>(null!)

const tensions = [150, 500, 240, 800]

function ScrollProvider(props: React.PropsWithChildren<{count: number}>) {
  const [springs, set] = useSprings(props.count, index => ({
    to: {transform: `translate3d(0, 0px, 0)`},
    config: {tension: tensions[index % tensions.length], clamp: true},
  }))

  const [tops, setTops] = useState(Array<null | number>(props.count).fill(null))

  const refs = React.useMemo<RefObject<HTMLLIElement>[]>(
    () =>
      Array(props.count)
        .fill(0)
        .map(() => React.createRef()),
    [props.count],
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wrapperRef = React.useRef<HTMLUListElement>(null)
  const [height, setHeight] = useState<string | number>('auto')

  const onResize = useCallback(() => {
    // reset all layouts
    setTops(old => old.fill(null))
    setHeight('auto')

    if (window.innerWidth < theme.breakpoints.alpha) return
    // set static height and 'tops'
    setHeight(wrapperRef?.current?.clientHeight ?? 0)
    const newTops: number[] = []
    refs.forEach(ref => {
      newTops.push(
        ref.current
          ? window.pageYOffset + ref.current.getBoundingClientRect().top
          : 0,
      )
    })
    setTops(newTops)
  }, [refs])

  const onScroll = useCallback(() => {
    set({
      to: {transform: `translate3d(0, -${window.pageYOffset}px, 0)`},
      immediate: false,
    })
  }, [set])

  useEffect(() => {
    set({
      to: {transform: `translate3d(0, -${window.pageYOffset}px, 0)`},
      immediate: true,
    })

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    onResize() // run on initial layout
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll, onResize, set])

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

function useScroll(index: number) {
  const context = React.useContext(ScrollContext)
  if (context === undefined) {
    throw new Error(`useScroll must be used within a ScrollProvider`)
  }
  return {
    props: (context.tops[index] !== null
      ? {
          top: context.tops[index],
          position: 'fixed',
          ...context.springs[index],
        }
      : {position: 'relative'}) as React.CSSProperties,
    ref: context.refs[index],
  }
}

export {ScrollProvider, useScroll}
