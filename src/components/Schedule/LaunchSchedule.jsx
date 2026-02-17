import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Rocket, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const ScheduleItem = ({ window, site, payload, status, details }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 last:border-0">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 px-4 cursor-pointer hover:bg-white/5 transition-colors items-center"
            >
                <div className="md:col-span-2 font-mono text-neon font-bold">{window}</div>
                <div className="md:col-span-4 text-gray-300 flex items-center gap-2"><MapPin size={16} className="text-gray-500" /> {site}</div>
                <div className="md:col-span-3 text-gray-300 flex items-center gap-2"><Rocket size={16} className="text-gray-500" /> {payload}</div>
                <div className="md:col-span-2 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                        {status}
                    </span>
                </div>
                <div className="md:col-span-1 text-right text-gray-500">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black/20"
                    >
                        <div className="p-6 text-gray-400 text-sm border-t border-white/5">
                            {details}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const LaunchSchedule = () => {
    return (
        <section className="py-24 bg-dark relative z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Upcoming Launch Schedule</h2>
                    <p className="text-gray-400">Track the next milestones in our journey to orbit.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                    {/* Header Row (Desktop) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-black/40 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/10">
                        <div className="col-span-2">Launch Window</div>
                        <div className="col-span-4">Launchpad</div>
                        <div className="col-span-3">Mass & Orbit</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-1"></div>
                    </div>

                    <ScheduleItem
                        window="Q1 2026"
                        site="Agnikul Launchpad - 01, SDSC SHAR"
                        payload="upto 100 kgs LEO"
                        status="Scheduled"
                        details="On launch day, head back here to watch the live stream! (if available)"
                    />

                    <ScheduleItem
                        window="Q2 2026"
                        site="Agnikul Launchpad - 01, SDSC SHAR"
                        payload="upto 300 kgs LEO"
                        status="Scheduled"
                        details="On launch day, head back here to watch the live stream! (if available)"
                    />
                </div>
            </div>
        </section>
    );
};

export default LaunchSchedule;
