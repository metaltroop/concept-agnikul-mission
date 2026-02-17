import React from 'react';
import { motion } from 'framer-motion';

const events = [
    { time: 'T+00:00', title: 'Lift Off', description: '07:15 IST. Liftoff from Agnikul Launchpad-01, SDSC SHAR.' },
    { time: 'T+00:45', title: 'Wind Biasing Maneuver', description: 'Vehicle executes programmed pitch maneuver to compensate for wind loads.' },
    { time: 'T+01:06', title: 'Engine Cutoff', description: 'End of powered flight phase. Single-piece 3D-printed engine performance validated.' },
    { time: 'T+01:29', title: 'Apogee', description: 'Vehicle reaches peak altitude. Successful sub-orbital trajectory achievement.' },
    { time: 'T+02:00', title: 'Splashdown', description: 'Controlled descent and splashdown in the Bay of Bengal.' },
];

const TimelineItem = ({ time, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        className="relative pl-12 border-l border-white/10 pb-16 last:pb-0"
    >
        <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-neon shadow-[0_0_10px_#00FF88]" />

        <span className="text-neon font-mono text-xl block mb-2">{time}</span>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm glass-panel p-4 inline-block max-w-md">{description}</p>
    </motion.div>
);

const Timeline = () => {
    return (
        <div className="flex flex-col py-10">
            {events.map((event, index) => (
                <TimelineItem key={index} {...event} index={index} />
            ))}
        </div>
    );
};

export default Timeline;
