import {useTransitionState} from 'gatsby-plugin-transition-link/hooks'
import {useEffect, useRef, useState} from 'react'

export default function useAnimationState(ref) {
  // animate out on navigation
  const {mount} = useTransitionState()

  const [inView, setInView] = useState(false)
  const observer = useRef(null)

  useEffect(() => {
    observer.current = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    )
    const {current: currentObserver} = observer
    if (ref.current) currentObserver.observe(ref.current)
    return () => {
      currentObserver.disconnect()
    }
  }, [ref])

  return {mount, inView}
}
