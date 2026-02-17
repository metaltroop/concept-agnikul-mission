import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Thermometer, Radio } from 'lucide-react';

const TelemetryDashboard = () => {
    // Simulated live data
    const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        // Generate a smoother, realistic flight profile curve
        // T+0 to T+50 simulation points
        const points = [];
        for (let i = 0; i <= 50; i++) {
            // Sigmoid-like curve for altitude (slow start, rapid rise, leveling off)
            const progress = i / 50;

            points.push({
                t: i,
                // Velocity: Linear increase then coast
                velocity: progress < 0.8 ? (progress * 1.5) : (1.2 - (progress - 0.8) * 0.5),
                // Altitude: Exponential rise
                altitude: Math.pow(progress, 2) * 100,
                // Temp: Rises then stabilizes
                temp: 200 + (Math.sin(progress * Math.PI) * 50)
            });
        }
        setDataPoints(points);
    }, []);

    // Generate SVG Path for Altitude Area Chart
    const getPath = () => {
        if (dataPoints.length === 0) return "";
        const width = 100;
        const height = 100;

        let d = `M 0,${height} `;

        dataPoints.forEach((p, i) => {
            const x = (i / 50) * width;
            const y = height - ((p.altitude / 100) * height);
            d += `L ${x},${y} `;
        });

        d += `L ${width},${height} Z`;
        return d;
    };

    // Generate SVG Path for Velocity Line
    const getVelocityPath = () => {
        if (dataPoints.length === 0) return "";
        const width = 100;
        const height = 100;

        dataPoints.forEach((p, i) => {
            const x = (i / 50) * width;
            const y = height - ((p.velocity / 1.5) * height);
            if (i === 0) return `M ${x},${y} `;
            return `L ${x},${y} `;
        });

        // Manual simple path construction for demo
        let d = `M 0,${height} `;
        dataPoints.forEach((p, i) => {
            const x = (i / 50) * width;
            const y = height - ((p.velocity / 1.5) * height);
            d += `L ${x},${y} `;
        });
        return d;
    };

    return (
        <section className="py-24 bg-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <h2 className="text-neon font-mono text-xs tracking-widest">MISSION-01 ARCHIVE</h2>
                        </div>
                        <h3 className="text-4xl font-bold text-white">Flight Telemetry</h3>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-gray-400 text-sm font-mono">ID: AGNIBAN_SORTED_01</p>
                        <p className="text-gray-400 text-sm font-mono">STATUS: <span className="text-neon">SUCCESS</span></p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Velocity Card */}
                    <DashboardCard title="VELOCITY" icon={<Zap size={18} className="text-yellow-400" />} value="1.2 km/s" label="MAX Q PASSED">
                        <div className="h-32 mt-6 relative w-full opacity-80">
                            {/* Bar Visualization */}
                            <div className="flex items-end h-full gap-[2px]">
                                {dataPoints.map((p, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 bg-yellow-400 rounded-t-[1px] transition-all"
                                        style={{
                                            height: `${(p.velocity / 1.5) * 100}%`,
                                            opacity: 0.2 + (i / 50) * 0.8
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </DashboardCard>

                    {/* Altitude Card */}
                    <DashboardCard title="ALTITUDE" icon={<Activity size={18} className="text-neon" />} value="107 km" label="APOGEE REACHED">
                        <div className="h-32 mt-6 relative w-full overflow-hidden">
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: 'rgb(0,255,136)', stopOpacity: 0.5 }} />
                                        <stop offset="100%" style={{ stopColor: 'rgb(0,255,136)', stopOpacity: 0 }} />
                                    </linearGradient>
                                </defs>
                                <path d={getPath()} fill="url(#grad1)" stroke="none" />
                                <path d={getPath().replace('Z', '')} fill="none" stroke="#00FF88" strokeWidth="1" />
                            </svg>
                        </div>
                    </DashboardCard>

                    {/* Thermal Card */}
                    <DashboardCard title="CHAMBER TEMP" icon={<Thermometer size={18} className="text-red-500" />} value="2800 K" label="NOMINAL">
                        <div className="h-32 mt-6 flex flex-col justify-center">
                            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "85%" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-orange-500 to-red-600"
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-gray-500">
                                <span>0 K</span>
                                <span>3500 K</span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="bg-white/5 p-2 rounded text-center">
                                    <div className="text-[10px] text-gray-500">PUMP PRESSURE</div>
                                    <div className="text-white font-mono">180 bar</div>
                                </div>
                                <div className="bg-white/5 p-2 rounded text-center">
                                    <div className="text-[10px] text-gray-500">LOX FLOW</div>
                                    <div className="text-white font-mono">Stable</div>
                                </div>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </section>
    );
};

const DashboardCard = ({ title, icon, value, label, children }) => (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all group">
        <div className="flex justify-between items-start mb-6">
            <h4 className="text-gray-400 font-bold font-mono text-xs tracking-wider flex items-center gap-2 border border-white/10 px-2 py-1 rounded">
                {icon} {title}
            </h4>
            <Radio size={14} className="text-neon animate-pulse" />
        </div>
        <div className="mb-2">
            <span className="text-4xl font-bold text-white block tracking-tight group-hover:text-neon transition-colors duration-300">{value}</span>
            <span className="text-xs text-gray-500 font-mono border-l-2 border-neon pl-2 mt-1 block">{label}</span>
        </div>
        {children}
    </div>
);

export default TelemetryDashboard;
