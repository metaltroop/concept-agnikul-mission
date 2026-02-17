import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Founded', value: '2017' },
    { label: 'Headquarters', value: 'Chennai, India' },
    { label: 'Payload to LEO', value: '30-300 kg' },
    { label: 'First Launch', value: 'May 2024' },
];

const StatCard = ({ label, value, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        className="glass-panel p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
        <p className="text-neon text-sm uppercase tracking-wider">{label}</p>
    </motion.div>
);

const MissionStats = () => {
    return (
        <section className="py-20 px-4 bg-dark">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">Mission Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MissionStats;
