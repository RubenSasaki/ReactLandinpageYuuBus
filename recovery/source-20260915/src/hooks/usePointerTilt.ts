import { useCallback, useState, type PointerEvent } from 'react'
import { useReducedMotion } from './useReducedMotion'

type Tilt = { x: number; y: number }

export function usePointerTilt(maxDegrees = 4) {
  const reducedMotion = useReducedMotion()
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 })

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (reducedMotion || event.pointerType === 'touch') return
      const rect = event.currentTarget.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      setTilt({ x: -y * maxDegrees * 2, y: x * maxDegrees * 2 })
    },
    [maxDegrees, reducedMotion],
  )

  const onPointerLeave = useCallback(() => setTilt({ x: 0, y: 0 }), [])

  return { tilt, onPointerMove, onPointerLeave }
}
