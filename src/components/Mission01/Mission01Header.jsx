import React, { useState } from 'react';
import { Play, CheckCircle2, Target, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MaskGroup from '../../assets/images/Mask-Group-213-e1748584540582.png';

const ObjectiveCard = ({ title, items, color }) => (
    <div className={`bg-gradient-to-br ${color} p-[1px] rounded-2xl h-full`}>
        <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-8 h-full">
            <h4 className={`text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-2 ${color.includes('green') ? 'text-green-400' : 'text-blue-400'}`}>
                <Target size={16} /> {title}
            </h4>
            <ul className="space-y-4">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                        <CheckCircle2 size={16} className={`mt-1 shrink-0 ${color.includes('green') ? 'text-green-500' : 'text-blue-500'}`} />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const Mission01Header = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section className="py-20 bg-black relative">
            <div className="max-w-7xl mx-auto px-4">

                {/* Section Header */}
                <div className="mb-16 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="bg-neon text-black text-xs font-bold px-3 py-1 rounded-full">COMPLETED</span>
                        <span className="text-gray-500 font-mono text-sm">MAY 30, 2024</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Agnibaan SOrTeD</h2>
                    <p className="text-xl text-gray-400 max-w-3xl">
                        India's first launch from a private launchpad, powered by the world's first single-piece 3D printed semi-cryogenic engine.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Video Thumbnail (Left/Top) */}
                    <div className="lg:col-span-5">
                        <div
                            onClick={() => setIsVideoOpen(true)}
                            className="block group relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer"
                        >
                            <img
                                src={MaskGroup}
                                alt="Mission 01 Launch"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                    <Play size={24} className="text-white fill-white ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                <span className="bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white font-mono">WATCH HIGHLIGHTS</span>
                            </div>
                        </div>
                    </div>

                    {/* Objectives Grid (Right/Bottom) */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ObjectiveCard
                            title="Primary Objectives"
                            color="from-green-500/50 to-green-900/10"
                            items={[
                                "Clean liftoff and execution of pitchover and wind biasing maneuvers.",
                                "Demonstration of controlled ascent.",
                                "Validation of single-piece 3D printed engine performance."
                            ]}
                        />
                        <ObjectiveCard
                            title="Secondary Objectives"
                            color="from-blue-500/50 to-blue-900/10"
                            items={[
                                "Execution of launch operations and countdown with ISRO.",
                                "Successful integration of Agnikul Mission Control Centre hardware.",
                                "Full-scale orbital flight process validation."
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/RkXlRchE18o?autoplay=1"
                                title="Agnikul Mission 01 Highlights"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Mission01Header;
