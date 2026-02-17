import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const CTA = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="py-24 px-4 bg-gradient-to-t from-black to-dark text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon/10 via-transparent to-transparent opacity-50" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
                >
                    The Future of Private Spaceflight Begins Here
                </motion.h2>

                <p className="text-xl text-gray-400">Built in India. Engineered for the world.</p>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 136, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-neon text-dark font-bold text-lg rounded-full shadow-[0_0_10px_#00FF88] hover:bg-white transition-colors duration-300"
                >
                    Explore Agnibaan Missions
                </motion.button>

                <div className="pt-12">
                    <button
                        onClick={scrollToTop}
                        className="text-gray-500 hover:text-neon transition-colors flex flex-col items-center gap-2 mx-auto text-sm"
                    >
                        <ArrowUp size={20} />
                        Back to Top
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
