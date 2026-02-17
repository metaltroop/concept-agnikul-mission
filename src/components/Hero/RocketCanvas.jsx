import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, Cone, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Rocket = () => {
    const rocketRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        rocketRef.current.position.y = Math.sin(t * 0.5) * 0.5; // Gentle hover
        rocketRef.current.rotation.y += 0.005; // Slow rotation
    });

    return (
        <group ref={rocketRef} rotation={[0, 0, Math.PI / 12]} position={[0, -1, 0]}>
            {/* Rocket Body */}
            <Cylinder args={[0.5, 0.7, 4, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#ddd" metalness={0.6} roughness={0.3} />
            </Cylinder>
            {/* Nose Cone */}
            <Cone args={[0.5, 1.5, 32]} position={[0, 2.75, 0]}>
                <meshStandardMaterial color="#eee" metalness={0.6} roughness={0.3} />
            </Cone>
            {/* Engine Nozzle */}
            <Cone args={[0.4, 0.8, 32]} position={[0, -2.4, 0]} rotation={[Math.PI, 0, 0]}>
                <meshStandardMaterial color="#333" />
            </Cone>

            {/* Engine Glow */}
            <pointLight position={[0, -3, 0]} color="#00ff88" intensity={2} distance={5} />
        </group>
    );
};

const Particles = () => {
    const count = 500;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20 - 5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    const particlesRef = useRef();

    useFrame((state) => {
        // Animate particles upwards to simulate speed
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.position.y -= 0.02;
        if (particlesRef.current.position.y < -5) particlesRef.current.position.y = 0;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.03} color="#00ff88" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
}

const RocketCanvas = () => {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Rocket />
            <Particles />
        </Canvas>
    );
};

export default RocketCanvas;
