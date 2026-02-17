import React from 'react';
import { motion } from 'framer-motion';

const dataPoints = [
    { x: 0, y: 100 },
    { x: 20, y: 90 },
    { x: 40, y: 60 },
    { x: 60, y: 30 },
    { x: 80, y: 20 },
    { x: 100, y: 10 },
];

const TelemetryGraph = () => {
    // Convert data points to SVG path string
    const pathData = dataPoints.reduce((acc, point, i) => {
        return i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
    }, "");

    return (
        <section className="py-20 px-4 bg-dark">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-white">Live Telemetry Simulation</h2>
                <div className="glass-panel p-8 relative h-80 flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Grid Lines */}
                        {[0, 25, 50, 75, 100].map(y => (
                            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                        ))}

                        {/* Gradient Defs */}
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00FF88" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#00CCFF" stopOpacity="0.8" />
                            </linearGradient>
                        </defs>

                        {/* Animated Path */}
                        <motion.path
                            d={pathData}
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Labels */}
                        <text x="5" y="10" fill="gray" fontSize="4">Altitude (km)</text>
                        <text x="90" y="95" fill="gray" fontSize="4">Time (s)</text>
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default TelemetryGraph;
