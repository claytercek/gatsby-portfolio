import React, {useEffect, useRef, useState} from 'react'

export default function useAnimationState(ref: React.RefObject<HTMLElement>) {
  const mount = true

  const [inView, setInView] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const observer = useRef<IntersectionObserver>(null!)

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
