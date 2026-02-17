import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Server, Database, ShieldCheck, Droplets } from 'lucide-react';

export const Sustainability = () => {
    return (
        <section className="py-32 bg-dark relative overflow-hidden flex items-center">
            {/* Background Gradient */}
            <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-[#051a10] to-black z-0" />

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                {/* Text Content */}
                <div className="order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 text-green-400 text-xs font-bold mb-8 border border-green-500/20 tracking-wider">
                        <Leaf size={14} /> SUSTAINABLE SPACE ACCESS
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                        Clean Fuel. <br />
                        <span className="text-white/40">Responsible Launch.</span>
                    </h2>
                    <div className="space-y-8 text-gray-300 text-lg leading-relaxed border-l-2 border-green-900 pl-8">
                        <p>
                            We power our rockets with <span className="text-green-400 font-bold">Liquid Oxygen & Kerosene</span>. This combination is non-toxic, non-hypergolic, and handling-safe—eliminating the environmental hazards of traditional fuels like Hydrazine.
                        </p>
                        <p>
                            Space debris is a choice. We choose **responsibly**. Our upper stages are designed for precise de-orbiting, ensuring we leave low Earth orbit as pristine as we found it.
                        </p>
                    </div>
                </div>

                {/* Visual Card */}
                <div className="order-1 lg:order-2 flex justify-center">
                    <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 p-2 shadow-2xl overflow-hidden group">
                        {/* Glowing Drop Visual */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="relative">
                                <div className="w-48 h-48 bg-green-500 rounded-full blur-[80px] opacity-20 animate-pulse" />
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative z-10 w-32 h-40 bg-gradient-to-b from-green-400 to-green-600 rounded-[50%] rounded-tr-none rounded-tl-[100px] shadow-[0_0_30px_rgba(74,222,128,0.4)] flex items-center justify-center rotate-45"
                                >
                                    <Droplets className="text-black -rotate-45 opacity-50" size={48} />
                                </motion.div>
                            </div>
                            <div className="mt-12 text-center">
                                <h3 className="text-4xl font-bold text-white">0%</h3>
                                <p className="text-green-400 uppercase tracking-widest text-sm mt-2">Toxic Residue</p>
                            </div>
                        </div>

                        {/* Grid Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export const OrbitalAI = () => {
    return (
        <section className="py-32 bg-black relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-[#050505] rounded-[3rem] p-10 md:p-20 border border-white/10 relative overflow-hidden">
                    {/* Tech Noise Background */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

                    <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">

                        {/* Content */}
                        <div className="flex-1 space-y-8">
                            <div>
                                <h4 className="text-blue-500 font-mono mb-4 text-sm tracking-widest">PARTNERSHIP: NEEVCLOUD</h4>
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Turning Spent Stages into <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Orbital Data Centers</span>
                                </h2>
                            </div>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Why discard hardware? We are transforming our rocket's upper stages into autonomous, solar-powered edge computing nodes. Compute in space, for space.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                <FeatureItem icon={<Server />} title="Edge Computing" desc="Zero-latency processing for satellite data." color="text-blue-400" />
                                <FeatureItem icon={<ShieldCheck />} title="Sovereign Data" desc="Secure, jurisdiction-free storage." color="text-purple-400" />
                            </div>
                        </div>

                        {/* Visual - Sleeker UI Representation */}
                        <div className="flex-1 w-full max-w-md">
                            <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                                {/* Header UI */}
                                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="text-xs font-mono text-green-500">SYSTEM_ONLINE</div>
                                </div>

                                {/* Data Visualization */}
                                <div className="space-y-4 font-mono text-xs">
                                    <div className="flex justify-between text-gray-400">
                                        <span>UPLINK_STATUS</span>
                                        <span className="text-white">ESTABLISHED</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="h-full bg-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="bg-black/50 p-3 rounded border border-white/5">
                                            <div className="text-gray-500 mb-1">CPU_LOAD</div>
                                            <div className="text-xl text-blue-400">12%</div>
                                        </div>
                                        <div className="bg-black/50 p-3 rounded border border-white/5">
                                            <div className="text-gray-500 mb-1">TEMP</div>
                                            <div className="text-xl text-purple-400">-270°C</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-blue-300">
                                         > Processing Payload Data...
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureItem = ({ icon, title, desc, color }) => (
    <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
        <div className={`${color} bg-white/5 p-2 rounded-lg h-fit`}>{icon}</div>
        <div>
            <h4 className="text-white font-bold text-sm block mb-1">{title}</h4>
            <p className="text-gray-500 text-xs">{desc}</p>
        </div>
    </div>
);
