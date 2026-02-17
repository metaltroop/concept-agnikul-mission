import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import RocketCanvas from './RocketCanvas';
import HeroBg from '../../assets/images/Hero-1.jpg';
import MaskOverlay from '../../assets/images/Mask-Group-213-e1748584540582.png';

const HeroSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-dark flex flex-col justify-center items-center text-center px-4">

            {/* Parallax Background Image */}
            <motion.div
                style={{ y: yBg, opacity: opacityBg }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay for text readability */}
                <img
                    src={HeroBg}
                    alt="Space Background"
                    className="w-full h-full object-cover object-center"
                />
            </motion.div>

            {/* Mask / Texture Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-overlay">
                <img src={MaskOverlay} alt="" className="w-full h-full object-cover" />
            </div>

            {/* 3D Rocket Element - subtle floating */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-80">
                <RocketCanvas />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-20" />
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-5xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h5 className="text-neon tracking-[0.3em] text-sm md:text-base uppercase mb-4">
                        Launch Anywhere, Anytime
                    </h5>
                    <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-2">
                        AGNIKUL <span className="text-stroke-white text-transparent">COSMOS</span>
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-light text-gray-200">
                        India’s First <span className="text-neon font-normal">Configurable</span> Launch Vehicle
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed glass-panel bg-black/30 backdrop-blur-sm p-6 border border-white/10 rounded-xl"
                >
                    Redefining orbital access with fully 3D-printed rocket engines and mobile launch infrastructure.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 z-20"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">Explore Mission</span>
                    <ChevronDown size={24} className="text-neon" />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
