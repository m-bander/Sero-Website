import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import * as THREE from 'three'

interface VaultModelProps {
  mousePosition: { x: number; y: number }
  scrollProgress: number
}

export const VaultModel = ({ mousePosition, scrollProgress }: VaultModelProps) => {
  const vaultRef = useRef<Group>(null)
  const ringRef = useRef<Mesh>(null)
  const coreRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!vaultRef.current) return

    const time = state.clock.getElapsedTime()

    // Base idle rotation
    vaultRef.current.rotation.y = time * 0.1 + mousePosition.x * 0.3

    // Subtle vertical tilt based on mouse
    vaultRef.current.rotation.x = mousePosition.y * 0.2

    // Scroll-based rotation
    vaultRef.current.rotation.y += scrollProgress * 0.5

    // Security ring pulse
    if (ringRef.current) {
      const pulse = Math.sin(time * 0.8) * 0.1 + 0.9
      ringRef.current.scale.set(pulse, pulse, pulse)
    }

    // Core glow pulse
    if (coreRef.current && coreRef.current.material) {
      const material = coreRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = Math.sin(time * 0.5) * 0.3 + 0.7
    }
  })

  // Main vault body material
  const vaultMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        metalness: 0.9,
        roughness: 0.2,
        envMapIntensity: 1,
      }),
    []
  )

  // Neon green ring material
  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00ff94',
        emissive: '#00ff94',
        emissiveIntensity: 1,
        metalness: 0.8,
        roughness: 0.1,
      }),
    []
  )

  // Glowing core material
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00ff94',
        emissive: '#00ff94',
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.6,
      }),
    []
  )

  // Glass material
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        metalness: 0,
        roughness: 0.1,
        transparent: true,
        opacity: 0.15,
        transmission: 0.9,
        thickness: 0.5,
      }),
    []
  )

  return (
    <group ref={vaultRef} position={[0, 0, 0]}>
      {/* Main vault body - cylindrical */}
      <mesh material={vaultMaterial}>
        <cylinderGeometry args={[2, 2, 3, 32]} />
      </mesh>

      {/* Front face */}
      <mesh position={[0, 0, 1.51]} material={vaultMaterial}>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Circular locking mechanism */}
      <mesh position={[0, 0, 1.6]}>
        <torusGeometry args={[0.8, 0.1, 16, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Security ring (animated) */}
      <mesh ref={ringRef} position={[0, 0, 1.65]}>
        <torusGeometry args={[1, 0.03, 16, 64]} />
        <primitive object={ringMaterial} />
      </mesh>

      {/* Inner security rings */}
      <mesh position={[0, 0, 1.63]}>
        <torusGeometry args={[0.5, 0.02, 16, 32]} />
        <primitive object={ringMaterial} />
      </mesh>

      {/* Central lock point */}
      <mesh position={[0, 0, 1.7]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#00ff94" emissive="#00ff94" emissiveIntensity={1.2} />
      </mesh>

      {/* Glass panels (subtle) */}
      <mesh position={[0, 0.8, 1.55]} rotation={[Math.PI / 12, 0, 0]}>
        <boxGeometry args={[1.5, 0.4, 0.05]} />
        <primitive object={glassMaterial} />
      </mesh>

      <mesh position={[0, -0.8, 1.55]} rotation={[-Math.PI / 12, 0, 0]}>
        <boxGeometry args={[1.5, 0.4, 0.05]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* Glowing core (visible through seams) */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <primitive object={coreMaterial} />
      </mesh>

      {/* Accent lines */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2, 0.01, 8, 64]} />
        <meshStandardMaterial color="#00ff94" emissive="#00ff94" emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[0, -1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2, 0.01, 8, 64]} />
        <meshStandardMaterial color="#00ff94" emissive="#00ff94" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}
