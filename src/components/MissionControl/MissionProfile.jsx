import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TrajectoryCanvas from '../Trajectory/TrajectoryCanvas';
import Timeline from '../Timeline/Timeline';

const MissionProfile = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [missionTime, setMissionTime] = useState(0);

    useEffect(() => {
        // Map scroll (0 to 1) to Mission Time (0 to 180 seconds approx)
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Non-linear mapping could be better, but linear is fine for now
            setMissionTime(latest * 180);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Format seconds to MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `T+${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <section ref={containerRef} className="relative bg-dark">
            <div className="flex flex-col lg:flex-row">
                {/* Sticky 3D Visualization */}
                <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 left-0 bg-black/20 z-10">
                    <div className="absolute top-8 left-8 z-20 pointer-events-none">
                        <h2 className="text-4xl font-bold text-white mb-2">Flight Profile</h2>
                        <div className="flex flex-col gap-1 text-sm text-gray-400 font-mono">
                            <span>LAUNCH: AGNIBAAN SORTED</span>
                            <span>SITE: SDSC SHAR</span>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-white/60">T-0: 07:15 IST</span>
                                <span className="text-neon text-xl font-bold bg-black/50 px-2 rounded">
                                    {formatTime(missionTime)}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Pass scroll progress and calculated time to the canvas */}
                    <TrajectoryCanvasWrapper scrollYProgress={scrollYProgress} missionTime={missionTime} />
                </div>

                {/* Scrolling Timeline Content */}
                <div className="w-full lg:w-1/2 min-h-screen p-4 lg:p-20 relative z-20 bg-gradient-to-b from-dark/90 to-dark">
                    <div className="lg:hidden mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Flight Profile</h2>
                        <div className="flex items-center gap-2 mb-4 font-mono">
                            <span className="text-neon text-lg">{formatTime(missionTime)}</span>
                        </div>
                        <div className="h-[300px] w-full bg-black/50 rounded-xl overflow-hidden relative">
                            <TrajectoryCanvasWrapper scrollYProgress={scrollYProgress} missionTime={missionTime} />
                        </div>
                    </div>

                    <Timeline />

                    <div className="h-[50vh] flex items-center justify-center text-gray-500 text-sm">
                        End of Mission Simulation
                    </div>
                </div>
            </div>
        </section>
    );
};

// Wrapper to bridge Framer Motion value to React prop
const TrajectoryCanvasWrapper = ({ scrollYProgress, missionTime }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            setProgress(latest);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return <TrajectoryCanvas progress={progress} missionTime={missionTime} />;
};

export default MissionProfile;
