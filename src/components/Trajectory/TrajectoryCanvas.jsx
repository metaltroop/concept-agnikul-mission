import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3 } from 'three';
import { Line, Sphere, PerspectiveCamera, Stars, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

// --- DATA & CONFIG ---
// Refactored to Y=0 being the surface/launchpad
const TrajectoryPoints = [
    new Vector3(0, 0, 0),       // Launch Pad (Surface)
    new Vector3(0, 40, 0),      // Vertical Ascent
    new Vector3(15, 80, 0),     // Gravity Turn
    new Vector3(50, 110, 0),    // Upper Stage Burn (MECO nearby)
    new Vector3(100, 130, 0),   // Coast Phase (Apogee nearby)
    new Vector3(150, 120, 0),   // Descent start
    new Vector3(200, 0, 0),     // Splashdown
];

// --- COMPONENTS ---

const Labels = () => {
    return (
        <group>
            {/* MECO Label */}
            <group position={[50, 115, 0]}>
                <Billboard follow={true}>
                    <Text
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        fontSize={2}
                        outlineWidth={0.1}
                        outlineColor="#000"
                    >
                        MECO (T+66s)
                    </Text>
                </Billboard>
                <mesh position={[0, -3, 0]}>
                    <sphereGeometry args={[0.5]} />
                    <meshBasicMaterial color="#00FF88" />
                </mesh>
                <Line points={[[0, -3, 0], [0, -10, 0]]} color="white" transparent opacity={0.2} />
            </group>

            {/* Apogee Label - Moved to actual peak */}
            <group position={[100, 145, 0]}>
                <Billboard follow={true}>
                    <Text
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        fontSize={2}
                        outlineWidth={0.1}
                        outlineColor="#000"
                    >
                        APOGEE (100km+)
                    </Text>
                </Billboard>
                <mesh position={[0, -5, 0]}>
                    <sphereGeometry args={[0.5]} />
                    <meshBasicMaterial color="#00FF88" />
                </mesh>
                <Line points={[[0, -5, 0], [0, -15, 0]]} color="white" transparent opacity={0.2} />
            </group>

            {/* Splashdown Label */}
            <group position={[200, 10, 0]}>
                <Billboard follow={true}>
                    <Text
                        color="#00CCFF"
                        anchorX="center"
                        anchorY="middle"
                        fontSize={3}
                        outlineWidth={0.1}
                        outlineColor="#000"
                    >
                        Available for Recovery
                    </Text>
                    <Text
                        position={[0, -4, 0]}
                        color="#00CCFF"
                        anchorX="center"
                        anchorY="middle"
                        fontSize={5}
                        fontWeight="bold"
                        outlineWidth={0.1}
                        outlineColor="#000"
                    >
                        BAY OF BENGAL
                    </Text>
                </Billboard>
            </group>
        </group>
    );
}

const KarmanLine = () => {
    // Earth Radius = 1000
    // Center = [0, -1000, 0]
    // Surface Y = 0
    // Karman Line (100km up) = Y=100 => Radius from center = 1100
    return (
        <group position={[0, -1000, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1099, 1101, 128]} />
                <meshBasicMaterial color="#0088ff" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
            <group position={[0, 1100, 0]}>
                <Billboard follow={true}>
                    <Text
                        color="#0088ff"
                        fontSize={3}
                        position={[0, 0, 0]}
                        outlineWidth={0.1}
                        outlineColor="black"
                    >
                        KARMAN LINE (100km)
                    </Text>
                </Billboard>
            </group>
        </group>
    );
};

const Earth = () => {
    return (
        <group position={[0, -1000, 0]}>
            <Sphere args={[1000, 64, 64]}>
                <meshStandardMaterial
                    color="#1a1a1a"
                    emissive="#050505"
                    roughness={0.8}
                    metalness={0.2}
                />
            </Sphere>
            <Sphere args={[1020, 64, 64]}>
                <meshBasicMaterial
                    color="#00FF88"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                />
            </Sphere>
            <gridHelper args={[300, 30, 0x333333, 0x111111]} position={[0, 1000, 0]} />
        </group>
    );
};

const DetailedRocket = () => {
    return (
        <group rotation={[Math.PI / 2, 0, 0]}>
            {/* Shift pivot so bottom of engine is at 0,0,0 local */}
            <group position={[0, 1.5, 0]}>
                <mesh position={[0, -1.5, 0]}><cylinderGeometry args={[0.5, 0.5, 3, 32]} /><meshStandardMaterial color="#eeeeee" /></mesh>
                <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.48, 0.5, 1, 32]} /><meshStandardMaterial color="#333333" /></mesh>
                <mesh position={[0, 1.8, 0]}><coneGeometry args={[0.5, 1.6, 32]} /><meshStandardMaterial color="#eeeeee" /></mesh>
                <mesh position={[0, -3.2, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.3, 0.6, 16]} /><meshStandardMaterial color="#222" /></mesh>
                {[0, 90, 180, 270].map((a, i) => (
                    <group key={i} rotation={[0, 0, (a * Math.PI) / 180]}>
                        <mesh position={[0.6, -2.5, 0]}>
                            <boxGeometry args={[0.4, 0.8, 0.1]} />
                            <meshStandardMaterial color="#333" />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    );
};

const ExhaustParticles = ({ isBurning }) => {
    const count = 200;
    const mesh = useRef();
    const particles = useMemo(() => new Array(count).fill().map(() => ({
        t: Math.random() * 100,
        speed: 0.5 + Math.random() * 0.5,
        offset: new Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5)
    })), []);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!mesh.current) return;
        particles.forEach((p, i) => {
            if (isBurning) {
                p.t += delta * 5 * p.speed;
            } else {
                p.t += delta * 0.5;
            }

            const life = p.t % 2;
            // Engine nozzle is effectively at world 0 relative to rocket group pivot
            // We want particles to shoot down (local -Y in rocket frame)
            const yPos = -2.0 - (life * 8); // Stream longer

            dummy.position.set(p.offset.x * life * 2, yPos, p.offset.z * life * 2);

            let scaleFactor = (life * 0.8) + 0.2;
            if (!isBurning) scaleFactor = 0; // Hide completely if not burning

            dummy.scale.set(scaleFactor, scaleFactor, scaleFactor);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial color="#ffaa00" transparent opacity={0.6} />
        </instancedMesh>
    );
};

const TrajectoryScene = ({ progress, missionTime }) => {
    const rocketGroup = useRef();
    const curve = useMemo(() => new CatmullRomCurve3(TrajectoryPoints), []);

    // Ignition Logic: Only burn if scroll has started (time > 0.5s buffer) and before MECO (66s)
    const isBurning = missionTime > 0.5 && missionTime < 66;

    const safeProgress = Math.min(1, Math.max(0, progress));

    useFrame((state) => {
        if (!rocketGroup.current) return;

        // Follow Path
        const targetPos = curve.getPointAt(safeProgress);
        const tangent = curve.getTangentAt(safeProgress);
        rocketGroup.current.position.lerp(targetPos, 0.1);
        rocketGroup.current.lookAt(rocketGroup.current.position.clone().add(tangent));

        // Camera logic
        const t = state.clock.getElapsedTime();
        let camOffset = new Vector3();

        // SLOWER rotation: reduced speed factor from 0.2 to 0.05
        const rotationSpeed = 0.05;

        if (safeProgress < 0.1) {
            // Launch Phase - Looking Up
            camOffset.set(20, 5, 20);
        } else if (safeProgress < 0.8) {
            // Flight Phase - Orbiting camera
            camOffset.set(
                Math.sin(t * rotationSpeed) * 50,
                10,
                Math.cos(t * rotationSpeed) * 50
            );
        } else {
            // Re-entry / Splashdown - Wide
            camOffset.set(60, 40, 60);
        }

        const idealCamPos = rocketGroup.current.position.clone().add(camOffset);
        state.camera.position.lerp(idealCamPos, 0.05);
        state.camera.lookAt(rocketGroup.current.position);
    });

    return (
        <>
            <Line points={curve.getPoints(300)} color="#00FF88" lineWidth={1} transparent opacity={0.3} />
            <Labels />
            <KarmanLine />
            <Earth />
            <group ref={rocketGroup}>
                <DetailedRocket />
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <ExhaustParticles isBurning={isBurning} />
                </group>
                {isBurning && <pointLight position={[0, 0, -4]} color="#ffaa00" intensity={3} distance={10} decay={2} />}
            </group>
        </>
    );
};

const TrajectoryCanvas = ({ progress = 0, missionTime = 0 }) => {
    return (
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 10, 50]} fov={45} />
            <ambientLight intensity={0.1} />
            <directionalLight position={[100, 50, 50]} intensity={1.5} />
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
            <fog attach="fog" args={['#050505', 50, 500]} />
            <TrajectoryScene progress={progress} missionTime={missionTime} />
        </Canvas>
    );
};

export default TrajectoryCanvas;
