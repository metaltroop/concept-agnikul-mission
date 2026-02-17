import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Rocket, Trophy } from 'lucide-react';

const milestones = [
    {
        icon: <Rocket size={40} className="text-neon" />,
        title: "Mission 01",
        subtitle: "Agnibaan SOrTeD",
        description: "Successful sub-orbital demonstration flight validating semi-cryogenic engine technology."
    },
    {
        icon: <Flag size={40} className="text-neon" />,
        title: "Launchpad",
        subtitle: "Dhanush",
        description: "India's first private launchpad established at SDSC SHAR, Sriharikota."
    },
    {
        icon: <Trophy size={40} className="text-neon" />,
        title: "Innovation",
        subtitle: "3D Printed Engine",
        description: "World's first single-piece 3D-printed semi-cryogenic rocket engine."
    }
];

const MilestoneCard = ({ icon, title, subtitle, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="glass-panel p-8 flex flex-col items-center text-center space-y-4 hover:border-neon/50 transition-colors duration-300"
    >
        <div className="p-4 bg-white/5 rounded-full mb-2">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <h4 className="text-neon font-sans uppercase tracking-widest text-sm">{subtitle}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
);

const Milestones = () => {
    return (
        <section className="py-20 px-4 bg-dark relative">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-white">Key Milestones</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {milestones.map((milestone, index) => (
                        <MilestoneCard key={index} {...milestone} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Milestones;
