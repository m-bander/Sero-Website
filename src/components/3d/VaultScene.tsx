import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { VaultModel } from './VaultModel'
import { Particles } from './Particles'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface VaultSceneProps {
  isMobile?: boolean
  scrollProgress?: number
}

export const VaultScene = ({ isMobile = false, scrollProgress = 0 }: VaultSceneProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x: x * 0.5, y: y * 0.5 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  return (
    <Canvas
      className="vault-canvas"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={isMobile ? 60 : 50} />

      {!prefersReducedMotion && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      )}

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#00ff94" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#00ff94" distance={15} />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <VaultModel
          mousePosition={prefersReducedMotion ? { x: 0, y: 0 } : mousePosition}
          scrollProgress={prefersReducedMotion ? 0 : scrollProgress}
        />
        {!prefersReducedMotion && <Particles count={isMobile ? 100 : 200} isMobile={isMobile} />}
      </Suspense>

      <fog attach="fog" args={['#000000', 10, 20]} />
    </Canvas>
  )
}
